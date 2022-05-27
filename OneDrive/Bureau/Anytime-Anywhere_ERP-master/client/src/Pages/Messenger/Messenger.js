import React from 'react';
import styles from '../../Css/Messenger.module.css';
import Navbar from "../../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import axios from "axios";
import { useEffect, useState } from "react";
import avatar from "../../Css/avatar.png";

function Messenger() {
   const [usersList, setUsersList] = useState([]);
   const [waiting, setWaiting] = useState(true);
   useEffect (() => {
      axios
      .post("/getUsers")
      .then((res) => {
        if (res.data === "ERROR") {
          alert("error !");
        } else {
          setWaiting(false);
          setUsersList(res.data);
        }
      })
      }, []);
  return (
   <>
    <Navbar></Navbar>
    <div className={styles.main__chatbody}>
    <div className={styles.main__chatlist}>
        <button className={styles.btn}>
        <i><FontAwesomeIcon icon= {solid("plus")} /></i>
          <span>New conversation</span>
        </button>
        <div className={styles.chatlist__heading}>
          <h2>Chats</h2>
          <button className={styles.btn_nobg}>
          <FontAwesomeIcon icon= {solid("ellipsis")}/>
          </button>
        </div>
        <div className={styles.chatList__search}>
          <div className={styles.search_wrap}>
            <input type="text" placeholder="Chercher ici"/>
            <button className={styles.search_btn}>
            <FontAwesomeIcon icon= {solid("search")} color = "black" />
            </button>
          </div>
        </div>
        <p>
        {/* {usersList.map((item) =>{
         <div className={styles.chatlist__items}>
                  {console.log(item)}
                  <p key={item._id}>{item.firstName} {item.lastName}</p>
                  
                 
                  chaima
         </div>
         })} */}
         </p>
        {/* {waiting ? (
          <div className={styles.spinner}>
            <FontAwesomeIcon icon={solid("spinner")} spin size="3x" />
          </div>
        ) : (
           <>
              
              </>
        )} */}
        
        </div>
        <div className={styles.main__chatcontent}>
        <div className={styles.content__header}>
          <div className={styles.blocks}>
            <div className={styles.current_chatting_user}>
              <img
                src={avatar}
                isOnline="active"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
                style={{borderRadius:"50%", width:"20%" , marginLeft: "10%"}}
              />
              <p>Tim Hover</p>
            </div>
          </div>
         </div>
        </div>
     </div>
     {/* <div className={styles.messenger_content}>
        <div className={styles.chat_list}>
          <div className={styles.new_conversation}>
               <span className={styles.plus_icon}><FontAwesomeIcon icon= {solid("plus")} color = "black" /></span>
               <input type="text" placeholder='new conversation' className={styles.input} />
          </div>
          <h3 className={styles.h3}>Chats</h3>
          <div className={styles.search_section}>
               <span className={styles.search_icon}><FontAwesomeIcon icon= {solid("search")} color = "black" /></span>
               <input type="text" placeholder=' search here' className={styles.input} />
          </div>
          <div className={styles.users_list}>
              <div className={styles.user}>
                 user1
              </div>
          </div>
        </div>
        <div className={styles.chat_content}>
            <div className={styles.content_header}>
               header
            </div>
            <div className={styles.content_bottom}>
               <span className={styles.plus_icon}><FontAwesomeIcon icon= {solid("plus")} color = "black" /></span>
               <input type="text" placeholder='type a message' className={styles.input_msg} />
               <span className={styles.send_icon}><FontAwesomeIcon icon= {solid("paper-plane")} color = "black" /></span>
            </div>
        </div>
        <div className={styles.user_profile}>
           <div className={styles.user_picture}>
                 user logo
           </div>
        </div>
    </div>  */}
    </>
  )
}

export default Messenger