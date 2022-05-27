import React from 'react';
import styles from '../../Css/Messenger.module.css';
import Navbar from "../../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import axios from "axios";
import { useEffect, useState , useContext} from "react";
import avatar from "../../Css/avatar.png";
import { AppContext } from "../../Context/AppContext";


function Messenger() {
   const [userList, setUserList] = useState([]);
   const [isOpen, setIsopen] = useState(false);
   const [waiting, setWaiting] = useState(true);
   const { user} = useContext(AppContext);
   useEffect (() => {
      axios
      .post("/getUsers")
      .then((res) => {
        if (res.data === "ERROR") {
          alert("error !");
        } else {
          setWaiting(false);
          setUserList(res.data);
          console.log(res.data)
        }
      })
      }, []);
      function open (){
        setIsopen(!isOpen)
      }
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
        <div className={styles.chatlist__items}>
            {userList.map((item) =>{
                return(
                  <>
                 
                    <p>{item.firstName} {item.lastName}</p>

                  </>
                )
            })}
        </div>
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
              <img
                src={avatar}
                // isOnline="active"
                className={styles.img}
              />
              <p className={styles.p}>Tim Hover</p>
         </div>
         <div className={styles.middle__content}>

         </div>
         <div className={styles.content__footer}>
          <div className={styles.sendNewMessage}>
            <button className={styles.addFiles}>
             <i><FontAwesomeIcon icon= {solid("plus")} /></i>
            </button>
            <input
              type="text"
              placeholder="Type a message here"
            />
            <button className={styles.btnSendMsg} id="sendMsgBtn">
            <i><FontAwesomeIcon icon= {solid("paper-plane")}  /></i>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.main__userprofile}>
        <div className={styles.profile__card}>
          <div className={styles.profile__image}>
            <img src={avatar} />
          </div>
          <h4>{user.firstName} {user.lastName}</h4>
          <p>{user.role}</p>
        </div>
       
          <div className={styles.profile__card}>
          <div className={styles.card__header}  onClick={()=>{open()}}>
            <h4>Informations</h4>
            <i ><FontAwesomeIcon icon= {solid("angle-down")}/></i>
          </div>
          {isOpen ? (
          <>
            <div className={styles.card__content}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            ultrices urna a imperdiet egestas. Donec in magna quis ligula
            </div>
          </>
        ):
        null}
          </div>
       
      </div>
     </div>
    
    </>
  )
}

export default Messenger