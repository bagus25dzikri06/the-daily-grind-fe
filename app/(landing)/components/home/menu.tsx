"use client";

import Link from "next/link"
import Image from "next/image"
import { FiPlus } from "react-icons/fi"
import Button from "../ui/button"
import PriceFormatter from "@/app/utils/price-formatter"
import { Menu } from "@/app/types"
import { getImageUrl } from "@/app/lib/api"
import { useMenuOrder } from "@/app/hooks/use-menu-order"

type TMenuProps = {
    menus: Menu[]
}

const MenuSection = ({menus}: TMenuProps) => {
    const {addMenu} = useMenuOrder()
    const handleAddMenu = (e: React.MouseEvent, menu: Menu) => {
        e.stopPropagation()
        addMenu(menu)
    }

    return <section id="products-section" className="container mx-auto mt-32 mb-52">
        <h2 className="font-bold italic text-4xl text-center mb-11">
            <span className="text-primary">OUR</span> PRODUCTS
        </h2>
        <div className="grid grid-cols-4 gap-5">
            {
                menus.map((menu) => (
                    <Link href={`/menu/${menu._id}`} key={menu._id} className="p-1.5 bg-white hover:drop-shadow-xl duration-300">
                        <div className="bg-primary-light aspect-square w-full flex justify-center items-center relative">
                            <Image 
                            src={getImageUrl(menu.imageUrl)} 
                            alt={menu.name} 
                            width={300} 
                            height={300} 
                            unoptimized={true}
                            className="aspect-square object-contain" />
                            <Button className="w-10 h-10 p-2! absolute right-3 top-3" onClick={(e) => handleAddMenu(e, menu)}>
                                <FiPlus size={24} />
                            </Button>
                        </div>
                        <h3 className="font-medium text-lg mb-1.5 mt-4">{menu.name}</h3>
                        <div className="flex justify-between mb-8">
                            <div className="text-gray-500">{menu.category?.name}</div>
                            {
                                menu.isAvailable === true && (
                                    <div className="text-black">Available</div>
                                )
                            }
                            {
                                menu.isAvailable === false && (
                                    <div className="text-black">Sold Out</div>
                                )
                            }
                            <div className="font-medium text-primary">{PriceFormatter(menu.price)}</div>
                        </div>
                    </Link>    
                ))
            }
        </div>
    </section>
}

export default MenuSection