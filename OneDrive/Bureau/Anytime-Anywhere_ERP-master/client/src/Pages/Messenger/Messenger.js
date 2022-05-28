import React, { Component, useState, createRef,useContext, useEffect } from "react";
import styles from '../../Css/Messenger.module.css';
import Navbar from "../../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import axios from "axios";
import avatar from "../../Css/avatar.png";
import { AppContext } from "../../Context/AppContext";
import AOS from 'aos';
import 'aos/dist/aos.css';


function Messenger() {
   const [userList, setUserList] = useState([]);
   const [isOpen, setIsopen] = useState(false);
   const [isShow , setIsShow] = useState(false);
   const [waiting, setWaiting] = useState(true);
   const { user} = useContext(AppContext);
   
   const [msg,setMsg]=useState("");
   const messagesEndRef = createRef(null);
  const chatItms = [
    {
      key: 1,
      image:
        {avatar},
      type: "",
      msg: "Hi Tim, How are you?",
    },
    {
      key: 2,
      image:
{avatar}
,      type: "other",
      msg: "I am fine.",
    },
    {
      key: 3,
      image:
        {avatar},
      type: "other",
      msg: "What about you?",
    },
    {
      key: 4,
      image:
        {avatar},
      type: "",
      msg: "Awesome these days.",
    },
    {
      key: 5,
      image:
        {avatar},
      type: "other",
      msg: "Finally. What's the plan?",
    },
    {
      key: 6,
      image:
        {avatar},
      type: "",
      msgz: "what plan mate?",
    },
    {
      key: 7,
      image:
        {avatar},
      type: "other",
      msg: "I'm taliking about the tutorial",
    },
  ];
  const [chat,setChat]=useState(chatItms);
const scrollToBottom = () => {
  if (messagesEndRef && messagesEndRef.current) {
  messagesEndRef.current.scrollIntoView({behavio: "smooth"});
  }
}
window.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    if (setMsg != "") {
      chatItms.push({
        key: 1,
        type: "",
        msg: setMsg,
        image:
          {avatar},
      });
      setChat([...chatItms]);
      scrollToBottom();
      setMsg("");
    }
  }
});
scrollToBottom();

const onStateChange = (e) => {
setMsg(e.target.value );
};
   useEffect (() => {
      axios
      .post("/getUsers")
      .then((res) => {
        if (res.data === "ERROR") {
          alert("error !");
        } else {
          setWaiting(false);
          setUserList(res.data.users);
          console.log(res.data.users)
        }
      })
      }, []);
      useEffect(() => {
          
        scrollToBottom();
      
  }, []); 
      function open (){
        setIsopen(!isOpen)
      }
      function show () {
        setIsShow(!isShow);
      }
      const ChatItem = (props) =>{
        return (
          <>
             <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${props.user ? props.user : ""}`}
      >
        <div className={styles.chat__item__content}>
          <div className={styles.chat__msg}>{props.msg}</div>
          <div className={styles.chat__meta}>
            <span>16 mins ago</span>
            <span>Seen 1.03PM</span>
          </div>
        </div>
        {/* <Avatar isOnline="active" image={props.image} /> */}
      </div>
          </>
        )
      }
  return (
   <>
    <Navbar></Navbar>
  <div className={styles.main__chatbody}>

      <div className={styles.main__chatlist}>
        <button className={styles.btn}>
        <i><FontAwesomeIcon icon= {solid("plus")} /></i>
          <span>Nouveau groupe</span>
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
        {waiting ? (
          <div className={styles.spinner}>
            <FontAwesomeIcon icon={solid("spinner")} spin size="3x" />
          </div>
        ) : (
          <>
        <div className={styles.chatlist__items}>
            {userList.map((item) =>{
                return(
                  <>
                  <div className={styles.content__item}>
                    <img src={item.image} className={styles.imgUser} /><p className={styles.pUser}>{item.firstName} {item.lastName}</p>
                  </div>
                  </>
                )
            })}
        </div>
              </>
        )}
        
      </div>
      <div className={styles.main__chatcontent}>
        <div className={styles.content__header}>
              <img
                src={avatar}
                // isOnline="active"
                className={styles.img}
              />
              <p className={styles.p}>Tim Hover</p>
              <div className={styles.blocks}>
                <div className={styles.settings}>
                  <button className={styles.btn_nobg}>
                    <i><FontAwesomeIcon icon={solid("gear")}/></i>
                  </button>
                </div>
              </div>
         </div>
         <div className={styles.content__body }>
          
          {chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type ? itm.type : "me"}
                  msg={itm.msg}
                  image={itm.image}
                />
              );
            })}
            <div ref={messagesEndRef} />
          
 
        </div>
         <div className={styles.content__footer}>
         
             {isShow ? ( 
              <div className="box arrow-bottom" id="icons">
                <i className={styles.icons}><FontAwesomeIcon icon={solid("image")} /></i>
                <i className={styles.icons}><FontAwesomeIcon icon={solid("file")} /></i>
             </div>
            ):null}
         
          <div className={styles.sendNewMessage}>
            <button className={styles.addFiles}>
             <i><FontAwesomeIcon icon= {solid("plus")} onClick={()=>{show()}} /></i>
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