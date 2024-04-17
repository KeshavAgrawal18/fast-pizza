import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';
import CartItem from "./CartItem"
import EmptyCart from './EmptyCart';
import { clearCart } from './cartSlice';

function Cart() {
  const cart = useSelector(store => store.cart.cart);
  const username = useSelector(store => store.user.username)
  const dispatch = useDispatch();

  function handleClearCart(e) {
    e.preventDefault();
    dispatch(clearCart());
  }

  if (cart.length === 0)
    return <EmptyCart />;
  return (
    <div className='py-3 px-4'>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <div className='m-7'>
        <h2 className='font-semibold text-xl'>Your cart, {username}</h2>
        <ul className='m-6 divide-y divide-slate-200 border-b'>
          {cart.map(pizza => <CartItem key={pizza.pizzaId} item={pizza} />)}
        </ul>
        <div className='space-x-4'>
          <Button type="primary" to="/order/new">Order pizzas</Button>
          <Button type="secondary" onClick={handleClearCart}>Clear cart</Button>
        </div>
      </div>
    </div>
  );
}


export default Cart;
