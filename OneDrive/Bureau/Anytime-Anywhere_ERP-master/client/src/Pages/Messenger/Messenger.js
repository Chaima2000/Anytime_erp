import React from 'react';
import styles from '../../Css/Messenger.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

function Messenger() {
  return (
    <div className={styles.messenger_content}>
        <div className={styles.chat_list}>
          <div className={styles.new_conversation}>
               <span className={styles.plus_icon}><FontAwesomeIcon icon= {solid("plus")} color = "black" /></span>
               <input type="text" placeholder='new conversation' className={styles.input} />
          </div>
          <h3 className={styles.h3}>Chats</h3>
          <div className={styles.search_section}>
               <span className={styles.search_icon}><FontAwesomeIcon icon= {solid("search")} color = "black" /></span>
               <input type="text" placeholder=' search here' className={styles.input} />
          </div>
          <div className={styles.users_list}>
              <div className={styles.user}>
                 user1
              </div>
          </div>
        </div>
        <div className={styles.chat_content}>
            <div className={styles.content_header}>
               header
            </div>
            <div className={styles.content_bottom}>
               <span className={styles.plus_icon}><FontAwesomeIcon icon= {solid("plus")} color = "black" /></span>
               <input type="text" placeholder='type a message' className={styles.input_msg} />
               <span className={styles.send_icon}><FontAwesomeIcon icon= {solid("paper-plane")} color = "black" /></span>
            </div>
        </div>
        <div className={styles.user_profile}>
           <div className={styles.user_picture}>
                 user logo
           </div>
        </div>
    </div>
  )
}

export default Messenger