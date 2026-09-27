"use client"

import { logout } from "@/app/services/auth.service"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { FiCoffee, FiCreditCard, FiLogOut } from "react-icons/fi"
import LogoutModal from "../ui/logout-modal"
import { Receipt } from "lucide-react"
import { MdRestaurantMenu } from "react-icons/md"

const Sidebar = () => {
    const pathname = usePathname()
    const { push } = useRouter()
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

    const handleLogoutCloseModal = () => {
        setIsLogoutModalOpen(false)
    }

    const menuItems = [
        {
            name: 'Menu',
            icon: FiCoffee,
            link: '/admin/menu'
        },
        {
            name: 'Categories',
            icon: MdRestaurantMenu,
            link: '/admin/categories'
        },
        {
            name: 'Transactions',
            icon: Receipt,
            link: '/admin/transactions'
        },
        {
            name: 'Bank Informations',
            icon: FiCreditCard,
            link: '/admin/bank-info'
        }
    ]

    const handleLogout = () => {
        logout()
        push('/admin/login')   
    }

    return (
        <aside className="w-80 min-h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0">
            <div className="py-8 px-14 border-b border-gray-200">
                <Image src="/images/logo-admin.svg" alt="logo admin" width={215} height={36} />
            </div>
            <div className="flex flex-col gap-2 mt-12 p-5">
                {
                    menuItems.map((item, index) => {
                        const isActive = item.link === pathname
                        return (
                        <Link 
                        href={item.link} 
                        key={index} 
                        className={`flex gap-3 items-center py-3 px-4.5 rounded-lg font-medium ${
                            isActive ? 'bg-primary/15 text-primary' : 'hover:bg-gray-100'}`
                        }>
                            <item.icon size={24}/>
                            <span>{item.name}</span>
                        </Link>
                    )})
                }
            </div>
            <button onClick={() => setIsLogoutModalOpen(true)} className="flex cursor-pointer gap-3 font-medium py-3 px-4.5 mx-5 hover:bg-gray-100 duration-300 rounded-lg mt-auto mb-10">
                <FiLogOut size={24} />
                Log Out
            </button>
            <LogoutModal
            isOpen={isLogoutModalOpen}
            onClose={handleLogoutCloseModal}
            onConfirm={handleLogout} />
        </aside>
    )
}

export default Sidebar