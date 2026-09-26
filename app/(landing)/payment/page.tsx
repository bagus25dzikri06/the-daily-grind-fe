import PaymentOptions from "../components/payment/payment-options"
import PaymentSteps from "../components/payment/payment-steps"

const Payment = () => {
    return <main className="bg-gray-100 min-h-[80vh] pt-20">
        <div className="max-w-5xl mx-auto pt-15 pb-10">
            <h1 className="text-5xl font-bold text-center mb-11">Payment</h1>
        </div>
        <div className="grid grid-cols-2 gap-14 pb-20 px-25">
            <PaymentOptions />
            <PaymentSteps />
        </div>
    </main>
}

export default Payment