"use client";

import { useState } from "react"
import OrderItems from "../components/checkout/order-items"
import OrderInformation from "../components/checkout/order-information"
import { CustomerInfo, useMenuOrder } from "@/app/hooks/use-menu-order";
import { useRouter } from "next/navigation";

const Checkout = () => {
    const {push} = useRouter()
    const { setCustomerInfo } = useMenuOrder()
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
            <OrderItems handlePayment={handlePayment} />
        </div>
    </main>
}

export default Checkout