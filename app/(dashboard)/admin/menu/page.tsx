"use client";

import Button from "@/app/(landing)/components/ui/button"
import { FiPlus } from "react-icons/fi"
import MenuTable from "../../components/menus/menu-table"
import { deleteMenu, getAllMenus } from "@/app/services/menu.service"
import MenuModal from "../../components/menus/menu-modal"
import { Suspense, useEffect, useState } from "react"
import { Menu } from "@/app/types";
import { toast } from "react-toastify";
import DeleteModal from "../../components/ui/delete-modal";

const MenuManagement = () => {
    const [menus, setMenu] = useState<Menu[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null)
    const [menuToDeleteID, setMenuToDeleteID] = useState('')
    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedMenu(null)
    }

    const fetchData = async () => {
        try {
            const data = await getAllMenus()
            if (data) {
                setMenu(data)
            }
        } catch (error) {
            console.error('Failed to fetch menus', error)
        }
    }

    const handleEdit = (menu: Menu) => {
        setSelectedMenu(menu)
        setIsModalOpen(true)
    }

    const handleDelete = (id: string) => {
        setMenuToDeleteID(id)
        setIsDeleteModalOpen(true)
    }

    const handleDeleteConfirm = async () => {
        if (!menuToDeleteID) {
            return
        }
        try {
            await deleteMenu(menuToDeleteID)
            fetchData()
            toast.success('Menu is deleted successfully')
            setIsDeleteModalOpen(false)
            setMenuToDeleteID('')
        } catch(error) {
            console.error('Failed to delete menu', error)
            toast.error('Failed to delete menu')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    
    return (
        <div>
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="font-bold text-2xl">Menu Management</h1>
                    <p className="text-gray-500">Manage your dishes and beverages.</p>
                </div>
                <Button className="rounded-lg" onClick={() => setIsModalOpen(true)}>
                    <FiPlus size={24} />Add Menu
                </Button>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <MenuTable menu={menus} onEdit={handleEdit} onDelete={handleDelete} />
            </Suspense>
            <MenuModal menu={selectedMenu} onSuccess={fetchData} isOpen={isModalOpen} onClose={handleCloseModal} />
            <DeleteModal 
            isOpen={isDeleteModalOpen} 
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteConfirm} />
        </div>
    )
}

export default MenuManagement