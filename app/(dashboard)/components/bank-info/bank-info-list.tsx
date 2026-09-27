"use client";

import { Bank } from "@/app/types"
import { ChangeEvent, useState } from "react";
import { FiCreditCard, FiEdit2, FiTrash2 } from "react-icons/fi"

type TBankInfoListProps = {
    banks: Bank[];
    onEdit: (bank : Bank) => void;
    onDelete: (id : string) => void;
}

const BankInfoList = ({ banks, onEdit, onDelete } : TBankInfoListProps) => {
const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [query, setQuery] = useState('')
    const totalPages = Math.ceil(banks.length / rowsPerPage);
    
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
    const searchFilter = (array : Array<Bank>) => {
        return array.filter(
                (el) => el.bankName.includes(query) || el.bankName.includes(capitalizeEachWord(query))
        )
    }
    const filtered = searchFilter(banks)
    
    const handlePageChange = (pageNumber : number) => {
        setCurrentPage(pageNumber);
    };
    const handleRowsPerPageChange = (e : ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
    };
    const rows = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }
    
    return (
        <div>
            <input 
            onChange={handleChange} 
            type='text' 
            className="rounded-lg w-[78%] border border-gray-300 p-2 my-2"
            placeholder='Search By The Bank Name'/>
            <div className="grid grid-cols-3 gap-8">
                {
                    rows.map((data) => (
                        <div className="bg-white rounded-lg border border-gray-200" key={data._id}>
                            <div className="flex justify-between p-5">
                                <div className="flex gap-2">
                                    <div className="bg-blue-50 text-blue-600 rounded w-12 h-12 flex justify-center items-center">
                                        <FiCreditCard size={24} />
                                    </div>
                                    <div>
                                        <div className="font-semibold">{data.bankName}</div>
                                        <div className="text-xs text-gray-500">Bank Transfer</div>
                                    </div>
                                </div>
                                <div className="flex gap-2 -mt-5 text-gray-400">
                                    <button 
                                    className="cursor-pointer"
                                    onClick={() => onEdit?.(data)}>
                                        <FiEdit2 size={20} />
                                    </button>
                                    <button 
                                    className="cursor-pointer"
                                    onClick={() => onDelete?.(data._id)}>
                                        <FiTrash2 size={20} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-5 font-medium">
                                <div className="text-xs text-gray-500">ACCOUNT NUMBER</div>
                                <div>{data.accountNumber}</div>
                            </div>
                            <div className="border-t border-gray-200 px-5 py-3 text-xs">
                                <span className="text-gray-500">Holder :</span> {data.accountName}
                            </div>
                        </div>
                    ))
                }
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
                    {[6, 12, 18, 24, 30].map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default BankInfoList