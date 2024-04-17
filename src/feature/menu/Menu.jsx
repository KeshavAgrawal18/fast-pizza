import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData()
  console.log(menu);
  return <ul className="divide-y-2 divide-slate-200 py-2">
    {menu.map(pizza => <MenuItem pizza={pizza} key={pizza.id} />)}
  </ul>
}

export function loader() {
  const menu = getMenu();
  return menu;
}

export default Menu;
