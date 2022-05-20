import styles from "../../Css/Signup.module.css";
import { Link } from "react-router-dom";
import { useState , useRef , useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert';
import {TweenMax} from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import avatar from "../../uploads/avatar.png";
import img2 from "../../uploads/img2.png";
function Signup() {
  const [firstName, setFirstName] = useState("");
  const [fileDate, setFileData]= useState()
  const [image, setimage] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [waiting, setWaiting] = useState(null);
  const OnChangeImage= ({target}) => {
    setFileData(target.files[0]);
    setimage(target.value)
}
//dufzsqylg
//chaimaHS
//https://api.cloudinary.com/v1_1/
  let imgs = useRef(null);
  let headers = useRef(null);
  let form = useRef(null);

  useEffect ( () => {
    TweenMax.to(imgs,1,{delay:-0.6 , opacity: 1 , ease : "easeOut"})
    TweenMax.to(headers,2,{delay:-0.7 , opacity: 1 , ease : "easeOut"})
    TweenMax.to(form,2,{delay:-0.8 , opacity: 1 , ease : "easeOut"})
  })

  const success = () => {
    document.getElementById("firstName").value="";
    document.getElementById("lastName").value="";
    document.getElementById("email").value="";
    document.getElementById("password").value="";
    document.getElementById("Confirmpassword").value= "";
    document.getElementById("file").value= "";
  }
//   function convertBase64(file) {
//     return new Promise((resolve, reject) => {
//      const fileReader = new FileReader();
//      fileReader.readAsDataURL(file);
//      fileReader.onload = () => {
//        resolve(fileReader.result);
//      };
//      fileReader.onerror = (error) => {
//        reject(error);
//      };
//    });
//  }

  function createAccount(e) {
    if (password !== confirmPassword) {
      return (document.getElementById("formFeedback").hidden = false);
    }
    const data = new FormData();
    data.append("firstName",firstName);
    data.append("lastName",lastName);
    data.append("email",email);
    data.append("password",password);
    data.append("image",fileDate);
    data.append("upload_preset", "chaimaHS");
    const datax = {
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:password,
      image:image,
    }
    axios
      .post("/createaccount", "https://api.cloudinary.com/v1_1/dufzsqylg/upload",
      datax)
      .then((res) => {
        if (res.data === "SUCCESS") {
          console.log(res.data)
          swal({
            title: "Un e-mail a été envoyé à   " +
            email +
            "    suivez le lien pour activer votre compte.",
            icon: "success",
            button: "OK!",
          });
          success();
        } else if (res.data === "USER EXISTS WITH EMAIL") {
          swal({
            title: "L'email   " +
            email +
              "   existe déjà ",
            icon: "error",
            button: "OK!",
          });
        }
        else {
          swal({
            title: "Désolé , vérifier vos informations ",
            icon: "error",
            button: "OK!",
          });
        }
        });
      e.preventDefault();
  }

  return (
    <>
     <div className={styles.wrapper}>
          
          <div className={styles.form_section}>
             <div className={styles.form_style}>
                <h2 ref={el => headers = el}>Sign up</h2>
                <form ref={el => form = el} className={styles.form} onSubmit={createAccount} encType="multipart/form-data">
                    <div className={styles.fields}>
                        <label>   
                        <FontAwesomeIcon icon={solid("user")} size="lg"  className={styles.icons} />
                        <input type="text" placeholder="Enter your first name" onChange={(e) => {setFirstName(e.target.value);}} name="firstName" id="firstName" required />
                        </label>
                    </div>
                    <div className={styles.fields}>
                        <label>   
                        <FontAwesomeIcon icon={solid("user")} size="lg"  className={styles.icons} />
                        <input type="text" placeholder="Enter your last name" onChange={(e) => {setlastName(e.target.value);}} name="lastName" id="lastName" required />
                        </label>
                    </div>
                    <div className={styles.fields}>
                        <label>   
                        <FontAwesomeIcon icon={solid("envelope")}  size="lg"  className={styles.icons} />
                        <input type="email" placeholder="Enter your email" onChange={(e) => {setEmail(e.target.value);}} name="email" id="email" required />
                        </label>
                    </div>
                    <div className={styles.fields}>
                        <label>   
                          <FontAwesomeIcon icon={solid("lock")}  size="lg"  className={styles.icons} />
                          <input type="password" placeholder="Enter your password" 
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          name="password"
                          required
                          pattern="(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,}"
                          title="Password must contain minimum 8 characters including minimum 1 uppercase and 1 digit"
                          id="password" />
                        </label>
                    </div>
                    <div className={styles.fields}>
                        <label>   
                          <FontAwesomeIcon icon={solid("key")}  size="lg"  className={styles.icons} />
                          <input type="password" placeholder="Confirm your password"  name="password"
                          onChange={(e) => {
                                setConfirmPassword(e.target.value);
                              }}
                              required
                              pattern="(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,}"
                              title="Password must contain minimum 8 characters including minimum 1 uppercase and 1 digit"
                              id="Confirmpassword" />
                        </label>
                    </div>
                    <div className={styles.fields}>
                        <label className={styles.btn_file}>  <FontAwesomeIcon icon={solid("image")}  size="lg"  className={styles.icons} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Upload image 
                          <input type="file" className={styles.file_input} 
                            accept=".png, .jpg, .jpeg"
                            value={image}
                            onChange={(e)=>setimage(e.target.files[0])}
                            id="file"
                            name="image"
                          />
                           {/* onChange={async (e) => {
                                       const file = e.target.files[0];
                                       const base64 = await convertBase64(file);
                                       setimage(base64);
                                    }
                               } */}
                        </label>
                    </div>
                    {waiting ? (
                          <FontAwesomeIcon icon={solid("spinner")}  spin size="2x" className={styles.spinner} />
                        ) : (
                          <>
                          <button type="submit" className={styles.submit_btn}> Sign up </button>
                          </>
                        )}
                    <br />
                </form>
             </div>
          </div>
          <div className={styles.separate} id="start">
             <div className={styles.banner} ref={el => imgs = el}>
                <img  alt="main-img" className={styles.banner_img} src={img2} />
             </div>
          </div>
      </div>
      
    </>
  );
}
export default Signup;
