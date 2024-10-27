import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "./../../utils/helpers";
import { deleteItem } from "./cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const { pizzaId, name, quantity, totalPrice } = item;

  function handleDelete() {
    if (!pizzaId) return;
    dispatch(deleteItem(pizzaId));
  }

  return (
    <li className="justify-between py-3 sm:flex sm:items-center">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Button type="small" onClick={() => handleDelete()}>
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
