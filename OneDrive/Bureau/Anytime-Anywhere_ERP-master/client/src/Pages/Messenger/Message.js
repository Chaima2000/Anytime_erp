import React , {useEffect,useState , useContext} from 'react';
import "./../../Css/_message.scss";
import { AppContext } from "../../Context/AppContext";
import axios from 'axios';
function Message({message , receiver,current}) {
  const {user} = useContext(AppContext);
  return (
  <div className="message-show" key={"message"}>
    {message.length>0 ? message.map((item,index)=>{
      console.log(item.receiverId != user.id && item.senderId == user.id && item.receiverId == receiver)
      return(<>
        {(item.receiverId != user.id && item.senderId == user.id && item.receiverId == receiver)?
          <div className="my-message" key={index}>
            <div className="image-message">
                <div className="my-text">
                  <p className="message-text">{item.newMessage}
                  {item.newImage.length >0 ? 
                  <img src={item.newImage} />
                  : null }</p>
                </div>
            </div>
            <div className="time">
                {item.createdAt}
            </div>
          </div> :
          <>
          {(item.receiverId == user.id && item.senderId == receiver )?
            <div className="fd-message" key={index}>
            <div className="image-message-time">
              <img src={current.image} alt="" />
              <div className="message-time">
                  <div className="fd-text">
                    <p className="message-text">{item.newMessage}<br/><br/>
                    {item.newImage.length>0 ? <img src={item.newImage}/>:null}</p>
                  </div>
                  <div className="time">
                  {item.createdAt}
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
         
      </>
      )
    }):
    null}
  </div>
  )
}

export default Message