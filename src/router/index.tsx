import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layouts";
import Home from "@/pages/Home";
import About from "@/pages/About";

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
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

export default router;
