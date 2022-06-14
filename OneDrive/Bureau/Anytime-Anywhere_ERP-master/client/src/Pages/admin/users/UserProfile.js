import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Notfound from "../../404";
import styles from "../../../Css/Users.module.css";
import Navbar from "../../../components/Navbar";

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
        <>
        <Navbar></Navbar>
        <Notfound />
        </>
      ) : (
        <>
        <Navbar/>
      <div className={styles.content}>
        <div className={styles.Profilecontainer}>
          <div className={styles.imgContainer}>
          <img  className={styles.image} src={user.image} />
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
        </>
      )}
    </>
  );
}

export default UserProfile;