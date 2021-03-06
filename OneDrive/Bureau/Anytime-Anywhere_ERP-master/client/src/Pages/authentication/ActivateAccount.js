import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link,useHistory } from "react-router-dom";
import styles from "../../Css/Login.scss";

function ActivateAccount() {
  const [activated, setActivated] = useState(null);
  const history = useHistory();
 
  const url = window.location.pathname;

  useEffect(() => {
    axios
      .post("/checkactivatetoken", {
        url: url,
      })
      .then((result) => {
        if (result.data.valid === true) {
          activateAccount(result.data.token);
        }
      });
  }, [history, url]);

  function activateAccount(token) {
    axios
      .post("/activateaccount", {
        token: token,
      })
      .then((result) => {
        if (result.data === "ACTIVATED") {
          setActivated(true);
        } else {
          setActivated(false);
        }
      });
  }

  return (
    <>
      <section className="Activated">
        {activated ? (
          <div className="card" align="center">
            <img
              src={process.env.PUBLIC_URL + "/icons/checkmark.png"}
              alt="checkmark.png"
              height="25%"
              width="25%"
            />
            <hr />
            <h2>Account activated successfully</h2>
            <br />
            <Link to="/Login"><h4>Redirecting to the login page ...</h4></Link>
          </div>
        ) : !activated ? (
          <div className="card" align="center">
            <img
              src={process.env.PUBLIC_URL + "/icons/xmark.png"}
              alt="xmark.png"
              height="25%"
              width="25%"
            />
            <hr />
            <h2>Activation failed please contact us:</h2>
            <code>contact@Anytime&Anywhere.com</code>
            <br />
            <Link to="/Login"><h4>Redirecting to the login page ...</h4></Link>
          </div>
        ) : null}
      </section>
    </>
  );
}

export default ActivateAccount;
