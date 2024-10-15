import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";

function CartOverview() {
  return (
    <div className="flex bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base items-center justify-between">
      <p className="space-x-4 sm:space-x-6">
        <span className="font-semibold text-slate-300">23 pizzas</span>
        <span>$23.45</span>
      </p>
      <LinkButton to="/cart">Open cart &rarr;</LinkButton>
    </div>
  );
}

export default CartOverview;
