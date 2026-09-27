"use client";

import Button from "@/app/(landing)/components/ui/button"
import { FiPlus } from "react-icons/fi"
import BankInfoList from "../../components/bank-info/bank-info-list"
import { Suspense, useEffect, useState } from "react"
import BankInfoModal from "../../components/bank-info/bank-info-modal";
import { Bank } from "@/app/types";
import { deleteBank, getAllBanks } from "@/app/services/bank.service";
import { toast } from "react-toastify";
import DeleteModal from "../../components/ui/delete-modal";

const BankInfo = () => {
    const [banks, setBank] = useState<Bank[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null)
    const [bankToDeleteID, setBankToDeleteID] = useState('')
    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedBank(null)
    }

    const fetchData = async () => {
        try {
            const data = await getAllBanks()
            if (data) {
                setBank(data)
            }
        } catch (error) {
            console.error('Failed to fetch banks', error)
        }
    }

    const handleEdit = (bank : Bank) => {
        setSelectedBank(bank)
        setIsModalOpen(true)
    }

    const handleDelete = (id: string) => {
        setBankToDeleteID(id)
        setIsDeleteModalOpen(true)
    }

    const handleDeleteConfirm = async () => {
        if (!bankToDeleteID) {
            return
        }
        try {
            await deleteBank(bankToDeleteID)
            fetchData()
            toast.success('Bank is deleted successfully')
            setIsDeleteModalOpen(false)
            setBankToDeleteID('')
        } catch (error) {
            console.error('Failed to delete bank', error)
            toast.error('Failed to delete bank')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="font-bold text-2xl">Bank Information</h1>
                    <p className="text-gray-500">Manage destination accounts for customer transfers.</p>
                </div>
                <Button className="rounded-lg" onClick={() => setIsModalOpen(true)}>
                    <FiPlus size={24} />Add Bank Account
                </Button>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <BankInfoList banks={banks} onEdit={handleEdit} onDelete={handleDelete} />
            </Suspense>
            <BankInfoModal bank={selectedBank} onSuccess={fetchData} isOpen={isModalOpen} onClose={handleCloseModal}/>
            <DeleteModal 
            isOpen={isDeleteModalOpen} 
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteConfirm} />
        </div>
    )
}

export default BankInfo