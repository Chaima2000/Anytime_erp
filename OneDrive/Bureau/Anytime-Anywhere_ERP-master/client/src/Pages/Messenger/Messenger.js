import React, { useEffect,useContext, useState , useRef } from 'react';
import axios from 'axios';
import  "./../../Css/_messenger.scss";
import {FiMoreHorizontal,FiEdit} from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import Navbar from '../../components/Navbar';
import RightSide from './RightSide';
import "../../Css/_friends.scss";
import "../../Css/_activefriends.scss";
import { AppContext } from "../../Context/AppContext";

function Messenger() {
    const {user} = useContext(AppContext);
    const [currentUSer,setCurrentUser]=useState(false);
    const [searchTerm,setSearchTerm]=useState("");
    const [userList,setUserList]=useState([]);
    const [usersList,setUsersList]=useState({});
    const [newMessage, setNewMessage] = useState("");
    const [newImage,setNewImage]=useState("");
    const [dataT,setData]=useState([]);
    const [messageList,setTable]=useState({});
    const senderId = user.id;
    const days=["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"]
    const dateMsg = days[new Date().getDay()] + "  "+ new Date().getHours() + ":" + new Date().getMinutes()+":"+ new Date().getSeconds();
    const [receiverId,setReceiverId] = useState(usersList._id);
    const senderName= user.firstName +" "+ user.lastName;
    const [Images,setImages]=useState([]);
    let i=0;
    const scrollRef = useRef();
/**getFriendsList **/
    useEffect(()=>{
      axios.post("/getUsers").then((res)=>{
          if(res.data === "ERROR"){
              console.log("error");
          }
          else{
                setUserList(res.data.users);
              }
      })
  },[])
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:'smooth'})
  })
  const success=() =>{
    document.getElementById('pic').value="";
    document.getElementById('img').display="none";
    document.getElementById('message').value="";
  }
  useEffect(()=>{
    if(userList.length>0){
      setUsersList(userList[0]);
      setReceiverId(userList[0]._id);
      axios.post(`/getMessages/${userList[0]._id}`,{senderId:senderId}).then((res)=>{
        if(res.data=="ERROR"){
          console.log(res.data)
        }else {
          setTable(res.data);
        }
      })
    }
  },[userList])
  useEffect(()=>{
    axios.post(`/getMessages/${usersList.id}`,{senderId:senderId}).then((res)=>{
      if(res.data=="ERROR"){
        console.log(res.data)
      }else {
        setTable(res.data);
      }
    })
  },[])
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
  const SendEmoji=(emoji)=>{
    setNewMessage(`${newMessage}`+emoji)
  } 
  
    const sendMessage=(e)=>{
      e.preventDefault();
      const data = {
        senderId: senderId,
        senderName: senderName,
        receiverId: receiverId,
        newMessage:newMessage ? newMessage:"💕",
        newImage:newImage,
        dateMsg:dateMsg
      }
        setData(data);
        axios.post("/addmesg",data).then ( (res)=>{
        if(res.data == "ERROR"){
          alert("Error")
        }else{
          axios.post(`/getMessages/${data.receiverId}`,{senderId:senderId}).then((res)=>{
            if(res.data=="ERROR"){
              console.log(res.data)
            }else {
              setTable(res.data);
            }
          })
      success();
    }
    })
  }
  function userlist(id){
   axios.post(`/getCurrentUser/${id}`).then((res)=>{
       if(res.data === "ERROR"){
           alert("error")
       }
       else{
           setUsersList(res.data);
           setReceiverId(res.data._id);
           axios.post(`/getMessages/${res.data._id}`,{senderId:senderId}).then((res)=>{
            console.log(receiverId)
            if(res.data=="ERROR"){
              console.log(res.data)
            }else {
              setTable(res.data);
            }
          })
           
       }
   })
}
  return (
    <>
  <Navbar/>
  <div className="messenger">
    <div className="friendZone">
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
                <i className="i"><FiMoreHorizontal /></i>
              </div>
              <div className="icon">
                <FiEdit/>
              </div>
            </div>
          </div>
          <div className="friend-search">
            <div className="search">  
              <input placeholder='chercher' type="text" className="form-control" onChange={(e)=>setSearchTerm(e.target.value)} />
              <button><BiSearch/></button> 
            </div>
          </div>
          <div className="active-friends">
            <div className="active-friend">
              <div className="image-active-icon" key={"userList"}>
                {userList.map((item)=>{
                  return(
                  <>
                  {item._id != senderId ? 
                    <div className="image">
                      <img src={item.image} />
                      <div className="active-icon"></div>
                    </div>
                  : null }
                  </>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="friends" onClick={()=>{setCurrentUser(true)}} key={"userList"}>
          {userList.length >0 ? 
              userList.filter((val)=>{
                if(searchTerm == ""){
                  return val
                }else if (val.firstName.toLowerCase().includes(searchTerm.toLowerCase())){
                  return val
                }
              }).map( (item,index)=>{
                {i=i+1}
                return(
                  <div key={index}>
                  {item._id != user.id? 
                    <>
                  {(usersList._id == userList[i-1]._id ) ? 
                      <div className="hover-friendActive" onClick={()=>{userlist(item._id)}} key={index}>
                        <div className="friend"  >
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
                      <div className="hover-friend" onClick={()=>{userlist(item._id)}} key={index}>
                        <div className="friend"  >
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
                        </>
                  :null}
                  </div>
                      )
                     
          }):
          'aucun amie'}
          </div>
          </div>
            </div>
            <div className="col-9">
            </div>
              <RightSide
              data={dataT}
              current={usersList}
              inputHandle={inputHandle} 
              fileHandle={fileHandle} 
              sendMessage={sendMessage}
              receiver={receiverId}
              emojis={SendEmoji}
              message={messageList}
              Images={newImage}
              scrollRef={scrollRef}
              /> 
               
            
            </div>
    </>
  )
}

export default Messenger