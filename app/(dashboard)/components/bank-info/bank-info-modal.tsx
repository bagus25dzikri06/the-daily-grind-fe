"use client";

import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import { Bank } from "@/app/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addBank, updateBank } from "@/app/services/bank.service";

type TBankInfoModalProps = {
    isOpen: boolean;
    onClose: () => void;
    bank: Bank | null;
    onSuccess: () => void;
}

type BankFormData = {
    bankName: string;
    accountName: string;
    accountNumber: string;
}

const BankInfoModal = ({isOpen, onClose, bank, onSuccess} : TBankInfoModalProps) => {
    const [formData, setFormData] = useState<BankFormData>({
        bankName: '',
        accountName: '',
        accountNumber: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const isEditMode = !!bank

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
            if (isEditMode) {
                await updateBank(bank._id, formData)
            } else {
                if (
                    !formData.bankName || 
                    !formData.accountName || 
                    !formData.accountNumber 
                ) {
                    alert('Please, fill in all fields!')
                    return
                }
                await addBank(formData)
            }
        
            setFormData({
                bankName: '',
                accountName: '',
                accountNumber: ''
            })
        
            toast.success(isEditMode ? 'Bank is updated successfully' : 'Bank is created successfully')
        
            onSuccess?.()
            onClose?.()
        } catch (error) {
            console.error(
                isEditMode ? 'Failed to update bank' : 'Failed to create bank',
                error
            )
            toast.error(
                isEditMode ? 'Failed to update bank' : 'Failed to create bank'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        if (isEditMode && isOpen) {
            setFormData({
                bankName: bank.bankName,
                accountName: bank.accountName,
                accountNumber: bank.accountNumber
            })
        } else if (isOpen) {
            setFormData({
                bankName: '',
                accountName: '',
                accountNumber: ''
            })
        }
    }, [isOpen, bank])

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? 'Edit Bank Account' : 'Add Bank Account'}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                <div className="input-group-admin">
                    <label htmlFor="bankName">Bank Name</label>
                    <input 
                    type="text" 
                    name="bankName" 
                    id="bankName"
                    value={formData.bankName}
                    onChange={handleChange}  
                    placeholder="e. g. Mandiri, BCA, BRI" />
                </div>
                <div className="input-group-admin">
                    <label htmlFor="accountNumber">Account Number</label>
                    <input 
                    type="text" 
                    name="accountNumber" 
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}  
                    placeholder="123124344234234" />
                </div>
                <div className="input-group-admin">
                    <label htmlFor="accountName">Account Holder</label>
                    <input 
                    type="text" 
                    name="accountName" 
                    id="accountName"
                    value={formData.accountName}
                    onChange={handleChange}  
                    placeholder="Holder Name as registered on the account" />
                </div>
            </form>
            <div className="flex justify-end gap-5 mt-10">
                <Button className="ml-auto mt-4 rounded-lg" onClick={handleSubmit} disabled={isSubmitting} type="submit">
                    {
                        isEditMode ? 'Update Bank Account' : 'Add Bank Account'
                    }
                </Button>
            </div>
        </Modal>
    )
}

export default BankInfoModal