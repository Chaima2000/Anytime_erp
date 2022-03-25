import styles from "../../Css/Login.module.css";
import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  function forgotPassword(e) {
    e.preventDefault();
    axios.post("/forgotpassword", { email: email }).then((res) => {
      if (res.data === "EMAIL NOT FOUND") {
        alert("Email was not found");
      } else if (res.data === "SUCCESS") {
        alert(
          "An email was sent to " +
            email +
            " follow the link to reset your password."
        );
      }
    });
  }
  return (
    <>
      <section className={styles.container}>
        <div className="card">
          <h1>Password Reset</h1>
          <hr />
          <form onSubmit={forgotPassword}>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              className="formInput"
              placeholder="Email"
              type="email"
            />
            <button className="defaultBtn">Confirm</button>
          </form>
        </div>
      </section>
    </>
  );
}
export default ForgotPassword;
