import styles from "../../Css/Login.module.css";
import { Link, useHistory } from "react-router-dom";
import Modal from 'react-modal';
import { useState, useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";


function Login() {
  const history = useHistory();
  const { setUser } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [waiting, setWaiting] = useState(null);




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
          history.push("/");
        } else if (res.data === "ACCOUNT NOT FOUND") {
          setWaiting(false);
          alert(res.data);
        } else if (res.data === "WRONG PASSWORD") {
          alert(res.data);
        }
      });
    e.preventDefault();
  }

  return (
    <>
                
      {/* <section >
        <div className="card">
          <h1>Login</h1>
          <hr />
          <form onSubmit={login}>
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
            />
            {waiting ? (
              <FontAwesomeIcon icon={solid("spinner")} spin size="2x" />
            ) : (
              <>
                <button className="defaultBtn">Login</button>
              </>
            )}
            <div align="right">
              <Link to="/forgotpassword">Forgot password ?</Link>
            </div>
            <div style={{ paddingTop: "40px" }} align="left">
              <Link to="/signup">Don't have an account ? create one !</Link>
            </div>
          </form>
        </div>
      </section> */}


      

    </>
  );
}
export default Login;