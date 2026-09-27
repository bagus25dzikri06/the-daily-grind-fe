"use client";

import { getImageUrl } from "@/app/lib/api"
import { Category } from "@/app/types"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import { FiEdit2, FiTrash2 } from "react-icons/fi"

type TCategoryTableProps = {
    categories: Category[];
    onDelete?: (id : string) => void;
    onEdit?: (category : Category) => void;
}

const CategoryTable = ({categories, onDelete, onEdit}: TCategoryTableProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [query, setQuery] = useState('')
    const totalPages = Math.ceil(categories.length / rowsPerPage);
    
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
    const searchFilter = (array : Array<Category>) => {
        return array.filter(
                (el) => el.name.includes(query) || el.name.includes(capitalizeEachWord(query))
        )
    }
    const filtered = searchFilter(categories)
    
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
            placeholder='Search By The Category Name'/>
            <div className="bg-white rounded-xl border border-gray-200">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="px-6 py-4 font-semibold">Category</th>
                            <th className="px-6 py-4 font-semibold">Description</th>
                            <th className="px-6 py-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows.map((data) => (
                                <tr key={data._id} className="border-b border-gray-200 last:border-b-0">
                                    <td className="px-6 py-4 font-medium">
                                        <div className="flex gap-2 items-center">
                                            <div className="aspect-square bg-gray-100 rounded-md">
                                                <Image 
                                                src={getImageUrl(data.imageUrl)} 
                                                width={52} 
                                                height={52} 
                                                alt={data.name}
                                                unoptimized={true}
                                                className="aspect-square object-contain" />
                                            </div>
                                            <span>{data.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        <div className="rounded-md bg-gray-200 px-2 py-1 w-fit">
                                            {data.description}
                                        </div>
                                    </td>
                                    <td className="px-6 py-7.5 self-center flex items-center gap-3 text-gray-600">
                                        <button onClick={() => onEdit?.(data)} className="cursor-pointer">
                                            <FiEdit2 size={20} />
                                        </button>
                                        <button onClick={() => onDelete?.(data._id)} className="cursor-pointer"><FiTrash2 size={20} /></button>
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
            </div>
        </div>
    )
}

export default CategoryTable