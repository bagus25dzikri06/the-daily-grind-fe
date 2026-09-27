"use client";

import { Transaction } from "@/app/types";
import { FiEye } from "react-icons/fi"
import moment from 'moment'
import { ChangeEvent, useState } from "react";
import PriceFormatter from "@/app/utils/price-formatter";

type TTransactionTableProps = {
    onViewDetails: (transaction : Transaction) => void;
    transactions: Transaction[];
}

const TransactionTable = ({ transactions, onViewDetails } : TTransactionTableProps) => {
    const [selectedTransactionStatus, setSelectedTransactionStatus] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [query, setQuery] = useState('')
    const totalPages = Math.ceil(transactions.length / rowsPerPage);
    
    const safeCapitalize = (str : string) => {
        if (str.length === 0) {
            return '';
        }
        if (str.slice(1).split('').some((letter) => letter === letter.toUpperCase()) === true) {
            return str[0].toUpperCase() + str.slice(1).toLowerCase();
        } else {
            return str[0].toUpperCase() + str.slice(1);
        }
    }
    const capitalizeEachWord = (sentence : string) => {
        return sentence
            .split(' ')
            .map((word : string) => safeCapitalize(word))
            .join(' ');
    }
    const searchFilter = (array : Array<Transaction>) => {
        return array.filter(
                (el) => el.customerName.includes(query) || el.customerName.includes(capitalizeEachWord(query))
        )
    }
    const filtered = searchFilter(transactions)
    
    const handlePageChange = (pageNumber : number) => {
        setCurrentPage(pageNumber);
    };
    const handleRowsPerPageChange = (e : ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
    };
    const rows = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTransactionStatus(e.target.value)
    }
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    return (
        <div>
            <div className="flex justify-end space-x-4">
                <input 
                onChange={handleChange} 
                type='text' 
                className="rounded-lg w-[78%] bg-white border border-gray-300 p-2 my-2"
                placeholder='Search By The Customer Name'/>
                <select 
                name="status" 
                id="status" 
                className="rounded-lg bg-white border border-gray-300 p-2 my-2"
                value={selectedTransactionStatus} 
                onChange={handleFilterChange}>
                    <option value="" disabled hidden>-- Filter By Status --</option>
                    <option value="">All</option>
                    <option value="pending" className="text-yellow-600">Pending</option>
                    <option value="paid" className="text-green-600">Paid</option>
                    <option value="rejected" className="text-red-600">Rejected</option>
                </select>
            </div>
            {
                selectedTransactionStatus === '' ? (<><div className="bg-white rounded-xl border border-gray-200">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="px-6 py-4 font-semibold">Date</th>
                            <th className="px-6 py-4 font-semibold">Customer</th>
                            <th className="px-6 py-4 font-semibold">Contact</th>
                            <th className="px-6 py-4 font-semibold">Total</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows.map((data) => (
                                <tr key={data._id} className="border-b border-gray-200 last:border-b-0">
                                    <td className="px-6 py-4 font-medium">
                                        {moment(data.createdAt).format('DD/MM/YYYY HH:mm')}
                                    </td>
                                    <td className="px-6 py-4 font-medium">{data.customerName}</td>
                                    <td className="px-6 py-4 font-medium">{data.customerContact}</td>
                                    <td className="px-6 py-4 font-medium">{PriceFormatter(Number(data.totalPayment))}</td>
                                    <td className="px-6 py-4 font-medium">
                                        <div className={`px-2 py-1 rounded-full border text-center ${
                                            data.status === 'pending' ? 'bg-yellow-100 text-yellow-600 border-yellow-200' : 
                                            data.status === 'paid' ? 'bg-green-100 text-green-600 border-green-200' : 
                                            'bg-red-100 text-red-600 border-red-200'}`
                                        }>
                                            {data.status.toUpperCase()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-7.5 self-center flex items-center gap-3 text-gray-600">
                                        <button onClick={() => onViewDetails(data)} className="flex gap-2 cursor-pointer">
                                            <FiEye size={20} /> View Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={`m-1 px-3 py-2 border rounded cursor-pointer ${
                        currentPage === pageNumber ? 'bg-primary text-white' : 'bg-primary-alternate text-primary'
                        }`}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
                <select className="m-1 border border-gray-400 rounded" onChange={handleRowsPerPageChange}>
                    {[5, 10, 15, 20, 25].map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div></>) : selectedTransactionStatus !== '' && rows.filter(
                    (data) => data.status === selectedTransactionStatus
                ).length > 0 ? (<><div className="bg-white rounded-xl border border-gray-200">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="px-6 py-4 font-semibold">Date</th>
                            <th className="px-6 py-4 font-semibold">Customer</th>
                            <th className="px-6 py-4 font-semibold">Contact</th>
                            <th className="px-6 py-4 font-semibold">Total</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows.filter(
                                (data) => data.status === selectedTransactionStatus
                            ).map((data) => (
                                <tr key={data._id} className="border-b border-gray-200 last:border-b-0">
                                    <td className="px-6 py-4 font-medium">
                                        {moment(data.createdAt).format('DD/MM/YYYY HH:mm')}
                                    </td>
                                    <td className="px-6 py-4 font-medium">{data.customerName}</td>
                                    <td className="px-6 py-4 font-medium">{data.customerContact}</td>
                                    <td className="px-6 py-4 font-medium">{PriceFormatter(Number(data.totalPayment))}</td>
                                    <td className="px-6 py-4 font-medium">
                                        <div className={`px-2 py-1 rounded-full border text-center ${
                                            selectedTransactionStatus === 'pending' ? 'bg-yellow-100 text-yellow-600 border-yellow-200' : 
                                            selectedTransactionStatus === 'paid' ? 'bg-green-100 text-green-600 border-green-200' : 
                                            'bg-red-100 text-red-600 border-red-200'}`
                                        }>
                                            {selectedTransactionStatus.toUpperCase()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-7.5 self-center flex items-center gap-3 text-gray-600">
                                        <button onClick={() => onViewDetails(data)} className="flex gap-2 cursor-pointer">
                                            <FiEye size={20} /> View Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={`m-1 px-3 py-2 border rounded cursor-pointer ${
                        currentPage === pageNumber ? 'bg-primary text-white' : 'bg-primary-alternate text-primary'
                        }`}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
                <select className="m-1 border border-gray-400 rounded" onChange={handleRowsPerPageChange}>
                    {[5, 10, 15, 20, 25].map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div></>) : (<>
                    <div className="text-center text-gray-500 text-xl py-5">
                        Transaction data not found
                    </div>
                </>)
            }
        </div>
    )
}

export default TransactionTable