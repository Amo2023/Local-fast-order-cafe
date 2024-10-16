import { Link } from "react-router-dom";

function Button({ disabled, children, to, type }) {
  const base =
    "inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 text-sm px-2 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";
  const styles = {
    primary: base + "px-4 py-3 md:px-6 md:py-4",
    small: base + "py-2 px-4 md:px-5 md:py-2.5 text-xs",
    secondary:
      "  md:px-6 md:py-3.5 inline-block rounded-full border-2 border-stone-300 px-4 py-3 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-500 focus:outline-none  disabled:cursor-not-allowed",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
