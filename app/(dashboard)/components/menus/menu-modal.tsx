"use client";

import { useEffect, useState } from "react";
import Modal from "../ui/modal"
import { Category, Menu } from "@/app/types";
import { getAllCategories } from "@/app/services/category.service";
import Button from "@/app/(landing)/components/ui/button";
import ImageUploadPreview from "../ui/image-upload-preview";
import { addMenu, updateMenu } from "@/app/services/menu.service";
import { toast } from "react-toastify";
import { getImageUrl } from "@/app/lib/api";

type TMenuModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    menu?: Menu | null;
}

type MenuFormData = {
    name: string;
    isAvailable: boolean;
    price: number;
    categoryId: string;
    description: string;
}

const MenuModal = ({isOpen, onClose, onSuccess, menu} : TMenuModalProps) => {
    const [isAvailable, setIsAvailable] = useState<boolean>(true);
    const [category, setCategory] = useState<Category[]>([])
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [formData, setFormData] = useState<MenuFormData>({
        name: '',
        isAvailable: true,
        price: 0,
        categoryId: '',
        description: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const isEditMode = !!menu

    const fetchData = async () => {
        try {
            const data = await getAllCategories()
            if (data) {
                setCategory(data)
            }
        } catch (error) {
            console.error('Failed to fetch categories', error)
        }
    }

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
            data.append('isAvailable', String(isAvailable))
            data.append('price', formData.price.toString())
            data.append('categoryId', formData.categoryId)
            data.append('description', formData.description)
            if (imageFile) {
                data.append('image', imageFile)
            }

            if (isEditMode) {
                await updateMenu(menu._id, data)
            } else {
                if (
                    !formData.name ||
                    !formData.price ||
                    !formData.categoryId ||
                    !formData.description || 
                    !imageFile
                ) {
                    alert('Please, fill in all fields!')
                    return
                }
                await addMenu(data)
            }

            setFormData({
                name: '',
                isAvailable: true,
                price: 0,
                categoryId: '',
                description: ''
            })
            setImageFile(null)
            setImagePreview(null)

            toast.success(isEditMode ? 'Product is updated successfully' : 'Product is created successfully')

            onSuccess?.()
            onClose?.()
        } catch (error) {
            console.error(
                isEditMode ? 'Failed to update product' : 'Failed to create product',
                error
            )
            toast.error(
                isEditMode ? 'Failed to update product' : 'Failed to create product'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        if (isEditMode && isOpen) {
            setFormData({
                name: menu.name,
                isAvailable: menu.isAvailable,
                price: menu.price,
                description: menu.description,
                categoryId: menu.category?._id
            })
            setImagePreview(menu.imageUrl ? getImageUrl(menu.imageUrl) : null)
        } else if (isOpen) {
            setFormData({
                name: '',
                isAvailable: true,
                price: 0,
                categoryId: '',
                description: ''
            })
            setImageFile(null)
            setImagePreview(null)
        }
    }, [isOpen, menu])

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? 'Edit Product' : 'Add New Product'}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex gap-7">
                    <div className="min-w-50">
                        <ImageUploadPreview label="Product Image" value={imagePreview} onChange={
                            (file) => {
                                setImageFile(file)
                                setImagePreview(URL.createObjectURL(file))
                            }
                        }/>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="input-group-admin">
                            <label htmlFor="productName">Product Name</label>
                            <input 
                            type="text" 
                            name="name" 
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e. g. Kopi Susu" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="input-group-admin">
                                <label htmlFor="price">Price (IDR)</label>
                                <input 
                                type="number" 
                                name="price" 
                                id="price" 
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0" />
                            </div>
                            <div className="input-group-admin">
                                <label htmlFor="isAvailable">Availability</label>
                                <div className="flex">
                                                <div className="input-group-admin">
                                                    <label className="flex items-center ps-4">
                                                        <input
                                                            type="radio"
                                                            name="availability"
                                                            value="true" 
                                                            checked={isAvailable === true}
                                                            onChange={() => setIsAvailable(true)}
                                                        />
                                                        <div className="text-center">Yes</div>
                                                    </label>
                                                </div>
                                                <div className="input-group-admin">
                                                    <label className="flex items-center ps-4">
                                                        <input
                                                            type="radio"
                                                            name="availability"
                                                            value="false" 
                                                            checked={isAvailable === false}
                                                            onChange={() => setIsAvailable(false)}
                                                        />
                                                        <div className="text-center">No</div>
                                                    </label>
                                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="input-group-admin">
                            <label htmlFor="categoryId">Category</label>
                            <select name="categoryId" id="categoryId" value={formData.categoryId} onChange={handleChange}>
                                <option value="" disabled hidden>--Select Category--</option>
                                {
                                    category.map((data) => (
                                        <option value={data._id} key={data._id}>{data.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="input-group-admin">
                    <label htmlFor="description">Description</label>
                    <textarea 
                    name="description" 
                    id="description" 
                    rows={7} 
                    placeholder="Menu Details..."
                    value={formData.description}
                    onChange={handleChange}
                    ></textarea>
                </div>
                <Button className="ml-auto mt-4 rounded-lg" onClick={handleSubmit} disabled={isSubmitting} type="submit">
                    {
                        isEditMode ? 'Update Product' : 'Create Product'
                    }
                </Button>
            </form>
        </Modal>
    )
}

export default MenuModal