import axios from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from "react-query";

const baseUrl = "https://dummyapi.io/data/v1/user/";
const id= "64fc4a747b1786417e354f31";


//getcontacts
export async function getContact() {
  return await axios.get(baseUrl ,
  {
    headers:{
    "app-id": id,
  }});
}
export async function getContacte(page) {
  return await axios.get("https://dummyapi.io/data/v1/user?limit=3&page="+page ,
  {
    headers:{
    "app-id": id,
  }});
}

export async function getPagination() {
   await axios.get(baseUrl)

}
//removecontacts
export async function deleteContact(idU){
  
  return await axios.delete(baseUrl+idU,{headers:{
    "app-id":id
  }})
  
}



//addcontacts
export async function addContact(values) {
   await axios.post(baseUrl + "create", values, {
    headers: {
      "app-id": id,
    },
  });
 
}


//getcontacts
export function useGetContacts( page) {
  return useQuery({
    queryKey: ["pages", page],
    queryFn: () => getContacte(page),
    keepPreviousData: true,
  });
}


//remove and 
export function useDelAndUp(fn){
  let queryClient=useQueryClient();
  return useMutation(fn,{
    onSuccess:()=>{
      toast.success('removed')
      queryClient.invalidateQueries("pages")
    
    },
      onError:()=>{
        
        toast.error("Network Error")
      }
  })};
