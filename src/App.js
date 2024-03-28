import React from 'react';
import './App.css';
import Contacts from './Componenten/contacts/Contacts';
import AddUser from './Componenten/Add User/AddUser';
import UpdateUser from './Componenten/UpdateUser/UpdateUser';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './Componenten/Layout/Layout';

function App() {
const router= createBrowserRouter([{
  path:"",
  element:<Layout></Layout>,children:[
    {index:true,element:<Contacts></Contacts>},
    {path:"/addUser",element:<AddUser></AddUser>},
    {path:"/updateuser/:id",element:<UpdateUser></UpdateUser>}
  ]
}])


  return (
    <>
    
    <RouterProvider router={router}/>
    </>
     
   
  );
}

export default App;
