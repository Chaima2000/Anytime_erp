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
    {userList.map( (item,index)=>{
      return(
        <>
      <div className="hover-friend">
        <div className="friend"  key={index}>
          <div className="friend-image">
            <div className="image">
              <span><img src={item.image} /></span>
            </div>
          </div>
          <div className="friend-name">
              <h4>{item.firstName} {item.lastName}</h4>
          </div>
        </div>
      </div>
        </>
      )
      
    })}
    </>
  )
}

export default Friends