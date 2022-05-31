import React from 'react';
import {BsThreeDots,FaEdit,BiSearch} from "react-icons/all";
import ActiveFriend from './ActiveFriend';
import Friends from './Friends';
import RightSide from './RightSide';
function Messenger() {
  return (
    <div className="messenger">
        <div className="row">
            <div className="col-3">
                <div className="left-side">
                    <div className="top">
                        <div className="image-name">
                            <div className="image">
                             <img src="/image/1341Capture5.PNG" />
                            </div>
                            <div className="name">
                              <h3>Himel</h3>
                            </div>
                        </div>
                        <div className="icons">
                            <div className="icon">
                                <BsThreeDots />
                            </div>
                            <div className="icon">
                                <FaEdit/>
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
                        <div className="hover-friend active">
                            <Friends />
                        </div>
                    </div>
                    <div className="friends">
                        <div className="hover-friend">
                            <Friends />
                        </div>
                    </div>
                    <div className="friends">
                        <div className="hover-friend">
                            <Friends />
                        </div>
                    </div>
                    <div className="friends">
                        <div className="hover-friend">
                            <Friends />
                        </div>
                    </div>
                    <div className="friends">
                        <div className="hover-friend">
                            <Friends />
                        </div>
                    </div>
                </div>
            </div>
            <RightSide />
        </div>
    </div>
  )
}

export default Messenger