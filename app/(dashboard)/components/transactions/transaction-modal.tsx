"use client";

import Image from "next/image";
import Modal from "../ui/modal";
import Button from "@/app/(landing)/components/ui/button";
import { FiCheck, FiCheckCircle, FiRefreshCw, FiX } from "react-icons/fi";
import { Transaction } from "@/app/types";
import { Suspense, useState } from "react";
import { getImageUrl } from "@/app/lib/api";
import moment from "moment";
import PriceFormatter from "@/app/utils/price-formatter";
import { HiReceiptRefund } from "react-icons/hi";

type TTransactionModalProps = {
    isOpen: boolean;
    onClose: () => void;
    transaction: Transaction | null;
    onStatusChange: (
        id: string,
        status: 'pending' | 'paid' | 'in progress' | 'ready' | 'cancelled' | 'refunded'
    ) => Promise<void>;
}

const TransactionModal = ({isOpen, onClose, transaction, onStatusChange} : TTransactionModalProps) => {
    const [isUpdating, setIsUpdating] = useState(false)
    const handleStatusChange = async (id : string, status : 'pending' | 'paid' | 'in progress' | 'ready' | 'cancelled' | 'refunded') => {
        setIsUpdating(true)
        try {
            await onStatusChange(id, status)
        } catch (error) {
            console.error(error)
        } finally {
            setIsUpdating(false)
        }
    }
    if (!transaction) {
        return
    }
     
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Verify Transactions">
            <div className="flex gap-6">
                <div className="min-w-50">
                    <h4 className="font-semibold text-xs mb-2">Payment Proof</h4>
                    {
                        transaction.paymentProof ? (
                            <Image 
                            src={getImageUrl(transaction.paymentProof)}
                            alt="payment proof" 
                            width={200} 
                            height={401} />
                        ) : (
                            <div className="text-center p-4">
                                <div className="text-sm">No payment proof uploaded.</div>
                            </div>
                        )
                    }
                </div>
                <div className="w-full">
                    <div>
                        <h4 className="font-semibold text-xs mb-2">Order Details</h4>
                        <div className="bg-gray-100 rounded-md flex flex-col gap-2.5 p-4">
                            <div className="flex justify-between font-medium">
                                <div className="opacity-50">Date</div>
                                <div className="text-right">{moment(transaction.createdAt).format('DD/MM/YYYY HH:mm')}</div>
                            </div>
                            <div className="flex justify-between font-medium">
                                <div className="opacity-50">Customer</div>
                                <div className="text-right">{transaction.customerName}</div>
                            </div>
                            <div className="flex justify-between font-medium">
                                <div className="opacity-50">Contact</div>
                                <div className="text-right">{transaction.customerContact}</div>
                            </div>
                            <div className="flex justify-between font-medium">
                                <div className="opacity-50 whitespace-nowrap">Shipping Address</div>
                                <div className="text-right">{transaction.customerAddress}</div>
                            </div>
                        </div>
                    </div>
                    <h4 className="font-semibold text-xs mb-2">Items Purchased</h4>
                    <div className="space-y-3">
                        {
                            transaction.purchasedMenus.map((data, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-2 flex items-center gap-2">
                                    {
                                       data.productId?.imageUrl === undefined ? (
                                            <div className="text-center text-sm">
                                                Product had been deleted.
                                            </div>) : (<>
                                            <div className="bg-gray-100 rounded aspect-square w-8 h-8">
                                                <Image 
                                                src={getImageUrl(data.productId?.imageUrl)} 
                                                width={30} 
                                                height={30}
                                                unoptimized={true}
                                                alt="product image" />
                                            </div>
                                            <div className="font-medium text-xs">{data.productId?.name}</div>
                                            <div className="font-medium ml-auto text-xs">{data.qty}</div>
                                        </>)
                                    }                         
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex justify-between text-xs mt-4">
                        <h4 className="font-semibold">Total</h4>
                        <div className="text-primary font-semibold">{PriceFormatter(Number(transaction.totalPayment))}</div>
                    </div>
                    <div className="flex justify-end gap-5 mt-10">
                        {
                            transaction.status === 'pending' && (
                                isUpdating ? (<>
                                    <div className="font-semibold">Updating...</div>
                                </>) : (
                                <>
                                    <Button 
                                        className="text-primary! bg-primary-alternate! rounded-md" 
                                        size="small"
                                        onClick={() => handleStatusChange(transaction._id, 'cancelled')}
                                        disabled={isUpdating}>
                                            <>
                                                <FiX size={20} /> 
                                                Reject
                                            </>
                                    </Button>
                                    <Button 
                                        className="text-white! bg-[#50C252]! rounded-md" 
                                        size="small"
                                        onClick={() => handleStatusChange(transaction._id, 'paid')}
                                        disabled={isUpdating}>
                                            <>
                                                <FiCheck size={20} />
                                                Approve
                                            </>
                                    </Button>
                                </>
                                )
                            )
                        }
                        {
                            transaction.status === 'paid' && (
                                <>
                                <div className="font-semibold text-green-600">Transaction has been paid</div>
                                <Suspense fallback={<div className="font-semibold">Loading...</div>}>
                                    <Button 
                                        className="text-white! bg-[#FF991C]! rounded-md" 
                                        size="small"
                                        onClick={() => handleStatusChange(transaction._id, 'in progress')}
                                        disabled={isUpdating}>
                                            <>
                                                <FiRefreshCw size={20} /> 
                                                In Progress
                                            </>
                                    </Button>
                                    <Button 
                                        className="text-black! bg-[#98FF98]! rounded-md" 
                                        size="small"
                                        onClick={() => handleStatusChange(transaction._id, 'ready')}
                                        disabled={isUpdating}>
                                            <>
                                                <FiCheckCircle size={20} />
                                                Ready
                                            </>
                                    </Button>
                                    <Button 
                                        className="text-white! bg-[#A9A9A9]! rounded-md" 
                                        size="small"
                                        onClick={() => handleStatusChange(transaction._id, 'refunded')}
                                        disabled={isUpdating}>
                                            <>
                                                <HiReceiptRefund size={20} />
                                                Refunded
                                            </>
                                    </Button>
                                </Suspense>
                                </>
                            )
                        }
                        {
                            transaction.status === 'in progress' && (
                                <>
                                <div className="font-semibold text-green-600">Transaction has been in process</div>
                                <Suspense fallback={<div className="font-semibold">Loading...</div>}>
                                    <Button 
                                        className="text-black! bg-[#98FF98]! rounded-md" 
                                        size="small"
                                        onClick={() => handleStatusChange(transaction._id, 'ready')}
                                        disabled={isUpdating}>
                                            <>
                                                <FiCheckCircle size={20} />
                                                Ready
                                            </>
                                    </Button>
                                    <Button 
                                        className="text-white! bg-[#A9A9A9]! rounded-md" 
                                        size="small"
                                        onClick={() => handleStatusChange(transaction._id, 'refunded')}
                                        disabled={isUpdating}>
                                            <>
                                                <HiReceiptRefund size={20} />
                                                Refunded
                                            </>
                                    </Button>
                                </Suspense>
                                </>
                            )
                        }
                        {
                            transaction.status === 'cancelled' && (
                                <Suspense fallback={<div className="font-semibold">Loading...</div>}>
                                    <div className="font-semibold text-red-600">Transaction has been cancelled</div>
                                </Suspense>
                            )
                        }
                        {
                            transaction.status === 'ready' && (
                                <Suspense fallback={<div className="font-semibold">Loading...</div>}>
                                    <div className="font-semibold text-[#98FF98]">Transaction has been ready</div>
                                </Suspense>
                            )
                        }
                        {
                            transaction.status === 'refunded' && (
                                <Suspense fallback={<div className="font-semibold">Loading...</div>}>
                                    <div className="font-semibold text-[#A9A9A9]">Transaction has been refunded</div>
                                </Suspense>
                            )
                        }
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default TransactionModal