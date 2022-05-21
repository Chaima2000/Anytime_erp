import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Notfound from "../../404";
import styles from "../../../Css/Users.module.css";


function UserProfile() {
  const [user, setUser] = useState({});
  const [notfound, setNotfound] = useState(false);
  const [projects, setProjects] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    axios.post("/getuser", { id: id }).then((res) => {
      if (res.data === "ERROR") {
        setNotfound(true);
      } else {
        setUser(res.data);
        getProject(id);
      }
    });
  }, []);
  function getProject(id){
    axios.get(`/getProject/${id}`).then( (res)=>{
      if(res.data){
        setProjects(res.data);
      } 
    })
  }

  return (
    <>
      {notfound ? (
        <Notfound />
      ) : (
        <>
      <div className={styles.content}>
        <div className={styles.Profilecontainer}>
          <div className={styles.imgContainer}>
          <img  className={styles.image} src={user.image} 
                  // onError={(e) => {
                  //   e.target.onerror = null;
                  //   e.target.src = process.env.PUBLIC_URL + "/icons/user.jpg";
                  // }}
                  // src={process.env.PUBLIC_URL + "/icons/" + user.profilePicture}
                  // alt="user"
                />
          </div>
          <h2>{user.firstName + " " + user.lastName}</h2>
                <hr />
                <h1>Rôle:</h1>
                {user.role}
                <h1>Projets affectés</h1>
                {projects.map( (project) => {
                  return (
                    <>
                    <li className={styles.li}>{project}</li><br /> 
                    </>
                  )
                })}
        </div>
        </div>
          {/* <section className={styles.profileContainer}>
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
                <h1>Rôle:</h1>
                {user.role}
                <h1>Projets affectés</h1>
                {projects.map( (project) => {
                  return (
                    <>
                    <li className={styles.li}>{project}</li><br /> 
                    </>
                  )
                })}
              </div>
            </div>
          </section>
          <section align="center">History</section> */}
        </>
      )}
    </>
  );
}

export default UserProfile;