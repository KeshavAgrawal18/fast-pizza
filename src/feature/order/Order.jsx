import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

function Order() {
  const order = useLoaderData()
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="flex justify-between flex-wrap gap-4">
        <div className="text-xl font-semibold">Order #{id}  status</div>


        <div className="flex gap-4">
          {priority && <span className="text-sm uppercase bg-red-600 text-red-50 px-3 py-1 rounded-full font-semibold tracking-wider">Priority</span>}
          <span className="text-sm uppercase bg-green-600 text-green-50 px-3 py-1 rounded-full font-semibold tracking-wider">{status} order</span>
        </div>
      </div>

      <div className="flex gap-2 items-center flex-wrap bg-stone-200 px-6 py-4 rounded-sm justify-between">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs font-bold text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-y divide-stone-200 flex flex-col border-b border-t">
        {cart.map(item => <OrderItem item={item} key={item.id} />)}
      </ul>

      <div className="flex flex-col gap-2 flex-wrap bg-stone-200 px-6 py-4 rounded-sm">
        <p className="text-sm font-medium">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm font-medium">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

export default Order;
