import { Field, useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import noImage from "../../assist/unnamed.png";
import * as Yup from "yup";

import axios from "axios";
import toast from "react-hot-toast";

const id= "64fc4a747b1786417e354f31";


export default function AddUser() {

  let [image,setImage]=useState('');
  const navigate = useNavigate();

  async function goToContacts(values) {
    
  await axios.post("https://dummyapi.io/data/v1/user/create", values, {
      headers: {
        "app-id": id,
      },
    }).then(()=>{
      toast.success('Added');
      navigate("/")}).catch((error)=>{
          if(error.response){
            toast.error(error?.response?.data?.data?.email);
            
          }
        })
    
  }
 function  goToContact(){
  navigate("/");
 }

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is requierd"),
  });

  let initialValues={
    firstName:'',
    lastName:'',
    email:'',
    phoneNumber:'',
    photo:''
  }

 


  let formik =
  useFormik({
    initialValues,
    validationSchema,
    onSubmit:goToContacts,
    
        
      });
    
     
   console.log(formik);
      
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
              <input type="file" id="file"  accept='image/*'
              name="file"
            onChange={(event) =>{
              formik.setFieldValue("photo", event.target.files[0]);
            }} className="d-none"  ></input>
              <label type="submit" htmlFor="file" >Upload Image</label>
              </div>
            </div>
            <div className="formBox">
              <form onSubmit={formik.handleSubmit} >
                <div className="d-flex my-4 ">
                  <input
                  type="text"
                    name="firstName"
                    className="form-control  w-50  m-2 "
                    placeholder="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                  ></input>
                  <input
                  type="text"
                   
                    name="lastName"
                    className="form-control  w-50  m-2"
                    placeholder="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                  ></input>
                </div>
                <div className="d-flex my-4 ">
                  <input
                    type="tel"
                    name="phoneNumber"
                    className="form-control  w-50 m-2 "
                    placeholder="Phone Number"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                  ></input>
               
                <input
                type="email"
                 name="email"
                className="form-control  w-50 m-2"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
              {formik.errors.email &&formik.touched.email ? (
                <span className="alert alert-danger">Email is requierd</span>
              ) : (
                ""
              )}
                
                </div>
                <div className="d-flex  justify-content-between ">
                  <div className="divbtn">
                    <button
                      className="btn text-dark rounded b1 "
                      onClick={goToContact}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="divbtn">
                    <button
                      className="btn text-light   rounded  b2"
                      type="submit"
                      disabled={!(formik.isValid&&formik.dirty)}
                      
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

