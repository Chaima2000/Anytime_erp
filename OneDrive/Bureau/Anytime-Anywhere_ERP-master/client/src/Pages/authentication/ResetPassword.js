import React, { useEffect, useState } from "react";
import styles from "../../Css/Login.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import swal from 'sweetalert';


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
          swal({
            title: "félicitation",
            icon: "success",
            button: "OK!",
          });
          history.push("/");
        } else {
          swal({
            title: "Erreur",
            icon: "error",
            button: "OK!",
          });
          history.push("/");
        }
      });
    e.preventDefault();
  }

  return (
    <>
    <div className={styles.center}>
        <div className={styles.header}> Nouveau mot de passe </div>
        <form onSubmit={resetPassword} className={styles.forgetPasswordForm}>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              className="formInput"
              placeholder="Nouveau mot de passe ..."
              type="password"
            />
             <i><FontAwesomeIcon icon={solid("key")}    className={styles.icon} />
            </i>
            <button className={styles.defaultBtn}>Confirmer</button>
          </form>
      </div>
    </>
  );
}

export default ResetPassword;
