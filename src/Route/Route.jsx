import {
    createBrowserRouter,
 
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Dashboard from "../Layouts/Dashboard";
import CreateTask from "../Pages/dashboard/CreateTask";
import ListTask from "../Pages/dashboard/ListTask";
import PrivateRouter from "./PrivateRouter";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
          path:'/',
          element:<Home></Home>
        },
        {
          path:'login',
          element:<Login></Login>
        },
        {
          path:'signup',
          element:<Signup></Signup>
        },
      ]
    },
    {
      path: 'dashboard',
      element:<PrivateRouter><Dashboard></Dashboard></PrivateRouter> ,
      children: [
        {
          path: 'home',
          element:<ListTask></ListTask>
        },

        {
          path: 'addTask',
          element:<CreateTask></CreateTask>
        },
      
        // {
        //   path:'myProfile',
        //   element:<MyProfile></MyProfile>

        // },
        // {
        //   path:'myPosts',
        //   element:<MyPost></MyPost>

        // },
      ]
    },
        // {
        //   path: 'addTask',
        //   element:<CreateTask></CreateTask>
        // },
  ]);
