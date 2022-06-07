import React , {useEffect,useState , useContext} from 'react';
import "./../../Css/_message.scss";
import { AppContext } from "../../Context/AppContext";
import axios from 'axios';
function Message({message , receiver}) {
  const {user} = useContext(AppContext);

  return (
  <div className="message-show">
    {message.length>0 ? message.map((item)=>{
      return(<>
        {(item.senderId == user.id && item.receiverId == receiver)?
          <div className="my-message">
            <div className="image-message">
                <div className="my-text">
                  <p className="message-text">{item.newMessage}</p>
                </div>
            </div>
            <div className="time">
                02 JUIN 2022
            </div>
          </div> :
          null
          
        }
        {(item.senderId != user.id && item.receiverId == receiver)?
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
      }
      {console.log(item.senderId != user.id && item.receiverId == user.id)}
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
      }
         
      </>
      )
    }):
    null}
  </div>
  )
}

export default Message