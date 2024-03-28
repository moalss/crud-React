
import React, {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import noImage from "../../assist/unnamed.png";

import axios from "axios";
import toast from "react-hot-toast";

const baseUrl = "https://dummyapi.io/data/v1/user/";
const idu= "64fc4a747b1786417e354f31";


 export  default function UpdateUser() {
  const {id}=useParams();
  let [image,setImage]=useState("");
  let [info,setInfo]=useState([]);

 
  
    
    
      useEffect(()=>{
        axios.get(baseUrl+id ,
          {
            headers:{
              "app-id": idu,
            }}).then((data)=>{setInfo(data?.data); setImage(info?.data?.picture)});
      },[])
         
          
       

        
      
        
   
       
  const navigate = useNavigate();
  function goToContacts() {
    navigate("/");
  }
 

function handleSubmit(e){
  e.preventDefault();

   axios.put(baseUrl+id,info,
    {headers:{
    "app-id":idu
  }}).then(e=>{
    console.log(e);
    console.log(info);
    toast.success('Updated');
    goToContacts()
  }).catch((error)=>toast.error(error))
}
 
   

      
      return (
        <>
        <div className="box  ">
          <div className="border w-100 rounded p-3 bg-light">
            <div className="boxImg d-flex flex-column ">
              <div>
                {image?<img
                  src={image}
                  className="imgUser border border-black "
                  alt="user image"
                ></img>:<img
                src={noImage}
                className="imgUser border border-black "
                alt="user image"
              ></img>}
              </div>
              <div>
              <input type="file" id="file"  onChange={(e)=>{
               
              }} className="d-none"
               ></input>
              <label type="submit" htmlFor="file" >Upload Image</label>
              </div>
            </div>
            <div className="formBox">
              <form onSubmit={handleSubmit} >
                <div className="d-flex my-4 ">
                  <input
                  type="text"
                    name="firstName"
                    className="form-control  w-50  m-2 "
                    placeholder="First Name"
                    value={info?.firstName}
                    onChange={(e)=>setInfo({...info,firstName:e.target.value})}
                  ></input>
                  <input
                  type="text"
                   
                    name="lastName"
                    className="form-control  w-50  m-2"
                    placeholder="Last Name"
                    value={info?.lastName}
                   onChange={e=>setInfo({...info,lastName:e.target.value})}
                  ></input>
                </div>
                <div className="d-flex my-4 ">
                  <input
                    type="tel"
                    name="phoneNumber"
                    className="form-control  w-50 m-2 "
                    placeholder="Phone Number"
                    value={info?.phoneNumber}
                    onChange={e=>setInfo({...info,phoneNumber:e.target.value})}
                  ></input>
                  <input
                    type="email"
                    
                    name="email"
                    className="form-control  w-50 m-2"
                    placeholder="Email"
                   
                    value={info?.email}
                   onChange={e=>setInfo({...info,email:e.target.value})}
                  ></input>
                  
                </div>
                <div className="d-flex  justify-content-between ">
                  <div className="divbtn">
                    <button
                      className="btn text-dark rounded b1 "
                      onClick={goToContacts}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="divbtn">
                    <button
                      className="btn text-light   rounded  b2"
                      type="submit"
                      //disabled={!(formik.isValid&&formik.dirty)}
                     
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

    