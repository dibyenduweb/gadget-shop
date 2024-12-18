import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Registar from "../pages/Registar";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children:[
        {
          path:"/",
          element:<Home/>,
      },
      {
        path:"/product",
        element:<Products/>,
      },
      {
        path:"/about",
        element:<About/>,
      },
      {
        path:"/contact",
        element:<Contact/>,
      },
      {
        path:"/login",
        element:<Login/>,
      },
      {
        path:"/registar",
        element:<Registar/>,
      }
    ]
    },
  ]);