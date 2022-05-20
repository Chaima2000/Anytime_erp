import React , {useState, useEffect , useContext} from 'react';
import { useParams } from "react-router-dom";
import { AppContext } from "../../../Context/AppContext";
import axios from 'axios';
import styles from '../../../Css/ProjectTeam.module.css';
import BOOK from '../../../Css/book1.png';
function Projects() {
  const [User, setUser] = useState({});
  const [projectId,setProjectId]=useState([]);
  const [projectlist,setProjectlist]=useState([]);
  const [projects, setProjects] = useState([{}]);
  const { user} = useContext(AppContext);
  const id= user.id;
  useEffect(() => {
    axios.post("/getuser", { id: id }).then((res) => {
      if (res.data === "ERROR") {
        alert("eror")
      } else {
        setUser(res.data);
        getProject(id);
      }
    });
  }, []);
  function getProject(id){
    axios.get(`/getRowproject/${id}`).then( (res)=>{
      if(res.data){
        setProjects(res.data);
      } 
    })
  }
  function getProjectId(id){
    axios.get(`/getRowProjectId/${id}`).then( (res)=>{
      if(res.data){
       setProjectId(res.data);
      }
    })
  }
  return (
    <>
    {projects.map( (project) => {
                  return (
                    <>
                    {/* <li>{project.name}</li><br /> 
                    <p>{project.description}</p><br />  */}
                  <div className={styles.div}>
                    <div className={styles.book}>
                    <div className={styles.cover}>
                        <img src={BOOK} className={styles.img} />
                        <h2 className={styles.h2}>Projet 1</h2>
                    </div>
                    <div className={styles.page}></div>
                    <div className={styles.page}></div>
                    <div className={styles.page}></div>
                    <div className={styles.page}></div>
                    <div className={styles.page}></div>
                    <div className={styles.back_cover}></div>
                    <div className={styles.last_page}>
                        <h2 className={styles.H2}>{project.name}</h2>
                        Etat: <h3 >{project.state}</h3>
                        Client: <h3 >{project.client}</h3>
                        Description: <h3 >{project.description}</h3>
                        Débute à :  <h3 >{project.start}</h3>
                        Termine à :  <h3 >{project.end}</h3>
                        Fichiers: <input value='télécharger'  type="button" id="upload"/> <br/><br/>
                        <input  value=" Voir plus des détails" type="button"/>
                    </div>
                    </div>
                  </div>
                </>                 
                   )

                })}

    

</>
  )
}

export default Projects