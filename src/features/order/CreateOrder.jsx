import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "./../../store";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST" action="">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="flex-grow rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="flex-grow">
            <input
              type="tel"
              name="phone"
              required
              className="w-full rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3"
            />
          </div>
          {formErrors?.phone && (
            <p className="mt-2 rounded-md bg-red-100 p-2 text-sm text-red-600">
              {formErrors.phone}
            </p>
          )}
        </div>

        {/* TODO: later when enable the get position button, set its parent div as relative */}
        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="flex-grow">
            <input
              type="text"
              name="address"
              required
              className="w-full rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3"
            />
          </div>

          {/* //TODO: */}
          {/* <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
            <Button type="small">Get position</Button>
          </span> */}
        </div>

        <div className="relative mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-400"
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <div>
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting
              ? "Placing order..."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  //below 2 lines are the standard formula to get the form data out from the form
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  // console.log(order)
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please give us your correct phone number";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  //Becareful using this syntax, do not overuse
  // clear cart here, so the cartOverview components wouldn't display after making an order
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
  // return null;
}

export default CreateOrder;
