import React , {useContext} from 'react';
import "./../../Css/_message.scss";
import { AppContext } from "../../Context/AppContext";
function Message({message, receiver,current,scrollRef}) {
  const {user} = useContext(AppContext);
  return (
  <div className="message-show" key={"message"}>
  {message.length>0?
  <>
      {message.map((item)=>{
        return(
        <>
        {(item.senderId == user.id && item.receiverId == receiver)?
          <div ref={scrollRef} className="my-message" key={item._id}>
            <div className="image-message">
                <div className="my-text">
                  <p className="message-text">{item.newMessage}
                  {item.newImage.length >0 ? 
                  <><br/><br/><img src={item.newImage} /></>
                  
                  : null }</p>
                </div>
            </div>
            <div className="time">
                {item.dateMsg}
            </div>
          </div> :
          <>
          {( item.senderId != user.id && item.receiverId == user.id )?
            <div ref={scrollRef} className="fd-message" key={item._id}>
            <div className="image-message-time">
              <img src={current.image} alt="" />
              <div className="message-time">
                  <div className="fd-text">
                    <p className="message-text">{item.newMessage}
                    {item.newImage!="" ? <><br/><br/><img src={item.newImage}/></>:null}</p>
                  </div>
                  <div className="time">
                  {item.dateMsg}
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
        :null
        }      
  </div>
  )
}

export default Message