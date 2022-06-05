import React, {useEffect , useState} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useHistory } from "react-router-dom";
import {Link} from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import wave2 from "./../../Css/wave.png";
import styles from './../../Css/home.module.css'; 
import logo from "./../../Css/logo.PNG";
import Services from './Services';
import About from './About';
import Contact from './Contact';
function Home() {
  const [isOpen , setIsOpen]=useState(false);
  const history = useHistory();
  useEffect(() => {
    AOS.init({
      duration:1000,
    });
  }, [])
  //navbar scroll when active state
  const [navbar, setNavbar] = useState(false)


  //navbar scroll changeBackground function
  const changeBackground = () => {
    if (window.scrollY >= 66) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }

  useEffect(() => {
    changeBackground()
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground)
  })

  return (
    <>
      <section id="home" className={styles.home}>
      {navbar ? (
          <div className={styles.navbar} style={{background: "white" , boxShadow:"0 0 20px #ebebeb"}}>
            <img src={logo} data-aos="zoom-in" />
            <input type="checkbox" id="click" style={{display:"none"}}  onClick={()=>setIsOpen(!isOpen)} />
            <label htmlFor='click'>
            <p><FontAwesomeIcon icon={solid("list")} color="#191970" className={styles.list_icon} /></p>
            </label>
            <div className={styles.item}>
            <a onClick={()=> {history.push("/")}}><h4 className={styles.defaultBlackLink}>Acceuil</h4></a>
            <a href="#About"><h4 className={styles.defaultBlackLink}>À propos</h4></a>
            <a href="#services"><h4 className={styles.defaultBlackLink}>Services</h4></a>
            <a href="#Contact"><h4 className={styles.defaultBlackLink}>Contactez-nous</h4></a>
            </div>
            {isOpen ? (
              <>
             
            <div className={styles.itemafter} data-aos="fade-down">
            <label htmlFor='click'>
            <p><FontAwesomeIcon icon={solid("xmark")} color="white" className={styles.xmark} /></p>
            </label>
            <a href="#home" ><h4 className={styles.defaultBlackLink}>Acceuil</h4></a>
            <a href="#About"><h4 className={styles.defaultBlackLink}>À propos</h4></a>
            <a href="#services"><h4 className={styles.defaultBlackLink}>Services</h4></a>
            <a href="#Contact"><h4 className={styles.defaultBlackLink}>Contactez-nous</h4></a>
            </div>
            </>
            ):
            null }
            <Link className={styles.link} onClick={()=> {history.push("/login")}}><h4 className={styles.defaultLink} style={ {right: "23%", color:"#191970"}}>Connexion</h4></Link><a onClick={()=> {history.push("/signup")}}><h4 className={styles.defaultLinkBtn} style={ {right: "10%" , background:"linear-gradient(180deg, rgba(160, 20, 103, 1) 26.71%, rgba(171, 74, 230, 1) 99.36%)", color:"white", boxShadow:  "0 0 8px blue"}}>S'inscrire</h4></a>
          </div>
          ) : 
          <div className={styles.navbar} style={{background: "transparent"}}>
            <button onClick={()=> {history.push("/")}}><img src={logo} data-aos="zoom-in" /></button>
            <input type="checkbox" id="click" style={{display:"none"}}  onClick={()=>setIsOpen(!isOpen)} />
            <label htmlFor='click'>
            <p><FontAwesomeIcon icon={solid("list")} color="#191970" className={styles.list_icon} /></p>
            </label>
            <div className={styles.item}>
            <a onClick={()=> {history.push("/")}}><h4 className={styles.defaultBlackLink}>Acceuil</h4></a>
            <a href="#About"><h4 className={styles.defaultBlackLink}>À propos</h4></a>
            <a href="#services"><h4 className={styles.defaultBlackLink}>Services</h4></a>
            <a href="#Contact"><h4 className={styles.defaultBlackLink}>Contactez-nous</h4></a>
            </div>
            {isOpen ? (
              <>
             
            <div className={styles.itemafter} data-aos="fade-down">
            <label htmlFor='click'>
            <p><FontAwesomeIcon icon={solid("xmark")} color="white" className={styles.xmark} /></p>
            </label>
            <a href="#home" ><h4 className={styles.defaultBlackLink}>Acceuil</h4></a>
            <a href="#About"><h4 className={styles.defaultBlackLink}>À propos</h4></a>
            <a href="#services"><h4 className={styles.defaultBlackLink}>Services</h4></a>
            <a href="#Contact"><h4 className={styles.defaultBlackLink}>Contactez-nous</h4></a>
            </div>
            </>
            ):
            null }
            <Link className={styles.link} onClick={()=> {history.push("/login")}}><h4 className={styles.defaultLink} style={ {right: "23%"}}>Connexion</h4></Link><a onClick={()=> {history.push("/signup")}}><h4 className={styles.defaultLinkBtn} style={ {right: "10%"}}>S'inscrire</h4></a>
          </div>
          }
         
          <div className={styles.left} data-aos="fade-right">
                <h1 className={styles.h1}  >
                  <span>BIENVENUE DANS</span>
                  <span> NOTRE GESTION DES <br /> RESSOURCES <br />D'ENTREPRISE</span>
                </h1>
                <p className= {styles.p}> Espace Of Creativity And Intelligency</p>
                <button className={styles.button}>Contact us</button>
          </div>
          <div className={styles.floatting_icon}>
              <a href="#services">
              <FontAwesomeIcon icon={solid("computer-mouse")} color="white" className={styles.mouse} />
              </a>
          </div>
          <div className={styles.one}></div>
            <img src={wave2} className={styles.img} />
        <br /><br /><br /> <br />
        <div className={styles.services}> <Services /></div>
        {/* <div className={styles.about}> <About /></div> */}
        <a href="#home"><button className={styles.arrow_up}><FontAwesomeIcon icon={solid("arrow-up")} color="white" size="lg"/></button></a>
      </section>
      <br />
      {/* <div className={styles.contact}><Contact /></div> */}
      {/* <footer className={styles.footer} >
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
       */}
    </>
  )
}

export default Home