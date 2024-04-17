import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Error from "./ui/Error";
import Menu, { loader as menuLoader } from "./feature/menu/Menu";
import Cart from "./feature/cart/Cart";
import CreateOrder, { actions as createOrderActons } from "./feature/order/CreateOrder";
import Order, { loader as orderLoader } from "./feature/order/Order";
import AppLayout from "./ui/AppLayout";

const router = createBrowserRouter([{
  element: <AppLayout />,
  errorElement: <Error />,
  children:
    [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/menu",
        element: <Menu />,
        errorElement: <Error />,
        loader: menuLoader,
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderActons,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        errorElement: <Error />,
        loader: orderLoader,
      }
    ]
}])

function App() {
  return <RouterProvider router={router} />;
}

export default App;