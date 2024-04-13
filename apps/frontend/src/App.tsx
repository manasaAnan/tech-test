import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UsersPage } from "./pages/users/UsersPage";
import { RootPage } from "./pages/root/RootPage";
import { ProductsPage } from "./pages/products/ProductsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
  },
  {
    path: "/users",
    element: <UsersPage />,
  },
  {
    path: "/products",
    element:  <ProductsPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
