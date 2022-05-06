import React from 'react';
import styles from '../../Css/Contact.module.css';
import image3  from '../../Css/image3.png';


function Contact() {
  return (
    <div className={styles.Container}>
      <div className={styles.contactForm}>
      <div className={styles.imgSection}><img src ={image3}/></div>
           
      </div>
    </div>
  )
}

export default Contact