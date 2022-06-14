import "../../Css/Login.scss";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar";
import swal from 'sweetalert';
import { useState, useContext , useEffect , useRef } from "react";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import img1 from "../../Css/wave.png";

function Login() {
  const history = useHistory();
  const { setUser } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [waiting, setWaiting] = useState(null);
   function click(){
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");
    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });
    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
   }
   function click(){
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");
    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });
    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
   }
  

function click(){
  
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
if(sign_up_btn){
sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});
}
if(sign_in_btn){
sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
}
}


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
          history.push("/dashboard");
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
    
    <div className="container" id="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={login}>
            <h2 className="title">S'identifier</h2>
            <div className="input-field">
            <i><FontAwesomeIcon icon={solid("user")} /></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
            <i><FontAwesomeIcon icon={solid("lock")} /></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" className="btn solid"/>
            <p className="social-text">Or Sign in with social platforms</p>
          </form>
          <form className="sign-up-form">
            <h2 className="title">S'inscrire</h2>
            <div className="input-field">
            <i><FontAwesomeIcon icon={solid("user")} /></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
            <i><FontAwesomeIcon icon={solid("envelope")} /></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
            <i><FontAwesomeIcon icon={solid("lock")} /></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" className="btn" value="Sign up" />
            <p className="social-text">Or Sign up with social platforms</p>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p><br/>
            <button className="btn transparent" id="sign-up-btn" onClick={click()}>
              S'inscrire
            </button>
          </div>
          <img src={img1} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button className="btn transparent" id="sign-in-btn" onClick={click()}>
              Se connecter
            </button>
          </div>
          <img src={img1} className="image" alt="" />
        </div>
      </div>
    </div> 
    
    </>
  );
}
export default Login;