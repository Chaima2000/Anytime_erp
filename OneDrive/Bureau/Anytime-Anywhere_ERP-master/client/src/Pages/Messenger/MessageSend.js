import React,{useState} from 'react';
import "./../../Css/_messageSend.scss";
import {BsPlusCircle,BsCardImage} from 'react-icons/bs'
function MessageSend({inputHandle,Images,fileHandle,Emojis,sendMessage}) {
  const [close,setClose]=useState(false);
  const [pic,setPic]=useState(false);
  const [switchToogle,setSwitch]= useState(false);
  function closes(){
    setClose(!close)
  }
  function pics(){
    // setPic(!pic)
   setSwitch(!switchToogle)
  }
  function open(){
    setPic(!pic)
  }
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
  console.log(pic)
  console.log(switchToogle)
  console.log(Images!="")
  return (
    <>
   
    <div className="message-send-section" >
    <input type="checkbox" id="emoji" />
        <div className="file">
          <BsPlusCircle/>
        </div>
        <div className="file">
          <input type="file" id="pic" onChange={fileHandle}  accept=".png, .jpg, .jpeg" className="form-control"   />
          <label htmlFor='pic' onClick={open}><BsCardImage/></label>
        </div>
        
       
          {!pic ?  
           <>
           <div className="message-type">
            <input onChange={inputHandle} defaultValue="" type="text" name="message" id="message" placeholder="Aa"  className="form-control" onClick={()=>{closes()}} />
            <label htmlFor="emoji" onClick={()=>{closes()}}>😀</label>
          </div>
          </>
        :
        <>
        { Images != "" ?
          <>
          { !switchToogle ?
          <div className="message-type-image" id="img">
            <div className="upload">
              <button onClick={pics}>X</button>
              <img src={ Images} />
            </div>
            <br/>
            <br/>
            <input onChange={inputHandle} type="text" name="message" id="message" placeholder="Aa"  className="formControl" onClick={()=>{closes()}} />
            <label htmlFor="emoji" className="emoji-icon"   onClick={()=>{closes()}}>😀</label>
          </div>
          :
           <div className="message-type">
            <input onChange={inputHandle} defaultValue="" type="text" name="message" id="message" placeholder="Aa"  className="form-control" onClick={()=>{closes()}} />
            <label htmlFor="emoji" onClick={()=>{closes()}}>😀</label>
          </div>
        }
          </>
        : null}
        </>
          }
        
        
        <div className="file" onClick={sendMessage}>💕</div>
            {close ? 
            <div className="emoji-section">
              <div className="emoji">
                {
                  emojis.map((e,index)=>
                    <span key={index} className="emoji-click" onClick={()=>{Emojis(e)}}>{e}</span>
                  )
                }
              </div>
        </div>
            : null}
            <br/>
    </div>
    
      </>
  )
}

export default MessageSend