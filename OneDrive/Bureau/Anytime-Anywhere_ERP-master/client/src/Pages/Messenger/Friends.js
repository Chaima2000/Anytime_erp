import React , {useEffect, useState} from 'react';
import axios from 'axios';
import "../../Css/_friends.scss";

function Friends() {
  const [userList,setUserList]=useState([]);
  const [selected, setSelected] = useState();
 
  let i =0;
   useEffect(()=>{
       axios.post("/getUsers").then((res)=>{
           if(res.data === "ERROR"){
               alert("error")
           }
           else{
               setUserList(res.data.users)
           }
       })
   },[])
  return (
    <>
    
    </>
  )
}

export default Friends