import React , {useState, useEffect , useContext} from 'react';
import { useParams } from "react-router-dom";
import { AppContext } from "../../../Context/AppContext";
import axios from 'axios';
function Projects() {
  const [User, setUser] = useState({});
  const [projectId,setProjectId]=useState([]);
  const [projectlist,setProjectlist]=useState([]);
  const [projects, setProjects] = useState([]);
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
                    <li>{project}</li><br /> 
                    </>
                  )
                })}
    

</>
  )
}

export default Projects