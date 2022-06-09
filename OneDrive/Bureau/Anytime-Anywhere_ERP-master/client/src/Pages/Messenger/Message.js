import React , {useEffect,useState , useContext} from 'react';
import "./../../Css/_message.scss";
import { AppContext } from "../../Context/AppContext";
import axios from 'axios';
function Message({message ,liste, messageList, receiver,current, newMessage}) {
  const {user} = useContext(AppContext);
  console.log(messageList)
  return (
  <div className="message-show" key={"message"}>
      
        {( message.receiverId != user.id && message.senderId == user.id && message.receiverId == receiver)?
          <div className="my-message" key={message._id}>
            <div className="image-message">
                <div className="my-text">
                  <p className="message-text">{message.newMessage}
                  {message.newImage.length >0 ? 
                  <img src={message.newImage} />
                  : null }</p>
                </div>
            </div>
            <div className="time">
                {message.createdAt}
            </div>
          </div> :
          <>
          {( message.receiverId == user.id && message.senderId == receiver )?
            <div className="fd-message" key={message._id}>
            <div className="image-message-time">
              <img src={current.image} alt="" />
              <div className="message-time">
                  <div className="fd-text">
                    <p className="message-text">{message.newMessage}<br/><br/>
                    {message.newImage.length>0 ? <img src={message.newImage}/>:null}</p>
                  </div>
                  <div className="time">
                  {message.createdAt}
                  </div>
              </div>
            </div>
          </div>
          :
          null}
          </>
          
        }
        {/* {(item.senderId != user.id && item.receiverId == receiver)?
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