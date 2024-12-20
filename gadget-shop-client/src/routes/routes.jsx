import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Registar from "../pages/Registar";
import DashboardLayout from "../layout/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import Overview from "../components/dashboard/Overview";
import MyProducts from "../components/dashboard/MyProducts";
import AddProducts from "../components/dashboard/AddProducts";
import SellerRoutes from "./SellerRoutes";


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

    {
      path:'/dashboard',
      element:<PrivateRoute><DashboardLayout/></PrivateRoute>,
      children:[
        {
          path:'/dashboard/overview',
          element:<Overview/>
        },
        //selller routes
        {
          path:'/dashboard/products',
          element:<SellerRoutes><MyProducts/></SellerRoutes>
        },
        {
          path:'/dashboard/add-products',
          element:<SellerRoutes><AddProducts/></SellerRoutes>
        },
      ]
    }
  ]);