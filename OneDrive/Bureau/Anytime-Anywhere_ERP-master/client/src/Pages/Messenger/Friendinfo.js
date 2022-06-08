import React from 'react';
import "../../Css/_friendinfo.scss";
import {BsChevronDown} from "react-icons/bs";
function Friendinfo({current}) {
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
              <div className="custom-chat">                  
                <h4>Customize chat</h4>                      
                <label><BsChevronDown/></label>
              </div>                                
              <div className="privacy">
                <h4>Privacy and Support</h4>
                <label><BsChevronDown/></label>
              </div>                          
              <div className="media">
                <h4>Share Media</h4>
                <label htmlFor="gallery"><BsChevronDown/></label>                   
              </div>             
            </div>
            <div className="gallery">
              <img  src=" /image/1341Capture5.PNG"/>
              <img  src=" /image/1341Capture5.PNG"/>
              <img  src=" /image/1341Capture5.PNG"/>
              <img  src=" /image/1341Capture5.PNG"/>
            </div>           
          </div>
        
  )
}

export default Friendinfo