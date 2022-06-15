import "../../Css/Login.scss";
import * as React from 'react';
import { Link, useHistory } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import swal from "sweetalert";
import { useState, useContext , useEffect , useRef } from "react";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import img1 from "../../Css/wave.png";
import avatar from "../../uploads/avatar.png";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const history = useHistory();
  const { setUser } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [image, setimage] = useState(avatar);
  const [lastName, setlastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [waiting, setWaiting] = useState(null);
  const [open, setOpen] = useState(false);
  const [felicitation,setFelicitation]=useState(false);
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
   const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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
  function convertBase64(file) {
    return new Promise((resolve, reject) => {
     const fileReader = new FileReader();
     fileReader.readAsDataURL(file);
     fileReader.onload = () => {
       resolve(fileReader.result);
     };
     fileReader.onerror = (error) => {
       reject(error);
     };
   });
 }
  function createAccount(e) {
    if (password !== confirmPassword) {
      return (document.getElementById("formFeedback").hidden = false);
    }
    axios
      .post("/createaccount",
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        image:image
      })
      .then((res) => {
        if (res.data === "SUCCESS") {         
          swal({
            text: "Un email a été envoyé à " + email + "veuillez le vérifier pour activer votre compte",  
            type: "success",
            button:"OK"
          }).then(function(){
            window.location.reload()
          });
        } else if (res.data === "USER EXISTS WITH EMAIL") {
          alert("USER EXISTS WITH EMAIL");
        } else {
          swal({
            title: "ERROR",
            button: "OK!",
          }).then(function(){
           
          })
        }
      })
      e.preventDefault();
  }

  return (
    <>
    {waiting ? (
      <FontAwesomeIcon icon={solid("spinner")}  spin size="2x" className="spinner" />
      ) : (
        <>
        <div className="container" id="container">
        <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={login}>
            <h2 className="title">S'identifier</h2>
            <div className="input-field">
            <i><FontAwesomeIcon icon={solid("user")} /></i>
              <input type="email" placeholder="Tapez vos email" onChange={(e)=>{setEmail(e.target.value)}} required />
            </div>
            <div className="input-field">
            <i><FontAwesomeIcon icon={solid("lock")} /></i>
              <input type="password" placeholder="Tapez le mot de passe" onChange={(e)=>{setPassword(e.target.value)}} required  />
            </div>
            <input type="submit" value="Login" className="btn solid"/>
            <div className="links">
            <Link to="/forgotpassword"  className="forgot"><p>Forgot Password?</p></Link>
            <br />
            <Link to="/signup" className="create">Don't have an account ? create one !</Link>
            </div>
          </form>
          <form className="sign-up-form" onSubmit={createAccount}>
            <h2 className="title">S'inscrire</h2>
            <div className="input-field">
            <i><FontAwesomeIcon icon={solid("user")} /></i>
              <input type="text" placeholder="Nom" onChange={(e) => {setFirstName(e.target.value);}} required />
            </div>
            <div className="input-field">
            <i><FontAwesomeIcon icon={solid("user")} /></i>
              <input type="text" placeholder="Prénom" onChange={(e) => {setlastName(e.target.value);}} required />
            </div>
            <div className="input-field">
            <i><FontAwesomeIcon icon={solid("envelope")} /></i>
              <input type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value);}} required />
            </div>
            <div className="input-field">
            <i><FontAwesomeIcon icon={solid("lock")} /></i>
              <input type="password" placeholder="Mot de passe" onChange={(e) => {
                  setPassword(e.target.value)}}
                  required
                  pattern="(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,}"
                  title="Password must contain minimum 8 characters including minimum 1 uppercase and 1 digit"
              />
            </div>
            <div className="input-field">
            <i><FontAwesomeIcon icon={solid("key")} /></i>
              <input type="password" placeholder="Confirmer votre mot de passe" onChange={(e) => {
                setConfirmPassword(e.target.value)}}
                required
                pattern="(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,}"
                title="Password must contain minimum 8 characters including minimum 1 uppercase and 1 digit"
                id="Confirmpassword" />
            </div>
            <div className="input-field">
            <i><FontAwesomeIcon icon={solid("image")} /></i>
            <label style={{cursor:'pointer'}}> Télécharger une image
              <input type="file" accept=".png, .jpg, .jpeg"
                  onChange={async (e) => {
                  const file = e.target.files[0];
                  const base64 = await convertBase64(file);
                      setimage(base64)}} style={{display:'none'}} />
            </label>
            </div>
            <input type="submit"  className="btn" value="S'inscire"/>
          </form>
        </div>
      </div>
      <div className="panels-container" onClick={click()}>
        <div className="panel left-panel">
          <div className="content">
            <h4 className="h4">Tu es nouveau ici ?</h4>
            <h4 className="h4">
              Bienvenu dans notre application de gestion des ressources des entreprises
              <br/>
              Veuillez créer un compte pour nous rejoindre ?
            </h4><br/>
            <Stack spacing={2} sx={{ width: '100%' }}>
            <div onClick={handleClick}>
            <button className="btn transparent" id="sign-up-btn" >
              S'inscrire
            </button>
          </div>
        {felicitation ? 
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Un lien a été envoyé au {email} .. vérifiez-le
            </Alert>
          </Snackbar>:
          null}
      
        </Stack>
          </div>
          <img src={img1} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3 align="center">Tu es un membre ?</h3>
            <p className="para">
              Faire authentifier pour nous rejoindre
            </p>
            <button className="btn transparent" id="sign-in-btn">
              Se connecter
            </button>
          </div>
          <img src={img1} className="image" alt="" />
        </div>
      </div>
    </div>             
        </>
      )}
    </>
  );
}
export default Login;