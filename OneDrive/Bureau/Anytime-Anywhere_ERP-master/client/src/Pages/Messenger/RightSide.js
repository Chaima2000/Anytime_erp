import React,{useContext} from 'react';
import MessageSend from './MessageSend';
import './../../Css/_rightSide.scss';
import Friendinfo from './Friendinfo';
import { AppContext } from "../../Context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Message from '../Messenger/Message';

function RightSide(props) {
  const {user} = useContext(AppContext);
  const {current, inputHandle , fileHandle,sendMessage , message , receiver}=props;
  // console.log(current)
  return (
      <div className="secondComponent">
        <div className="right-side">
          <input type="checkbox" id="dot" />
          <div className="row">
            <div className="col-8">
              <div className="message-send-show">
                <div  className="header">
                  <div className="image-name">
                    <div className="image">
                      <img src={current.image} />
                      <div className="active-icon"></div>
                    </div>
                    <div className="name">
                      <h3> {current.firstName} {current.lastName}</h3>
                    </div>
                  </div>
                  <div className="icons"> 
                    <div className="icon">
                      <FontAwesomeIcon icon={solid("phone")} />
                    </div>
                    <div className="icon">
                      <label htmlFor="dot"><FontAwesomeIcon icon={solid("circle-dot")} /></label>
                    </div>
                  </div>
                </div>
                <Message message={message} receiver={receiver} current={current}/>
                <MessageSend sendMessage={sendMessage} inputHandle={inputHandle} fileHandle={fileHandle}  />
              </div>
            
          </div>
         <div className="col-4">
          <Friendinfo current={current}/>
         </div>
         </div>
      </div>
      </div>
         
     
    
  )
}

export default RightSide