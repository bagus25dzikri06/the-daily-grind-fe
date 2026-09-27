import OrderPaid from "../../components/order-status/order-paid"
import OrderSubmitted from "../../components/order-status/order-submitted"
import OrderInProgress from "../../components/order-status/order-in-progress"
import OrderReady from "../../components/order-status/order-ready"
import { getTransactionById } from "@/app/services/transaction.service"
import { TPageProps } from "../../menu/[id]/page"
import OrderCancelled from "../../components/order-status/order-cancelled"
import OrderRefunded from "../../components/order-status/order-refunded"

const OrderStatus = async ({params}: TPageProps) => {
    const {id} = await params
    const transaction = await getTransactionById(id)

    return <main className="bg-gray-100 min-h-[80vh] pt-20">
        <div className="max-w-5xl mx-auto pt-15 pb-10">
            <h1 className="text-5xl font-bold text-center mb-11">Order Status</h1>
        </div>
        <div className="grid place-items-center gap-14 pb-20 px-25">
            {
                transaction.status === 'paid' && <OrderPaid />
            }
            {
                transaction.status === 'pending' && <OrderSubmitted />
            }
            {
                transaction.status === 'in progress' && <OrderInProgress />
            }
            {
                transaction.status === 'ready' && <OrderReady />
            }
            {
                transaction.status === 'cancelled' && <OrderCancelled />
            }
            {
                transaction.status === 'refunded' && <OrderRefunded />
            }
        </div>
    </main>
}

export default OrderStatus