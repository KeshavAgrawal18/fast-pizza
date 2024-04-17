import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

function DeleteButton({ pizzaId }) {
    const dispatch = useDispatch();
    function handleDelete(e) {
        e.preventDefault();
        console.log(pizzaId);
        dispatch(deleteItem(pizzaId))
    }
    return (
        <Button type="small" onClick={handleDelete}>Delete</Button>
    );
}

export default DeleteButton;