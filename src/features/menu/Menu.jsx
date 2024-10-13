import { useLoaderData, useRouteError } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "../menu/MenuItem"

function Menu() {
const menu=useLoaderData()
// console.log(menu)

  return <>
  {menu.map(pizza=><MenuItem pizza={pizza} key={pizza.id}/>)}</>;
}

export async function loader() {
  const menu = getMenu();
  return menu;
}

export default Menu;
