"use client"

import { HiReceiptRefund } from "react-icons/hi"

const OrderRefunded = () => {
    return <main className="bg-white w-160 p-16 flex flex-col justify-center items-center">
        <div className="w-20 h-20 bg-primary-alternate rounded-full mx-auto p-3 flex justify-center items-center text-primary mb-5">
            <HiReceiptRefund size={52} />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Order Refunded</h2>
        <p className="text-center mb-8">
            Your order is refunded.
        </p>
    </main>
}

export default OrderRefunded