"use client";

import { useState } from "react"
import CartItems from "../components/checkout/cart-items"
import OrderInformation from "../components/checkout/order-information"
import { CustomerInfo, useCartStore } from "@/app/hooks/use-cart-store";
import { useRouter } from "next/navigation";

const Checkout = () => {
    const {push} = useRouter()
    const { customerInfo, setCustomerInfo } = useCartStore()
    const handlePayment = () => {
        if (!formData.customerName || !formData.customerContact || !formData.customerAddress ) {
            alert('Please, fill in all fields!')
            return
        }
        setCustomerInfo(formData)
        push("/payment")
    }
    const [formData, setFormData] = useState<CustomerInfo>({
        customerName : '',
        customerContact: '',
        customerAddress : ''
    })
    
    return <main className="bg-gray-100 min-h-[80vh] pt-20">
        <div className="max-w-5xl mx-auto pt-15 pb-10">
            <h1 className="text-5xl font-bold text-center mb-11">Checkout Now</h1>
        </div>
        <div className="grid grid-cols-2 gap-14 pb-20 px-25">
            <OrderInformation formData={formData} setFormData={setFormData}/>
            <CartItems handlePayment={handlePayment} />
        </div>
    </main>
}

export default Checkout