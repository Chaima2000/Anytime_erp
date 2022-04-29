import React from 'react';
import styles from './../../Css/Services.module.css';
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import download from '../../uploads/download.png';



function Services() {
  return (
    <section className={styles.services}>
      <div className={styles.container}>
       <div className={styles.title}>
        <FontAwesomeIcon icon={solid("bookmark")} color="#682860" className={styles.bookMark} />
        <h2>Our Services</h2>
        <p className={styles.p}>
          gfvbhklmlmù
        </p>
       </div>
       <div className={styles.content}>
         <div className={styles.left}>
         </div>
         <div className={styles.right}>
         <div className={styles.floatting_icon}>
            <a href="#Services">
            </a>
      </div>
         </div>
       </div>
      </div>
    </section>
  )
}

export default Services