import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;
  console.log(isLoadingIngredients, ingredients);

  return (
    <li className="px-6 py-4">
      <div className="flex justify-between">
        <p>
          <span className="font-semibold">{quantity}&times;</span> {name}
        </p>
        <p className="text-sm font-semibold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
