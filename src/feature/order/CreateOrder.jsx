import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";
import store from "../../store"
import { formatCurrency } from "../../utils/helpers";
import EmptyCart from "../cart/EmptyCart";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const { username, status: addressStatus, address, error: addressError, position } = useSelector(state => state.user);
  const cart = useSelector(getCart);
  console.log(cart);
  const navigation = useNavigation();
  const formErrors = useActionData();
  const isSubmitting = navigation.state === "submitting";
  const isLoadingAddress = addressStatus === "loading";
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = totalCartPrice * (withPriority ? 0.2 : 0);
  const dispatch = useDispatch();
  if (cart.length === 0)
    return <EmptyCart />;

  return (
    <div className="py-6 px-4">
      <h2 className="text-xl font-semibold mb-6">Ready to order? Let&apos;s go!</h2>


      <Form method="POST">
        <div className="mb-4 flex gap-2 sm:gap-12 flex-col sm:flex-row">
          <label className="sm:basis-40">First Name</label>

          <input type="text" name="customer" defaultValue={username} className="input w-full" required />
        </div>

        <div className="mb-4 flex gap-2 flex-col sm:flex-row">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow flex flex-col gap-2">
            <input type="tel" name="phone" className="input w-full" required />
            {formErrors?.phone && <p className="bg-red-100 text-red-700 rounded-md px-3 py-2 text-xs">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-4 flex gap-2 flex-col sm:flex-row">
          <label className="sm:basis-40">Address</label>
          <div className="grow relative">
            <input type="text" name="address" className="input w-full" required disabled={isLoadingAddress} defaultValue={address} />
            <span className="absolute right-[4px] top-[5px] sm:top-[2px] sm:right-[3px]">
              <Button type="small" onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress())
              }} disabled={isLoadingAddress || isSubmitting}>Get location</Button>
            </span>
            {addressStatus === 'error' && <p className="bg-red-100 text-red-700 rounded-md px-3 py-2 text-xs mt-2">{addressError}</p>}
          </div>

        </div>

        <div className="p-6 flex  gap-4 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="w-6 h-6 accent-yellow-400 focus:ring focus:ring-yellow-400 ring-offset-2 focus:outline-none"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        </div>
        <div>
          <input type="hidden" name="position" value={(position.lattitude && position.longitude) ? (JSON.stringify(position)) : ''} />
        </div>

        <div>
          <Button type="primary" disabled={isSubmitting}>{isSubmitting ? 'Placing Order...' : `Order now for ${formatCurrency(totalCartPrice + priorityPrice)}`}</Button>
        </div>
      </Form>
    </div>
  );
}


export async function actions({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData)
  const order = { ...data, cart: JSON.parse(data.cart), priority: data.priority === 'true', position: JSON.parse(data.position) }
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = "Please give your correct phone number. We might need it."
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }
  if (data != null)
    return null
  const newOrder = await createOrder(order)
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
