import styles from "../../Css/Signup.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import swal from 'sweetalert';
import avatar from "../../uploads/avatar.png";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [image, setimage] = useState(avatar);
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message , setMessage] = useState("");

  const success = () => {
    document.getElementById("firstName").value="";
    document.getElementById("lastName").value="";
    document.getElementById("email").value="";
    document.getElementById("password").value="";
    document.getElementById("Confirmpassword").value= "";
    setimage(avatar);
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
            title: "SUCCESS",
            text: "Added succesfully!",
            icon: "success",
            button: "OK!",
          });
          success();
        } else if (res.data === "USER EXISTS WITH EMAIL") {
          alert("USER EXISTS WITH EMAIL");
        } else {
          swal({
            title: "ERROR",
            button: "OK!",
          });
        }
      });
      e.preventDefault();
  }

  return (
    <>
      <section className={styles.container_SignUp}>
        <div className="card">
          <h1>Sign Up</h1>
          <hr />
          <form onSubmit={createAccount}>
          <div className={styles.picture}>
            <img className={styles.img_section} src={image}/>
            <br />
            <label className={styles.btn_file}> Upload image 
              <input type="file" className={styles.file_input} 
                accept=".png, .jpg, .jpeg"
                onChange={async (e) => {
                          const file = e.target.files[0];
                          const base64 = await convertBase64(file);
                          setimage(base64);
                        }
                      }
                id="file"
              />
            </label>
          </div>
            <div className={styles.details_section}>
            <input
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required
              className="formInput"
              placeholder="First Name"
              type="text"
              id="firstName"
            />
            <input
              onChange={(e) => {
                setlastName(e.target.value);
              }}
              required
              className="formInput"
              placeholder="Last Name"
              type="text"
              id="lastName"
            />
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              className="formInput"
              placeholder="Email"
              type="email"
              id="email"
            />
           
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              className="formInput"
              placeholder="Password"
              type="password"
              pattern="(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,}"
              title="Password must contain minimum 8 characters including minimum 1 uppercase and 1 digit"
              id="password"
            />
            <input
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
              className="formInput"
              placeholder="Confirm Password"
              type="password"
              pattern="(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,}"
              title="Password must contain minimum 8 characters including minimum 1 uppercase and 1 digit"
              id="Confirmpassword"
            />
            <br />
            <br />
            <button className="defaultBtn">Sign Up</button>
            <br />
            <br />
            <Link to="/login">Already have an account ?</Link>
            <div align="right">
              <span id="formFeedback" style={{ color: "red" }} hidden={true}>
                Passwords doesn't match !
              </span>
            </div>
            </div>
            
          </form>
        </div>
      </section>
    </>
  );
}
export default Signup;
