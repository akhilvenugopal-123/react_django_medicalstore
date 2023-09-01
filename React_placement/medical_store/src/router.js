import { createBrowserRouter } from "react-router-dom";
import React from 'react';
import Signup from "./components/auth/Register";
import Login from "./components/auth/Login";
// import App from "./App";
import ListMed from "./components/crud/home";
import EditMedicine from "./components/crud/Edit";
import ViewMedicine from "./components/crud/View";
import AddMed from "./components/crud/Add";
import Search from "./components/crud/Search";


const router = createBrowserRouter([

    {path:'',element:<Signup/>},
    {path:'/Login',element:<Login/>},
    {path:'/Home',element:<ListMed/>},
    {path:'/Add',element:<AddMed/>},
    {path:'/Edit/:medId',element:<EditMedicine/>},
    {path:'/View/:medId',element:<ViewMedicine/>},
    {path:'/Search',element:<Search/>}

]);

export default router;