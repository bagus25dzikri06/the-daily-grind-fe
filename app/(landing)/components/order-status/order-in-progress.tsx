"use client"

import { FiRefreshCw } from "react-icons/fi"

const OrderInProgress = () => {
    return <main className="bg-white w-160 p-16 flex flex-col justify-center items-center">
        <div className="w-20 h-20 bg-primary-alternate rounded-full mx-auto p-3 flex justify-center items-center text-primary mb-5">
            <FiRefreshCw size={52} />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Order In Progress</h2>
        <p className="text-center mb-8">
            Your order is being processed right now. We&apos;ll inform you if it&apos;s getting ready to be served later
        </p>
    </main>
}

export default OrderInProgress