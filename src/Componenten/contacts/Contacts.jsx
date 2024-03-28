import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import noImage from "../../assist/unnamed.png";
import {
  deleteContact,
 
  useDelAndUp,
  useGetContacts,

} from "../UseContacts";

export default function Contacts() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  let { data ,isPreviousData,} = useGetContacts(page);

  const lastPage = () => setPage(data?.data?.total)
  console.log();
  const firstPage = () => setPage(0)
  const pagesArray = Array(data?.data?.total).fill().map(( a,index) => index )

  let { mutate: removeMutate } = useDelAndUp(deleteContact);

  let [filter, setFilter] = useState([]);
  const [value, setValue] = useState("");
 


  const onInput = (e) => setValue(e.target.value);
  function onClear() {
    setValue("");
  }

  function addUser() {
    navigate("/adduser");
  }

  function search(e) {
    let value = e.target.value;
    setFilter(
      data?.data?.data?.filter((co) =>
        co?.firstName.toLowerCase().trim().includes(value.toLowerCase())
      )
    );
  }
 
  return (
    <>
      <div className="box ">
        <div className="border rounded p-3 w-100 innbox">
          <input
            className="form-control rounded mx-auto "
            placeholder="Search by Name"
            onChange={search}
            value={value}
            onInput={onInput}
            
          ></input>
          <button
            className=" btn  rounded-4  my-2 addcontact"
            onClick={addUser}
          >
            + Add new Contact
          </button>
          <>
            {filter?.length ? filter?.map((contact) => { 
                return    <>
                      <Contact key={contact.id}  contact={contact}  action={onClear}  removeMutate={removeMutate}
                      ></Contact>
                      <hr className="w-75 mx-auto "></hr>
                    </> }): data?.data?.data?.map((contact) => {
                return    <>
                      <Contact
                        key={contact.id}
                        contact={contact}
                        action={onClear}
                        removeMutate={removeMutate}
                      ></Contact>
                      <hr className="w-75 mx-auto "></hr>
                    </>
                    }
                )}
          </>
        <div className="pa">
          <Link onClick={firstPage} disabled={isPreviousData || page === 1}>&lt;</Link>
          {pagesArray.map(pg => <> <PageButton key={pg} pg={pg} setPage={setPage} />/</>)}
            <Link onClick={lastPage} disabled={isPreviousData || page === data?.data?.total}>&gt;</Link>
            </div>
        </div>
      </div>
    </>
  );
}

function Contact({ contact, removeMutate, action }) {
  function reData(id) {
    action();
    removeMutate(id);
  }
  return (
    <>
      <div className="row  my-4">
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <div className=" imgUser ">
            <img
              src={contact?.picture ? contact?.picture : noImage}
              alt="user"
              className="img-fluid imgUser "
            ></img>
          </div>
          <div className="d-flex flex-column  justify-content-center  mx-3">
            <p>{contact?.firstName}</p>
            <p> {contact?.phoneNumber}</p>
          </div>
        </div>
        <div className="col-md-8">
          <div className=" d-flex  justify-content-end ">
            <Link
              className=" p-2 bg-light  text-info  border-0 rounded"
              to={`updateuser/${contact?.id}`}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </Link>
            <button
              className=" mx-3 text-danger  border-0 rounded "
              onClick={() => reData(contact?.id)}
            >
              <i className="fa-solid fa-trash "></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function PageButton({pg , setPage}){
  
    return <Link onClick={() => setPage(pg)}>{pg}</Link>
}
