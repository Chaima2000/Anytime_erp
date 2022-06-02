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
    const [selected, setSelected] = useState();
    function Friends() {
        const [userList,setUserList]=useState([]);
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
              <div className="friend"  key={index} onClick={()=>{setSelected(item._id)}}>
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
                              <h3>Himel</h3>
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
                            <Friends />
                    </div>
                </div>
            </div>
            <div className="col-9">
            {currentUSer ? 
              <RightSide current={selected}/> : 'Please select ur friend'
            }
            </div>
        </div>
    </div>
  )
}

export default Messenger