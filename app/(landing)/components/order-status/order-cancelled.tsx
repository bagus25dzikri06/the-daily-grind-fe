"use client"

import { FiAlertCircle } from "react-icons/fi"

const OrderRejected = () => {
    return <main className="bg-white w-160 p-16 flex flex-col justify-center items-center">
        <div className="w-20 h-20 bg-primary-alternate rounded-full mx-auto p-3 flex justify-center items-center text-primary mb-5">
            <FiAlertCircle size={52} />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Order Cancelled</h2>
        <p className="text-center mb-8">
            Your order is cancelled. The digital payment, credit card authorization, or cash processing was declined or interrupted.
        </p>
    </main>
}

export default OrderRejected