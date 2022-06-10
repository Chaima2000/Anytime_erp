import React from 'react';
import "./../../Css/_messageSend.scss";
import {BsPlusCircle,BsCardImage} from 'react-icons/bs'
function MessageSend({inputHandle,newMessage,fileHandle,Emojis,sendMessage}) {
  const emojis = [
    "😀","​😃","​😄","😁​",
    "😆","😅","​🤣","😂​",
    "🙂​","🙃","​​😉​","😊",
    "​😇","​🥰","​😍","🤩",
    "​😘","​😋","​😛","​😜",
    "​🤪","​😝","​🤑","🤗​",
    "🤭​","🤫","​🤔","​🤐",
    "​🤨","😐","😑​","😶",
    "😏","😬​","😮‍💨","🤥",
    "😪","🤤","​😴","​😷",
    "🤒","🤕","🤢​","🤮​",
    "🤧","🥵","🥶","🥴",
    "😵","😵‍💫","🤯","🤠",
    "​🥳​","😎","🤓​","🧐​",
    "😕​","🙁​","😲","​🥺",
    "😦","​😱","😤","​🥱",
    "​😫","​😡","​😈","🙈​",
    "🙉","​🙊","💘","💝​",
    "💖","​💗​","💓","💕",
    "💞​","💟","​❣️","💔",
    "❤️‍🔥","❤️‍🩹","❤️",
    "🧡","💛","💚","💙​",
    "💜​","🤎","🖤​","🤍",
    "​💯","💬​","💣","💦​",
    "💫​","💥","​💢","👋"
  ]
  
  return (
    <div className="message-send-section">
        <input type="checkbox" id="emoji" />
        <div className="file">
          <BsPlusCircle/>
        </div>
        <div className="file">
          <input type="file" id="pic" onChange={fileHandle}  accept=".png, .jpg, .jpeg" className="form-control" />
          <label htmlFor='pic'><BsCardImage/></label>
        </div>
        <div className="message-type">
            <input onChange={inputHandle} defaultValue="" type="text" name="message" id="message" placeholder="Aa"  className="form-control" />
            <label htmlFor="emoji">😀</label>
        </div>
        <div className="file" onClick={sendMessage}>💕</div>
        <div className="emoji-section">
            <div className="emoji">
                {
                  emojis.map((e,index)=>
                    <span key={index} className="emoji-click" onClick={()=>{Emojis(e)}}>{e}</span>
                  )
                }
            </div>
        </div>
    </div>
  )
}

export default MessageSend