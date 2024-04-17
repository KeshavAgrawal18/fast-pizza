import { useDispatch } from "react-redux";
import Button from "../../ui/Button"
import { updateQuantityDecrement, updateQuantityIncrement } from "./cartSlice";

function UpdateButton({ pizzaId, currentQuantity }) {
    console.log(currentQuantity);
    const dispatch = useDispatch();
    return (
        <div className="flex gap-2 md:gap-4 items-center">
            <Button type="round" onClick={() => dispatch(updateQuantityDecrement(pizzaId))}>-</Button>
            <span className="font-medium">{currentQuantity}</span>
            <Button type="round" onClick={() => dispatch(updateQuantityIncrement(pizzaId))}>+</Button>
        </div>
    );
}

export default UpdateButton;