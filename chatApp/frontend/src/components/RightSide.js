import React from 'react';
import MessageSend from './MessageSend';
import {MdLocalPhone} from "react-icons/md"
import Message from '../components/Message'
function RightSide() {
  return (
    <div className="col-9">
        <div className="right-side">
            <div className="row">
                <div className="col-8">
                    <div className="message-send-show">
                        <div  className="header">
                            <div className="image-name">
                                <div className="image">
                                <img src="/image/1341Capture5.PNG" />
                                <div className="active-icon">

                                </div>
                                </div>
                                <div className="name">
                                  Himel Islam
                                </div>
                            </div>
                        <div className="icons"> 
                             <div className="icon">
                                <MdLocalPhone/>
                             </div>
                        </div>
                        </div>
                        <Message />
                        <MessageSend />
                    </div>
                </div>
                <div className="col-4">
                <h1>Friend information section</h1>
            </div>
            </div>
        </div>
    </div>
  )
}

export default RightSide