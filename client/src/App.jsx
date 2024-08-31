import Home from "./pages/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Layout from "./Outlet/Layout.jsx";
import CartPage from "./pages/Product/CartPage.jsx";
import ViewProduct from "./pages/Product/ViewProduct.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Admin from "./pages/Home/Admin.jsx";
import NotFound from "./components/404/NotFound.jsx";
import Order from "./pages/Order/Order.jsx";
import InvoicePage from "./pages/Order/InvoicePage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="/admin" element={<Layout />}>
        <Route index element={<Admin/>} />
      </Route>

      <Route path="/carts" element={<Layout />}>
        <Route index element={<CartPage />} />
      </Route>

        <Route path="/receipt" element={<InvoicePage />} />

      <Route path="/product/:pid" element={<ViewProduct/>}/>
      <Route path="/orders" element={<Order/>}/>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={<NotFound/>}/>
    </>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
