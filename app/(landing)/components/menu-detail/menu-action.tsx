"use client";

import { FiArrowRight, FiChevronDown, FiChevronUp, FiShoppingBag } from "react-icons/fi";
import Button from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMenuOrder } from "@/app/hooks/use-menu-order";
import { Menu } from "@/app/types";

type TMenuActionProps = {
    menu: Menu;
}

const MenuActions = ({ menu }: TMenuActionProps) => {
    const {items, addMenu} = useMenuOrder()
    const {push} = useRouter()
    const [qty, setQty] = useState(0)
    const handleAddMenu = () => {
        if (qty === 0) {
            alert('Please, fill in the quantity of the dishes or beverages you want to order')
            return
        }
        addMenu(menu, qty)
    }
    const checkout = () => {
        if (items.length === 0) {
            alert('Your orders must not be empty before checking out')
            return
        }
        push("/checkout")
    }

    return (
        <div className="flex gap-5">
            <div className="border border-gray-500 inline-flex w-fit min-w-20.5">
                <div className="aspect-square text-xl font-medium border-r border-gray-500 flex justify-center items-center">
                    <span className="border-r">{qty}</span>
                    <div className="flex flex-col">
                        <button 
                            className="border-b border-t border-gray-500 cursor-pointer h-3/4 aspect-square flex items-center justify-center"
                            onClick={() => setQty(qty + 1)}
                        >
                            <FiChevronUp />
                        </button>
                        <button 
                            className="border-b cursor-pointer h-1/2 aspect-square flex items-center justify-center"
                            onClick={() => setQty(qty > 1 ? qty - 1 : qty)}
                        >
                            <FiChevronDown />
                        </button>
                    </div>
                </div>
            </div>
            <Button className="px-20 w-full rounded-lg" onClick={handleAddMenu}>
                <FiShoppingBag size={24} /> Add to Cart
            </Button>
            <Button variant="dark" className="px-20 w-full rounded-lg" onClick={checkout}>
                Checkout Now <FiArrowRight size={24} />
            </Button>
        </div>
    )
}

export default MenuActions;