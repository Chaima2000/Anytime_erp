import React, { useEffect,useContext, useState } from 'react';
import axios from 'axios';
import  "./../../Css/_messenger.scss";
import {FiMoreHorizontal,FiEdit} from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import ActiveFriend from '../Messenger/ActiveFriend';
// import Friends from './Friends';
import RightSide from './RightSide';
import "../../Css/_friends.scss";
import { AppContext } from "../../Context/AppContext";
function Messenger() {
    const {user} = useContext(AppContext);
    const [currentUSer,setCurrentUser]=useState(false);
    const [userList,setUserList]=useState([]);
    const [usersList,setUsersList]=useState({});
    const [newMessage, setNewMessage] = useState("💕");
    const [newImage,setNewImage]=useState("");
    const senderId = user.id;
    const [receiverId , setReceiverId]=useState('');
    const senderName= user.firstName +" "+ user.lastName;
    let i=0;
    const inputHandle = (e)=>{
      setNewMessage(e.target.value);
    }
    function convertBase64(file) {
      return new Promise((resolve, reject) => {
       const fileReader = new FileReader();
       fileReader.readAsDataURL(file);
       fileReader.onload = () => {
         resolve(fileReader.result);
       };
       fileReader.onerror = (error) => {
         reject(error);
       };
     });
   }
    const fileHandle = async(e)=>{
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setNewImage(base64);
  }
  
  //  console.log(newImage) 
    const sendMessage=(e)=>{
      e.preventDefault();
      const data = {
        senderId: senderId,
        senderName: senderName,
        receiverId: receiverId,
        newMessage:newMessage,
        newImage:newImage
        }
      axios.post("/addmesg",data).then ( (res)=>{
        if(res.data === "ERROR"){
          console.log(res)
        }
      })
       console.log(data);
    }
    
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
 
  function userlist(id){
   axios.post(`/getCurrentUser/${id}`).then((res)=>{
       if(res.data === "ERROR"){
           alert("error")
       }
       else{
           setUsersList(res.data);
           setReceiverId(res.data._id);
       }
   })
}
useEffect(()=>{
  if(userList.length>0){
    setUsersList(userList[0]);
    setReceiverId(userList[0]._id)
  }
},[userList])
 
  return (
    <div className="messenger">
        <div className="row">
            <div className="col-3">
                <div className="left-side">
                    <div className="top">
                        <div className="image-name">
                            <div className="image">
                             <img src={user.image} />
                            </div>
                            <div className="name">
                              <h3>{user.firstName} {user.lastName}</h3>
                            </div>
                        </div>
                        <div className="icons">
                            <div className="icon">
                                <FiMoreHorizontal />
                            </div>
                            <div className="icon">
                                <FiEdit/>
                            </div>
                        </div>
                    </div>
                    <div className="friend-search">
                                <div className="search">
                                    <button><BiSearch/></button>   
                                    <input placeholder='chercher' type="text" className="form-control" />
                                </div>
                    </div>
                    <div className="active_friends">
                        <ActiveFriend/>
                    </div>
                    <div className="friends" onClick={()=>{setCurrentUser(true)}}>
                    {userList.length >0 ? 
                      userList.map( (item,index)=>{
                      return(
                        <>
                        {usersList._id === userList[i]._id? 
                      <div className="hover-friendActive" onClick={()=>{userlist(item._id)}}>
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
                      : 
                      <div className="hover-friend" onClick={()=>{userlist(item._id)}}>
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
                      }
                      {i=i+1}
                        </>
                      )
          }):
          'aucun amie'}
                    </div>
                </div>
            </div>
            <div className="col-9">
            {/* {!currentUSer ? : 'Please select ur friend'}  */}
              <RightSide
              current={usersList}
              inputHandle={inputHandle} 
              fileHandle={fileHandle} 
              sendMessage={sendMessage}
              /> 
               
            
            </div>
        </div>
    </div>
  )
}

export default Messenger