import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button"
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteButton from "../cart/DeleteButton";
import UpdateButton from "../cart/UpdateButton";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  console.log(imageUrl);
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  console.log(currentQuantity);
  // const isAddedToCart = useSelector(state => (state.cart.cart.findIndex(obj => obj.pizzaId === id)>-1));
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(addItem({ pizzaId: id, name, quantity: 1, unitPrice, totalPrice: unitPrice }))

  }

  return (
    <li className="flex flex-row space-x-4 py-2">
      <img src="https://tse1.mm.bing.net/th?id=OIP.HVnpXNaDOR880P-_ldJEoQHaFj&pid=Api&P=0&h=180" className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`} alt={name} />
      {/* <img src={imageUrl} className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`} alt={name} /> */}
      <div className="grow">
        <p className=" font-bold">{name}</p>
        <p className="text-sm capitalize italic">{ingredients.join(', ')}</p>
        <div className="font-semibold text-stone-500 flex flex-cols justify-between items-center text-sm sm:text-base flex-wrap gap-2">
          {!soldOut ?
            <p>{formatCurrency(unitPrice)}</p> :
            <p>Sold out</p>}
          {!soldOut && (currentQuantity ? <div className="flex gap-4 md:gap-8 items-center">
            <UpdateButton pizzaId={id} currentQuantity={currentQuantity} /> <DeleteButton pizzaId={id} />
          </div> :
            <Button type="small" onClick={handleClick}>Add to Cart</Button>)}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
