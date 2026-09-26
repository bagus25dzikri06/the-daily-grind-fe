"use client";

import { FiCreditCard } from "react-icons/fi"
import CardWithHeader from "../ui/card-with-header"
import { getAllBanks } from "@/app/services/bank.service"
import { ChangeEvent, useEffect, useState } from "react"
import { Bank } from "@/app/types";

const PaymentOptions = () => {
    const [banks, setBank] = useState<Bank[]>([])
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(3);
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

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return <CardWithHeader title="Payment Options">
        <input 
        onChange={handleChange} 
        type='text' 
        className="rounded-lg w-full border border-gray-300 p-2"
        placeholder='Search By The Bank Name'/>
        {
            rows.map((bank) => (
                <div className="flex gap-5 p-5 border-b border-gray-100" key={bank._id}>
                    <div className="bg-blue-100 p-4 text-blue-500 h-fit self-center">
                        <FiCreditCard size={24} />
                    </div>
                    <div className="self-center">
                        <div className="font-bold">{bank.bankName}</div>
                        <div className="text-sm">{bank.accountNumber}</div>
                    </div>
                    <div className="ml-auto bg-blue-50 text-gray-800 text-xs h-fit self-center px-2 py-1">
                        {bank.accountName}
                    </div>
                </div>
            ))
        }
        <div className="flex justify-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <button
                    key={pageNumber}
                    className={`m-1 px-3 py-2 border rounded ${
                    currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-white text-black'
                    }`}
                    onClick={() => handlePageChange(pageNumber)}
                >
                    {pageNumber}
                </button>
            ))}
            <select className="m-1 border border-gray-400 rounded" onChange={handleRowsPerPageChange}>
                {[3, 6, 9, 12, 15].map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    </CardWithHeader>
}

export default PaymentOptions