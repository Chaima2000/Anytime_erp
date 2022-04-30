import React from 'react';
import styles from './../../Css/Services.module.css';
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {BsHexagon} from "react-icons/bs";
import { BiBarChartAlt } from "react-icons/bi";
import download from '../../uploads/download.png';



function Services() {
  return (
    <>
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
            <img src={download} />
        </div>
        <div className={styles.right}>
          <div className={styles.floatting_icon}>
          <div className={styles.right}>
          <div className={styles.floatting_icon}>
            <div className={styles.service}>
              <div className={styles.service_icon}>
                <BsHexagon color="#915c83" size={55} />
                <div className={styles.inner_icons}>
                  <BiBarChartAlt size={25} color="#6495ed" />
                </div>
              </div>
              <div className= {styles.service_text}>
                <h3> Gestion du projet</h3>
                <p className={styles.p}> hello and welcome</p>
              </div> 
            </div>
            <div className={styles.service}>
              <div className={styles.service_icon}>
                <BsHexagon color="#915c83" size={55} />
                <div className={styles.inner_icons}>
                  <BiBarChartAlt size={25} color="#6495ed" />
                </div>
              </div>
              <div className= {styles.service_text}>
                <h3> Gestion du projet</h3>
                <p className={styles.p}> hello and welcome</p>
              </div> 
            </div>
            <div className={styles.service}>
              <div className={styles.service_icon}>
                <BsHexagon color="#915c83" size={55} />
                <div className={styles.inner_icons}>
                  <BiBarChartAlt size={25} color="#6495ed" />
                </div>
              </div>
              <div className= {styles.service_text}>
                <h3> Gestion du projet</h3>
                <p className={styles.p}> hello and welcome</p>
              </div> 
            </div>
            <div className={styles.service}>
              <div className={styles.service_icon}>
                <BsHexagon color="#915c83" size={55} />
                <div className={styles.inner_icons}>
                  <BiBarChartAlt size={25} color="#6495ed" />
                </div>
              </div>
              <div className= {styles.service_text}>
                <h3> Gestion du projet</h3>
                <p className={styles.p}> hello and welcome</p>
              </div> 
            </div>
          </div>
         </div>




            
              
            
          </div>
        </div>
      </div>
    </div>
   </section>
    
    </>
  )
}

export default Services