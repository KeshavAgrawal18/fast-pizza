import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import DeleteButton from "./DeleteButton";
import UpdateButton from "./UpdateButton";
import { getCurrentQuantityById } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));
  return (
    <li className="sm:flex sm:flex-row sm: space justify-between py-2 sm:py-4">
      <p>
        <span className="font-semibold">{quantity}&times;</span> {name}
      </p>
      <div className="flex flex-row items-center justify-between sm:space-x-8">
        <UpdateButton pizzaId={pizzaId} currentQuantity={currentQuantity} />
        <p className="text-sm font-semibold">{formatCurrency(totalPrice)}</p>
        <DeleteButton pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
