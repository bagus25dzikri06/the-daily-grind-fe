"use client";

import PriceFormatter from "@/app/utils/price-formatter";
import Image from "next/image";
import Button from "./button";
import { FiArrowRight, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useMenuOrder } from "@/app/hooks/use-menu-order";
import { getImageUrl } from "@/app/lib/api";

const CartPopup = () => {
    const {push} = useRouter()
    const {items, removeMenu} = useMenuOrder()
    const handleCheckout= () => {
        if (items.length === 0) {
            alert('Your orders must not be empty before checking out')
            return
        }
        push("/checkout")
    }

    const totalPrice = items.reduce((total, item) => total + item.qty * item.price, 0)
    
    return <div className="absolute bg-white right-0 top-12 shadow-xl shadow-black/10 border border-gray-200 w-90 z-10">
        <div className="p-4 border-b border-gray-200 font-bold text-center">Shopping Cart</div>
        {
            items.length > 0 ? items.map((item, index) => (
                <div className="border border-gray-200 p-4 flex gap-3" key={index}>
                    <div className="bg-primary-alternate aspect-square w-16 flex justify-center items-center">
                        <Image 
                        src={getImageUrl(item.imageUrl)} 
                        width={63} 
                        height={63} 
                        alt={item.name} 
                        unoptimized={true}
                        className="aspect-square object-contain"/>
                    </div>
                    <div className="self-center">
                        <div className="text-sm font-medium">{item.name}</div>
                        <div className="flex gap-3 font-medium text-xs">
                            <div>{item.qty}x</div>
                            <div className="text-primary">{PriceFormatter(item.price)}</div>
                        </div>
                    </div>
                    <button className="w-7 h-7 p-0 self-center ml-auto cursor-pointer" onClick={() => removeMenu(item._id)}>
                        <FiTrash2 size={20} />
                    </button>
                </div>
            )) : (
                <div className="text-center text-gray-500 py-5">
                    Your orders are empty
                </div>
            )
        }
        <div className="border-t border-gray-200 p-4">
            <div className="flex justify-between font-semibold">
                <div className="text-sm">Total</div>
                <div className="text-primary text-xs">{PriceFormatter(totalPrice)}</div>
            </div>
            <Button variant="dark" size="small" className="w-full mt-4" onClick={handleCheckout}>
                Checkout Now <FiArrowRight />
            </Button>
        </div>
    </div>
}

export default CartPopup;