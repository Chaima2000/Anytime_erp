import React, {useState, createRef,useContext, useEffect } from "react";
import styles from '../../Css/Messenger.module.css';
import Navbar from "../../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import axios from "axios";
import avatar from "../../Css/avatar.png";
import { AppContext } from "../../Context/AppContext";


function Messenger() {
   const [userList, setUserList] = useState([]);
   const [searchItem, setSearch] = useState("");
   const [isOpen, setIsopen] = useState(false);
   const [Open, setOpen] = useState(false);
   const [isShow , setIsShow] = useState(false);
   const [waiting, setWaiting] = useState(true);
   const { user} = useContext(AppContext);
   const [style, setStyle] = useState(false);
   const changeStyle  = () => {
     setStyle(!style)
   }
   function chaima(){
     setOpen(!Open)
   }
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
  messagesEndRef.current.scrollIntoView({behavior: "smooth"});
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
        return(
          <>
        <div
        style={{ animationDelay: "0.8s" }}
        className={`chat__item ${props.users ? props.users : ""}`}
      >
        <div className={styles.chat__item__content}>
          <div className={styles.chat__msg}>{props.msg}</div>
          <div className={styles.chat__meta}>
            <span>16 mins ago</span>
            <span>Seen 1.03PM</span>
          </div>
        </div>
        {/* <Avatar isOnline="active" image={this.props.image} /> */}
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
          <h2>Discussion</h2>
          <button className={styles.btn_nobg}>
          <i><FontAwesomeIcon icon= {solid("ellipsis")}/></i>
          </button>
        </div>
        <div className={styles.search_wrap}>
            <input type="text" placeholder="Chercher ici" onChange={(e)=>{setSearch(e.target.value)}}/>
            <i><FontAwesomeIcon icon= {solid("search")} color = "black" /></i>
        </div>
        {waiting ? (
          <div className={styles.spinner}>
            <FontAwesomeIcon icon={solid("spinner")} spin size="3x" />
          </div>
        ) : (
          <>
        <div className={styles.chatlist__items}>
            {userList.filter((val)=>{
              if(searchItem == ""){
                return val
              }else if (val.firstName.toLowerCase().includes(searchItem.toLocaleLowerCase())){
                return val
              }
            }).map((item) =>{
                return(
                  <>
                  <div className={styles.content__item} onClick={changeStyle}>
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
              <img src={avatar} className={styles.imgUser} />
              <p className={styles.pUser}>Tim Hover</p>
              <div className={styles.settings}>
                  <button className={styles.btn_nobg}  onClick={()=>{chaima()}}>
                    <i><FontAwesomeIcon icon={solid("gear")}/></i>
                  </button>
                  {Open ? ( 
                    <div className="box2 arrow-top" >
                      <p>Supprimer la conversation</p>
                      <p>Supprimer un message</p>
                    </div>
                  ):null}
              </div>
        </div>
        <div className={styles.content__body }> 
          {chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  users={itm.type ? itm.type : "me"}
                  msg={itm.msg}
                  image={itm.image}
                />
              
              );
            })}
        </div> 
        <div className={styles.content__footer}>
          <div className={styles.sendNewMessage}>
            <button>
             <i><FontAwesomeIcon icon= {solid("plus")} onClick={()=>{show()}} /></i>
            </button>
            <input type="text" placeholder="Type a message here" />
            <button>
            <i><FontAwesomeIcon icon= {solid("paper-plane")}  /></i>
            </button>
          </div>
        </div>
        {isShow ? ( 
              <div className="box arrow-bottom" id="icons">
                <i className={styles.icons}><FontAwesomeIcon icon={solid("image")} /></i>
                <i className={styles.icons}><FontAwesomeIcon icon={solid("file")} /></i>
             </div>
        ):null}
      </div>
      <div className={styles.main__userprofile}>
        <div className={styles.profile__card}>
          <img src={avatar} className={styles.profile__image}/>
          <h4>{user.firstName} {user.lastName}</h4>
          <p>{user.role}</p>
        </div>
        <div className={styles.profile__card}>
          <div className={styles.card__header}  onClick={()=>{open()}}>
            <h4>Informations</h4>
            <i className={styles.i} ><FontAwesomeIcon icon= {solid("angle-down")}/></i>
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