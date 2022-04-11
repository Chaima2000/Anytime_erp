import styles from "../../Css/Signup.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { btn_file , file_input} from "../../Css/Project.module.css";
import avatar from "../../files/avatar.png";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [image, setimage] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function createAccount(e) {
    if (password !== confirmPassword) {
      return (document.getElementById("formFeedback").hidden = false);
    }
    axios
      .post("/createaccount", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        image:image,
      })
      .then((res) => {
        if (res.data === "SUCCESS") {
          alert("SUCCESS");
        } else if (res.data === "USER EXISTS WITH EMAIL") {
          alert("USER EXISTS WITH EMAIL");
        } else {
          alert("ERROR");
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
            <img className={styles.img_section} src= {avatar} />
            <br />
            <label className={styles.btn_file}> Upload image 
              <input type="file" className={styles.file_input}
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
            />
            <input
              onChange={(e) => {
                setlastName(e.target.value);
              }}
              required
              className="formInput"
              placeholder="Last Name"
              type="text"
            />
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              className="formInput"
              placeholder="Email"
              type="email"
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
