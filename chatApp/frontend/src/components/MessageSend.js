import React from 'react'
import {AiFillGift,BiMessageAltEdit,BsPlusCircle,RiGalleryLine} from 'react-icons/all'
function MessageSend() {
  return (
    <div className="message-send-section">
        <div className="file">
          <BsPlusCircle/>
        </div>
        <div className="file">
          <input type="file" id="pic" className="form-control" />
          <label htmlFor='pic'><RiGalleryLine/></label>
        </div>
        <div className="file">
            <BiMessageAltEdit/>
        </div>
        <div className="file">
            <AiFillGift/>
        </div>
        <div className="message-type">
            <input type="text" name="message" id="message" placeholder="Aa" className="form-control" />
            <label htmlFor="emoji">😀</label>
        </div>
        <div className="file">💕</div>
        <div className="emoji-section">
            <div className="emoji">

            </div>
        </div>
    </div>
  )
}

export default MessageSend