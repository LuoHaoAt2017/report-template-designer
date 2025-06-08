import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layouts";
import Home from "@/pages/Home";
import Chess from "@/pages/Chess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/chess",
        element: <Chess />,
      },
    ],
  },
]);

export default router;
