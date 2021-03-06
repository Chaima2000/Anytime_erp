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
    "๐","โ๐","โ๐","๐โ",
    "๐","๐","โ๐คฃ","๐โ",
    "๐โ","๐","โโ๐โ","๐",
    "โ๐","โ๐ฅฐ","โ๐","๐คฉ",
    "โ๐","โ๐","โ๐","โ๐",
    "โ๐คช","โ๐","โ๐ค","๐คโ",
    "๐คญโ","๐คซ","โ๐ค","โ๐ค",
    "โ๐คจ","๐","๐โ","๐ถ",
    "๐","๐ฌโ","๐ฎโ๐จ","๐คฅ",
    "๐ช","๐คค","โ๐ด","โ๐ท",
    "๐ค","๐ค","๐คขโ","๐คฎโ",
    "๐คง","๐ฅต","๐ฅถ","๐ฅด",
    "๐ต","๐ตโ๐ซ","๐คฏ","๐ค ",
    "โ๐ฅณโ","๐","๐คโ","๐งโ",
    "๐โ","๐โ","๐ฒ","โ๐ฅบ",
    "๐ฆ","โ๐ฑ","๐ค","โ๐ฅฑ",
    "โ๐ซ","โ๐ก","โ๐","๐โ",
    "๐","โ๐","๐","๐โ",
    "๐","โ๐โ","๐","๐",
    "๐โ","๐","โโฃ๏ธ","๐",
    "โค๏ธโ๐ฅ","โค๏ธโ๐ฉน","โค๏ธ",
    "๐งก","๐","๐","๐โ",
    "๐โ","๐ค","๐คโ","๐ค",
    "โ๐ฏ","๐ฌโ","๐ฃ","๐ฆโ",
    "๐ซโ","๐ฅ","โ๐ข","๐"
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
            <label htmlFor="emoji" onClick={()=>{closes()}}>๐</label>
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
            <label htmlFor="emoji" className="emoji-icon"   onClick={()=>{closes()}}>๐</label>
          </div>
          :
           <div className="message-type">
            <input onChange={inputHandle} defaultValue="" type="text" name="message" id="message" placeholder="Aa"  className="form-control" onClick={()=>{closes()}} />
            <label htmlFor="emoji" onClick={()=>{closes()}}>๐</label>
          </div>
        }
          </>
        : null}
        </>
          }
        
        
        <div className="file" onClick={sendMessage}>๐</div>
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