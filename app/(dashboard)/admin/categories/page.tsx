"use client";

import Button from "@/app/(landing)/components/ui/button"
import { deleteCategory, getAllCategories } from "@/app/services/category.service"
import { Category } from "@/app/types"
import { Suspense, useEffect, useState } from "react"
import { FiPlus } from "react-icons/fi"
import CategoryTable from "../../components/categories/category-table"
import CategoryModal from "../../components/categories/category-modal";
import { toast } from "react-toastify";
import DeleteModal from "../../components/ui/delete-modal";

const CategoryManagement = () => {
    const [categories, setCategory] = useState<Category[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const [categoryToDeleteID, setCategoryToDeleteID] = useState('')
    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedCategory(null)
    }

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

    const handleEdit = (category : Category) => {
        setSelectedCategory(category)
        setIsModalOpen(true)
    }

    const handleDelete = (id: string) => {
        setCategoryToDeleteID(id)
        setIsDeleteModalOpen(true)
    }

    const handleDeleteConfirm = async () => {
        if (!categoryToDeleteID) {
            return
        }
        try {
            await deleteCategory(categoryToDeleteID)
            fetchData()
            toast.success('Category is deleted successfully')
            setIsDeleteModalOpen(false)
            setCategoryToDeleteID('')
        } catch (error) {
            console.error('Failed to delete category', error)
            toast.error('Failed to delete category')
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="font-bold text-2xl">Category Management</h1>
                    <p className="text-gray-500">Organize your menu into categories.</p>
                </div>
                <Button className="rounded-lg" onClick={() => setIsModalOpen(true)}>
                    <FiPlus size={24} />Add Category
                </Button>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <CategoryTable categories={categories} onEdit={handleEdit} onDelete={handleDelete} />
            </Suspense>
            <CategoryModal category={selectedCategory} onSuccess={fetchData} isOpen={isModalOpen} onClose={handleCloseModal} />
            <DeleteModal 
            isOpen={isDeleteModalOpen} 
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteConfirm} />
        </div>
    )
}

export default CategoryManagement