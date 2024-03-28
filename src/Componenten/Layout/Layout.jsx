import React from 'react'

import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
    <div  className="img"  >
   
    <div className="App container w-75   ">
   
    
 
  
    <Outlet></Outlet>
      
      
      </div>
      </div>
    </>
  )
}
