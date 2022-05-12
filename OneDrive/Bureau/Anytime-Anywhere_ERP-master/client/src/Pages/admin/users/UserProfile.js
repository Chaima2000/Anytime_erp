import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Notfound from "../../404";
import styles from "../../../Css/Users.module.css";

function UserProfile() {
  const [user, setUser] = useState({});
  const [notfound, setNotfound] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    axios.post("/getuser", { id: id }).then((res) => {
      if (res.data === "ERROR") {
        setNotfound(true);
      } else {
        setUser(res.data);
      }
    });
  }, []);

  useEffect( ()=> { 
  },[])
  return (
    <>
      {notfound ? (
        <Notfound />
      ) : (
        <>
          <section className={styles.profileContainer}>
            <div className={styles.profileCard}>
              <div className={styles.imageBox}>
                <img
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = process.env.PUBLIC_URL + "/icons/user.jpg";
                  }}
                  src={process.env.PUBLIC_URL + "/icons/" + user.profilePicture}
                  alt="user"
                />
              </div>
              <div className={styles.details}>
                <h2>{user.firstName + " " + user.lastName}</h2>
                <hr />
                <h1>Role: {user.role}</h1>
                <h4>Current Projects: {user.projects}</h4>
              </div>
            </div>
          </section>
          <section align="center">History</section>
        </>
      )}
    </>
  );
}

export default UserProfile;