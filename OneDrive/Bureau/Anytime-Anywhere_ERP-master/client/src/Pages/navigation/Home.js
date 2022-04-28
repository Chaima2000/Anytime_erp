import React from 'react';
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './../../Css/home.module.css'; 
import download from '../../uploads/Frame 19.png';
import Services from './Services';
function Home() {
  
  return (
    <>
      <section>
         <div className={styles.container}>
            <div className={styles.left}>
              <h1 className={styles.h1}>
                <span>WELCOME TO OUR</span>
                <span> Entreprise Ressource <br /> Planning</span>
              </h1>
              <p className= {styles.p}> Espace Of Creativity And Intelligency</p>
              <button className={styles.button}>Contact us</button>
            </div>
            <div className={styles.right}>
              <img src={download} alt="phone" />
            </div>
         </div>
         <div className={styles.floatting_icon}>
            <a href='#Services'>
            <FontAwesomeIcon icon={solid("computer-mouse")} color="white" size="lg" className={styles.mouse} />
            </a>
      </div>
      </section>
      <Services />

    </>
  )
}

export default Home