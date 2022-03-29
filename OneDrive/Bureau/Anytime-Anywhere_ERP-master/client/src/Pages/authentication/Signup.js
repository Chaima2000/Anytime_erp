import styles from "../../Css/Signup.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Signup() {
  const [firstName, setFirstName] = useState("");
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
      <section className={styles.container}>
        <div className="card">
          <h1>Sign Up</h1>
          <hr />
          <form onSubmit={createAccount}>
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
            <button className="defaultBtn">Sign Up</button>
            <br />
            <br />
            <Link to="/login">Already have an account ?</Link>
            <div align="right">
              <span id="formFeedback" style={{ color: "red" }} hidden={true}>
                Passwords doesn't match !
              </span>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
export default Signup;
