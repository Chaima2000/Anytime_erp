import React , {useContext} from 'react';
import "../../Css/_friendinfo.scss";
import {BsChevronDown} from "react-icons/bs";
import { AppContext } from "../../Context/AppContext";
function Friendinfo({current ,receiver, message}) {
  const {user} = useContext(AppContext);
  return (
    <div className="friend-info">
            <input type="checkbox" id="gallery" />
            <div className="image-name">
              <div className="image">
                <img  src={current.image}/>
              </div>
              <div className="active-user">Active</div>
              <div className="name">
                <h4>{current.firstName} {current.lastName}</h4>
              </div>
            </div>
            <div className="others">
              {/* <div className="custom-chat">                  
                <h4>Personnaliser la discussion</h4>                      
                <label><BsChevronDown/></label>
              </div>                                
              <div className="privacy">
                <h4>Confidentialité et assistance</h4>
                <label><BsChevronDown/></label>
              </div>                           */}
              <div className="media">
                <h4>Contenu multimédia</h4>
                <label htmlFor="gallery"><BsChevronDown/></label>                   
              </div>             
            </div>
              {message.length >0 ? 
              <>
              <div className="gallery" key={"Images"}>
              {message.map((item , index)=>{
                return(
                  <>
                  {((item.senderId == user.id && item.receiverId == receiver) || (item.senderId != user.id && item.receiverId == user.id) )?
                  <>
                  {item.newImage !== '' ? 
                    <img src={item.newImage} key={index} />
                  :null}
                  </>
                  :null}
                  </>
                )
              })} 
              </div>
              </>: null} 
          </div>
        
  )
}

export default Friendinfo