import React, { useEffect,useContext, useState } from 'react';
import axios from 'axios';
import  "./../../Css/_messenger.scss";
import {FiMoreHorizontal,FiEdit} from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import ActiveFriend from '../Messenger/ActiveFriend';
import Friends from './Friends';
import RightSide from './RightSide';
import { AppContext } from "../../Context/AppContext";
function Messenger() {
    const {user} = useContext(AppContext);
  return (
    <div className="messenger">
        <div className="row">
            <div className="col-3">
                <div className="left-side">
                    <div className="top">
                        <div className="image-name">
                            <div className="image">
                             <img src={user.image} />
                            </div>
                            <div className="name">
                              <h3>Himel</h3>
                            </div>
                        </div>
                        <div className="icons">
                            <div className="icon">
                                <FiMoreHorizontal />
                            </div>
                            <div className="icon">
                                <FiEdit/>
                            </div>
                        </div>
                    </div>
                    <div className="friend-search">
                                <div className="search">
                                    <button><BiSearch/></button>   
                                    <input placeholder='chercher' type="text" className="form-control" />
                                </div>
                    </div>
                    <div className="active_friends">
                        <ActiveFriend/>
                    </div>
                    <div className="friends">
                            <Friends />
                    </div>
                </div>
            </div>
            <RightSide />
        </div>
    </div>
  )
}

export default Messenger