import React,{useContext} from 'react';
import MessageSend from './MessageSend';
import './../../Css/_rightSide.scss';
import { AppContext } from "../../Context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Message from '../Messenger/Message';
import Friendinfo from '../Messenger/Friendinfo';
function RightSide() {
  const {user} = useContext(AppContext)
  return (
    <div className="col-9">
        <div className="right-side">
            <input type="checkbox" id="dot" />
            <div className="row">
                <div className="col-8">
                    <div className="message-send-show">
                        <div  className="header">
                            <div className="image-name">
                              <div className="image">
                                <img src={user.image} />
                                <div className="active-icon">

                                </div>
                              </div>
                              <div className="name">
                                  <h3>Himel Islam</h3>
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
                        <Message />
                        <MessageSend />
                    </div>
                </div>
                <div className="col-4">
                   <Friendinfo/>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default RightSide