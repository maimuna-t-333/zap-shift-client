import {
  createBrowserRouter,

} from "react-router";

import Home from "../Pages/Home/Home/Home";
import RootLayout from "../Layout/RootLayput";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoute from "../routes/PrivateRoute";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashBoardLAyout from "../Layout/DashBoardLAyout";
import Myparcels from "../Pages/DashBoard/MyParcels/Myparcels";



export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
        {
            index:true,
            Component:Home
        },
        {
          path:'coverage',
          Component:Coverage
        },
        {
          path:'sendParcel',
          element:<PrivateRoute><SendParcel></SendParcel></PrivateRoute>,

        }
    ]
  },
  {
    path:'/',
    Component:AuthLayout,
    children:[
        {
            path:'login',
            Component:Login
        },
        {
            path:'register',
            Component:Register
        }
    ]
  },
  {
    path:'dashBoard',
    element: <PrivateRoute><DashBoardLAyout></DashBoardLAyout></PrivateRoute>,
    children:[
      {
        path:'myParcels',
        Component:Myparcels
      }
    ]
  }
]);