import { useRoutes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import ContactData from "./pages/ContactData";

const AppRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: <HomePage />,
      children: [],
    },
    {
      path: "/orders",
      element: <Orders />,
      children: [],
    },
    {
      path: "/checkout",
      element: <Checkout />,
      children: [],
    },
    {
      path: "/checkout/contact-data",
      element: <ContactData />,
      children: [],
    },
  ]);
};

export default AppRoutes;
