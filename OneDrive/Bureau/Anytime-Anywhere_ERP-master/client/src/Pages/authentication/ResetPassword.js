import React, { useEffect, useState } from "react";
import styles from "../../Css/Login.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

function ResetPassword() {
  const url = window.location.pathname;
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    axios
      .post("/checkresettoken", {
        url: url,
      })
      .then((result) => {
        if (result.data.valid === true) {
          setToken(result.data.token);
        } else {
          history.push("/");
        }
      });
  });

  function resetPassword(e) {
    axios
      .post("/resetpassword", {
        token: token,
        password: password,
      })
      .then((result) => {
        if (result.data === "SUCCESS") {
          alert("Password changed successfully");
          history.push("/");
        } else {
          alert("An error occured, please try again later or contact us !");
          history.push("/");
        }
      });
    e.preventDefault();
  }

  return (
    <>
      <section className={styles.container}>
        <div className="card">
          <h1>Password Reset</h1>
          <hr />
          <form onSubmit={resetPassword}>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              className="formInput"
              placeholder="New Password ..."
              type="password"
            />
            <button className="defaultBtn">Confirm</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ResetPassword;
