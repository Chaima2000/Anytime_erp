import React , {useState, useEffect , useContext} from 'react';
import { AppContext } from "../../../Context/AppContext";
import axios from 'axios';
import styles from '../../../Css/ProjectTeam.module.css';
import BOOK from '../../../Css/book1.png';
import Navbar from '../../../components/Navbar';
function Projects() {
  const [projectId,setProjectId]=useState([]);
  const [onclick,setOnclick]=useState(false);
  const [ClientSociety,setClientSociety]=useState([]);
  const [projects, setProjects] = useState([{}]);
  const { user} = useContext(AppContext);
  let i=0;

  const id= user.id;
  useEffect(() => {
    axios.post("/getuser", { id: id }).then((res) => {
      if (res.data === "ERROR") {
        alert("eror")
      } else {
        getProject(id);
       getProjectId(id);

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
  function show(project){
   return(
     <>
      <p className={styles.paragh}>Description: <h3>{project.description}</h3></p> 
      <p className={styles.paragh}>Fichiers: <a href={project.file} download>Télécharger</a></p><br/>
      <button className={styles.btnView}>Voir les tâches</button><br/><br/>
      <button className={styles.btnView}>Voir les frais</button>
      </>
   )
  }
  function getProjectId(data){
    axios.get(`/getRowProjectId/${data}`).then( (res)=>{
      let j=0;
      if(res.data){
       setProjectId(res.data);
       getClient(res.data[j])
      }
      j=j+1;
    })
  }
  
  console.log(projectId)
  function getClient(Id){
    axios.get(`/check/getclient/${Id}`).then( (res)=>{
      if(res.data){
        setClientSociety(res.data);
      } 
    })
  }
  return (
    
    <>
    <Navbar></Navbar>
    {projects.map( (project) => {
      {i=i+1}
                  return (
                    <>
                  <div className={styles.div}>
                    <div className={styles.book}>
                    <div className={styles.cover}>
                        <img src={BOOK} className={styles.img} />
                        <h2 className={styles.h2}>Projet {i}</h2>
                        
                    </div>
                    <div className={styles.page}></div>
                    <div className={styles.page}></div>
                    <div className={styles.page}></div>
                    <div className={styles.page}></div>
                    <div className={styles.page}>
                    {onclick ? (
                          show(project)
                        ):
                        null} 
                    </div>
                    <div className={styles.back_cover}></div>
                    <div className={styles.last_page}>
                        <h2 className={styles.H2}>{project.name}</h2>
                        Etat: <h3 >{project.state}</h3>
                        Client: <h3 >{ClientSociety}</h3>
                        Débute à :  <h3 >{project.start}</h3>
                        Termine à :  <h3 >{project.end}</h3><br />
                        {!onclick ? (
                        <button  className={styles.btn_view} onClick={()=>{setOnclick(true)}}>Voir plus des détails</button>
                        ):
                        <button  className={styles.btn_view} onClick={()=>{setOnclick(false)}}>Masquer les détails</button>
                        }
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