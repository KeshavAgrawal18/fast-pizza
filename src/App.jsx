import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Menu from "./feature/menu/Menu";
import Cart from "./feature/cart/Cart";
import Order from "./feature/order/Order";
import OrderItem from "./feature/order/OrderItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/menu",
    element: <Menu />
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/order/new",
    element: <Order />
  },
  {
    path: "/order/:orderId",
    element: <OrderItem />
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;