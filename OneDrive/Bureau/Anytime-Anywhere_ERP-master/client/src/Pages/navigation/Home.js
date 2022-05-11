import React, {useEffect} from 'react';
import AOS from 'aos';
import {Link} from "react-router-dom";
import 'aos/dist/aos.css';
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './../../Css/home.module.css'; 
import download from './../../Css/Frame 19.PNG';
import Services from './Services';
import About from './About';
import wave from '../../Css/wave.png';
import { FaMapMarkerAlt, FaPhoneAlt, FaFax, FaEnvelope, FaGlobe} from "react-icons/fa";
function Home() {
  useEffect(() => {
    AOS.init({
      duration:1000,
    });
  }, [])

  return (
    <>
      <section id="home">
        <div className={styles.container}>
            <div className={styles.left} data-aos="fade-right">
              <h1 className={styles.h1}>
                <span>WELCOME TO OUR</span>
                <span> Entreprise Ressource <br /> Planning</span>
              </h1>
              <p className= {styles.p}> Espace Of Creativity And Intelligency</p>
              <button className={styles.button}>Contact us</button>
            </div>
            <div className={styles.right} data-aos="fade-left">
              <img src={download} alt="phone" />
            </div>
         </div>
         <br />
         <div className={styles.floatting_icon}>
            <a href="#services">
            <FontAwesomeIcon icon={solid("computer-mouse")} color="white" size="lg" className={styles.mouse} />
            </a>
        </div>
        <br /><br /> <br />
        
      </section>
      <Services />
      <About/>
      {/* <Contact /> */}
      <footer className={styles.footer} >
        <div className={styles.footer_box} data-aos="flip-down">
          <h4>Support: </h4>
          <div className={styles.links} >
            <a href="#home">&bull; Home</a>
            <a href="#About">&bull; About</a>
            <a href="#services">&bull; Services</a>
            <a href="#contact">&bull; Contact</a>
          </div>
        </div>
        <div className={styles.footer_box} data-aos="flip-down">
          <h4>Contact Us</h4>
          <div className={styles.footer_contact}>
            <p> 
             <Link className={styles.link} to='https://www.google.tn/maps/place/Anytime+%26+Anywhere/@35.8363658,10.6283984,17z/data=!3m1!4b1!4m5!3m4!1s0x13027576542f7433:0x98bf17040044656b!8m2!3d35.8363702!4d10.6305813?hl=fr'><FaMapMarkerAlt /> &nbsp; Address:immeuble meliene, Rue Ribat, Sousse </Link>
            </p>
            <p> 
             <FaPhoneAlt /> &nbsp; Phone: +216 56254878
            </p>
            <p> 
             <FaEnvelope /> &nbsp; Email: info@socialx.com
            </p>
            <p> 
             <FaGlobe /> &nbsp; Website: hgjklkmlù
            </p>
          
          </div>
        </div>
        <div className={styles.footer_box}>
          <p className={styles.p}>
            &copy; Copyright 2021. SocialX.com
          </p>
        </div>
      </footer>
      <a href="#home"><button className={styles.arrow_up}><FontAwesomeIcon icon={solid("arrow-up")} color="white" size="lg"/></button></a>
    </>
  )
}

export default Home