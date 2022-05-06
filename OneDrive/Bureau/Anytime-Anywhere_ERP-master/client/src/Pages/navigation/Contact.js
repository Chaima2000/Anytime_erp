import React from 'react';
import styles from '../../Css/Contact.module.css';
import image4  from '../../Css/image4.png';


function Contact() {
  return (
    <div className={styles.Container}>
      <div className={styles.contactForm}>
      </div>
      <div className={styles.imgSection}><img src ={image4}/></div>
    </div>
  )
}

export default Contact