"use client";

import { Suspense, useEffect, useState } from "react"
import TransactionTable from "../../components/transactions/transaction-table";
import TransactionModal from "../../components/transactions/transaction-modal";
import { getAllTransactions, updateTransaction } from "@/app/services/transaction.service";
import { Transaction } from "@/app/types";
import { toast } from "react-toastify";

const TransactionManagement = () => {
    const [transactions, setTransaction] = useState<Transaction[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedTransaction(null)
    }
    const handleViewDetails = (transaction : Transaction) => {
        setIsModalOpen(true)
        setSelectedTransaction(transaction)
    }

    const fetchData = async () => {
        try {
            const data = await getAllTransactions()
            if (data) {
                setTransaction(data)
            }
        } catch (error) {
            console.error('Failed to fetch transactions', error)
        }
    }

    const handleStatusChange = async (id: string, status: 'pending' | 'paid' | 'in progress' | 'ready' | 'cancelled' | 'refunded') => {
        try {
            const formData = new FormData()
            formData.append('status', status)
            await updateTransaction(id, formData)

            setIsModalOpen(false)

            if (status === 'paid') {
                toast.success('Transaction status is paid successfully')
            } else if (status === 'in progress') {
                toast.update('Transaction status is being processed')
            } else if (status === 'ready') {
                toast.success('Transaction status is ready to be served')
            } else if (status === 'refunded') {
                toast.success('Transaction status is refunded successfully')
            } else {
                toast.error('Transaction status is rejected successfully')
            }

            await fetchData()
        } catch (error) {
            if (status === 'paid') {
                console.error('Failed to pay transaction', error)
                toast.error('Failed to pay transaction')
            } else if (status === 'in progress') {
                console.error('Failed to process transaction', error)
                toast.error('Failed to process transaction')
            } else if (status === 'ready') {
                console.error('Failed to be served', error)
                toast.error('Failed to be served')
            } else if (status === 'refunded') {
                console.error('Failed to refund transaction', error)
                toast.error('Failed to refund transaction')
            } else {
                console.error('Failed to reject transaction', error)
                toast.error('Failed to reject transaction')
            }
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    
    return (
        <div>
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="font-bold text-2xl">Transactions</h1>
                    <p className="text-gray-500">Verify incoming payments and manage orders.</p>
                </div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <TransactionTable transactions={transactions} onViewDetails={handleViewDetails} />
            </Suspense>
            <TransactionModal 
            transaction={selectedTransaction}
            onStatusChange={handleStatusChange} 
            isOpen={isModalOpen} 
            onClose={handleCloseModal} />
        </div>
    )
}

export default TransactionManagement