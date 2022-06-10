import React , {useEffect,useState , useContext} from 'react';
import "./../../Css/_message.scss";
import { AppContext } from "../../Context/AppContext";
import axios from 'axios';
function Message({message ,dateMesg, currentMsg,messageList, receiver,current, newMessage}) {
  const {user} = useContext(AppContext);
  return (
  <div className="message-show" key={"message"}>
  {message.length>0?
  <>
      {message.map((item)=>{
        return(
        <>
        {(item.senderId == user.id && item.receiverId == receiver)?
          <div className="my-message" key={item._id}>
            <div className="image-message">
                <div className="my-text">
                  <p className="message-text">{item.newMessage}
                  {item.newImage.length >0 ? 
                  <img src={item.newImage} />
                  : null }</p>
                </div>
            </div>
            <div className="time">
                {dateMesg}
            </div>
          </div> :
          <>
          {( item.senderId != user.id && item.receiverId == receiver )?
            <div className="fd-message" key={item._id}>
            <div className="image-message-time">
              <img src={current.image} alt="" />
              <div className="message-time">
                  <div className="fd-text">
                    <p className="message-text">{item.newMessage}<br/><br/>
                    {item.newImage!="" ? <img src={item.newImage}/>:null}</p>
                  </div>
                  <div className="time">
                  {dateMesg}
                  </div>
              </div>
            </div>
          </div>
          :
          null}
          </> 
        }
        </>
        )
      })}
      </>
      :null}
      
    
        {(currentMsg.senderId == user.id && currentMsg.receiverId == receiver)?
          <div className="my-message" key={currentMsg._id}>
            <div className="image-message">
                <div className="my-text">
                  <p className="message-text">{currentMsg.newMessage}
                  {currentMsg.newImage.length >0 ? 
                  <img src={currentMsg.newImage} />
                  : null }</p>
                </div>
            </div>
            <div className="time">
                {dateMesg}
            </div>
          </div>
           :
           null}
          
          {( currentMsg.senderId != user.id && currentMsg.receiverId == receiver )?
          <div className="fd-message" key={currentMsg._id}>
            <div className="image-message-time">
              <img src={current.image} alt="" />
              <div className="message-time">
                  <div className="fd-text">
                    <p className="message-text">{currentMsg.newMessage}<br/><br/>
                    {currentMsg.newImage!="" ? <img src={currentMsg.newImage}/>:null}</p>
                  </div>
                  <div className="time">
                  {dateMesg}
                  </div>
              </div>
            </div>
            
          </div>:null
          }
    
     
      
        {/* {(newMessage.senderId != user.id && currentMsg.receiverId == receiver)?
        <div className="fd-message" key={index}>
            <div className="image-message-time">
              <img src="/image/1341Capture5.PNG" />
              <div className="message-time">
                  <div className="fd-text">
                    <p className="message-text">{item.newMessage}</p>
                  </div>
                  <div className="time">
                   
                  </div>
              </div>
            </div>
          </div>
        :null
      } */}
      {/* {console.log(item.senderId != user.id && item.receiverId == user.id)}
      {(item.senderId != user.id && item.receiverId == user.id)?
        <div className="fd-message">
            <div className="image-message-time">
              <img src="/image/1341Capture5.PNG" />
              <div className="message-time">
                  <div className="fd-text">
                    <p className="message-text">{item.newMessage}</p>
                  </div>
                  <div className="time">
                   
                  </div>
              </div>
            </div>
          </div>
        :null
      } */}
         
      
  </div>
  )
}

export default Message