"use client";

import Image from "next/image"
import Button from "../ui/button"
import { FiRefreshCw } from "react-icons/fi"

const OrderPaid = () => {
    const reloadOrderStatus = () => {
        window.location.reload()
    }

    return <main className="bg-white w-160 p-16 flex flex-col justify-center items-center">
        <Image 
        src="/images/icon-order-submitted.svg" 
        width={117} 
        height={117} 
        alt="order submitted" 
        className="mb-4"/>
        <h2 className="text-2xl font-semibold mb-2">Order Paid !!</h2>
        <p className="text-center mb-8">We have received your payment, and your order is currently processed by our barista and our cook, just wait until your favorite dish arrive.</p>
        <Button variant="dark" className="w-full" onClick={reloadOrderStatus}><FiRefreshCw />Refresh Order Status</Button>
    </main>
}

export default OrderPaid