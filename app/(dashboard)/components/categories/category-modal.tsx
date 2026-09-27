"use client";

import { useEffect, useState } from "react";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/image-upload-preview";
import Button from "@/app/(landing)/components/ui/button";
import { Category } from "@/app/types";
import { toast } from "react-toastify";
import { addCategory, updateCategory } from "@/app/services/category.service";
import { getImageUrl } from "@/app/lib/api";

type TCategoryModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    category?: Category | null;
}

type CategoryFormData = {
    name: string;
    description: string;
}

const CategoryModal = ({isOpen, onClose, onSuccess, category} : TCategoryModalProps) => {
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [formData, setFormData] = useState<CategoryFormData>({
        name: '',
        description: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const isEditMode = !!category

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {id, value} = e.target
        setFormData((prev) => ({
            ...prev, [id] : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            const data = new FormData()
            data.append('name', formData.name)
            data.append('description', formData.description)
            if (imageFile) {
                data.append('image', imageFile)
            }
    
            if (isEditMode) {
                await updateCategory(category._id, data)
            } else {
                if (
                    !formData.name || 
                    !formData.description || 
                    !imageFile 
                ) {
                    alert('Please, fill in all fields!')
                    return
                }
                await addCategory(data)
            }
    
            setFormData({
                name: '',
                description: ''
            })
            setImageFile(null)
            setImagePreview(null)
    
            toast.success(isEditMode ? 'Category is updated successfully' : 'Category is created successfully')
    
            onSuccess?.()
            onClose?.()
        } catch (error) {
            console.error(
                isEditMode ? 'Failed to update category' : 'Failed to create category',
                error
            )
            toast.error(
                isEditMode ? 'Failed to update category' : 'Failed to create category'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        if (isEditMode && isOpen) {
            setFormData({
                name: category.name,
                description: category.description
            })
            setImagePreview(category.imageUrl ? getImageUrl(category.imageUrl) : null)
        } else if (isOpen) {
            setFormData({
                name: '',
                description: ''
            })
            setImageFile(null)
            setImagePreview(null)
        }
    }, [isOpen, category])

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? 'Edit Category' : 'Add New Category'}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex gap-7">
                    <div className="min-w-50">
                        <ImageUploadPreview label="Category Image" value={imagePreview} onChange={
                            (file) => {
                                setImageFile(file)
                                setImagePreview(URL.createObjectURL(file))
                            }
                        }/>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="input-group-admin">
                            <label htmlFor="name">Category Name</label>
                            <input 
                            type="text" 
                            name="name" 
                            id="name"
                            value={formData.name}
                            onChange={handleChange} 
                            placeholder="e. g. Running" />
                        </div>
                        <div className="input-group-admin">
                            <label htmlFor="description">Description</label>
                            <textarea 
                            name="description" 
                            id="description" 
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Category Details..."></textarea>
                        </div>
                    </div>
                </div>
                <Button className="ml-auto mt-4 rounded-lg" onClick={handleSubmit} disabled={isSubmitting} type="submit">
                    {
                        isEditMode ? 'Update Category' : 'Create Category'
                    }
                </Button>
            </form>
        </Modal>
    )
}

export default CategoryModal