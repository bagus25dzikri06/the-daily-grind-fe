"use client"

import { FaCheckCircle } from "react-icons/fa"

const OrderReady = () => {
    return <main className="bg-white w-160 p-16 flex flex-col justify-center items-center">
        <div className="w-20 h-20 bg-primary-alternate rounded-full mx-auto p-3 flex justify-center items-center text-primary mb-5">
            <FaCheckCircle color="#AB5A2B" size={52} />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Order Rejected !!</h2>
        <p className="text-center mb-8">
            I&apos;m sorry your order is rejected, because your payment proof is not valid.
        </p>
    </main>
}

export default OrderReady