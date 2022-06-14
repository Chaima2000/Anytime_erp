import styles from "../../Css/Login.scss";
import { useState } from "react";
import axios from "axios";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import swal from 'sweetalert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const success = () => {
    document.getElementById("email").value="";
  }
  function forgotPassword(e) {
    e.preventDefault();
    axios.post("/forgotpassword", { email: email }).then((res) => {
      if (res.data === "EMAIL NOT FOUND") {
        swal({
          title: email + "  est non trouvé",
          icon: "error",
          button: "OK!",
        });
      } else if (res.data === "SUCCESS") {
        swal({
          title: "Un e-mail a été envoyé à " +
          email +
          " suivez le lien pour activer votre compte. ",
          icon: "success",
          button: "OK!",
        });
        success();
      }
    });
  }
  return (
    <>
      <div className="center">
        <div className="header"> Rénitialiser le mot de passe</div>
        <form onSubmit={forgotPassword} className="forgetPasswordForm">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              className="formInput"
              placeholder="E-mail"
              type="email"
              id="email"
            />
            <i><FontAwesomeIcon icon={solid("envelope")}  size="lg"  className="icon" />
            </i>
            <button className="DefaultBtn">Confirmer</button>
          </form>
      </div>
    </>
  );
}
export default ForgotPassword;
