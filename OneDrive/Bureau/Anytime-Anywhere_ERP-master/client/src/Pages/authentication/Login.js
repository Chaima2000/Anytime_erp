import styles from  "../../Css/Login.module.css";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar";
import swal from 'sweetalert';
import { useState, useContext , useEffect , useRef } from "react";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import {TweenMax} from "gsap";
import img1 from "../../uploads/img1.png";

function Login() {
  const history = useHistory();
  const { setUser } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [waiting, setWaiting] = useState(null);
   
  let imgs = useRef(null);
  let headers = useRef(null);
  let logos = useRef(null);
  let form = useRef(null);

  useEffect ( () => {
    TweenMax.to(imgs,1,{delay:-0.6 , opacity: 1 , ease : "easeOut"})
    TweenMax.to(logos,2,{delay:-0.7 , opacity: 1 , ease : "easeOut"})
    TweenMax.to(headers,2,{delay:-0.8 , opacity: 1 , ease : "easeOut"})
    TweenMax.to(form,2,{delay:-0.9 , opacity: 1 , ease : "easeOut"})
  })





  function login(e) {
    setWaiting(true);
    axios
      .post("/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.connected) {
          setUser(res.data);
          history.push("/");
        } else if (res.data === "ERROR") {
          setWaiting(false);
          swal({
            title: "Erreur",
            icon: "ERROR",
            button: "OK!",
          });
        } else if (res.data === "WRONG PASSWORD") {
          setWaiting(false);
          swal({
            title: "Mot de passe invalide",
            icon: "error",
            button: "OK!",
          });
        }
      });
    e.preventDefault();
  }

  return (
    <>
      <Navbar />
       <div className={styles.wrapper}>
          <div className={styles.separate} id="start">
             <div className={styles.banner} ref={el => imgs = el}>
                <img src={img1} alt="main-img" className={styles.banner_img} />
             </div>
             <p className={styles.copyright}>© 2021 A&A  All rights reserved</p>
          </div>
          <div className={styles.form_section}>
             <div className={styles.form_style}>
                <div className={styles.logo} ref={el => logos = el}>
                <img src={process.env.PUBLIC_URL + "/logo.png"} />
                </div>
                <h2 ref={el => headers = el}>Welcome !</h2>
                <form ref={el => form = el} className={styles.form} onSubmit={login}>
                    <div className={styles.fields}>
                      <label> Email</label><br />
                      <input type="email" placeholder="Enter your email" onChange={(e) => {setEmail(e.target.value);}} required />
                    </div>
                    <div className={styles.fields}>
                      <label>Password</label><br />
                      <input type="password" placeholder="Enter your password" onChange={(e) => { setPassword(e.target.value)}} required />
                    </div>
                    {waiting ? (
                          <FontAwesomeIcon icon={solid("spinner")}  spin size="2x" className={styles.spinner} />
                        ) : (
                          <>
                          <button type="submit" className={styles.submit_btn}> Login </button>
                          </>
                        )}
                    <br />
                    <Link to="/forgotpassword"  className={styles.p_right}><p>Forgot Password?</p></Link>
                    <br />
                    <Link to="/signup" className={styles.p_left}>Don't have an account ? create one !</Link>
                </form>
             </div>
          </div>
      </div>
    </>
  );
}
export default Login;