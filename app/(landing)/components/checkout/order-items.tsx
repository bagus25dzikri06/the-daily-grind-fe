"use client";

import PriceFormatter from "@/app/utils/price-formatter"
import Image from "next/image"
import Button from "../ui/button"
import { FiCreditCard, FiTrash2 } from "react-icons/fi"
import CardWithHeader from "../ui/card-with-header"
import { useMenuOrder } from "@/app/hooks/use-menu-order";
import { getImageUrl } from "@/app/lib/api";

type TOrderItems ={
    handlePayment: () => void;
}

const OrderItems = ({handlePayment}: TOrderItems) => {
    const {items, removeMenu} = useMenuOrder()
    const totalPrice = items.reduce((total, item) => total + item.qty * item.price, 0)

    return <CardWithHeader title="Cart Items">
        <div className="flex flex-col justify-between h-[calc(100%-70px)]">
            <div className="overflow-auto max-h-[300px]">
                {
                    items.map((item) => (
                        <div className="border border-gray-200 p-4 flex gap-3" key={item._id}>
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
                    ))
                }
            </div>
            <div className="border-t border-gray-200 p-4">
                <div className="flex justify-between font-semibold">
                    <div className="text-sm">Total</div>
                    <div className="text-primary text-xs">{PriceFormatter(totalPrice)}</div>
                </div>
                <Button variant="dark" size="small" className="w-full mt-4" onClick={handlePayment}>
                    <FiCreditCard /> Proceed to Payment
                </Button>
            </div>
        </div>
    </CardWithHeader>
}

export default OrderItems