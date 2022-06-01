import React from 'react';
import "./../../Css/_messageSend.scss";
import {BsPlusCircle,BsCardImage} from 'react-icons/bs'
function MessageSend() {
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
          <input type="file" id="pic" className="form-control" />
          <label htmlFor='pic'><BsCardImage/></label>
        </div>
        <div className="message-type">
            <input type="text" name="message" id="message" placeholder="Aa" className="form-control" />
            <label htmlFor="emoji">😀</label>
        </div>
        <div className="file">💕</div>
        <div className="emoji-section">
            <div className="emoji">
                {
                  emojis.map(e=>
                    <span>{e}</span>
                  )
                }
            </div>
        </div>
    </div>
  )
}

export default MessageSend