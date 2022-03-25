import React, { useState ,  useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useParams } from "react-router-dom";
import styles from "../../../Css/Project.module.css";
import Styles from "../../../Css/popup.module.css";
import Pagination from './../../../components/Pagination';

function Projects(props) {
  const [projectList , setprojectList] = useState([]);
  const [currentPage , setCurrentPage] = useState(1);
  const [searchItem , setSearchItem]= useState("");
  const [postsPerPage] = useState(6);
  const [name , setName] = useState("");
  const [state , setState] = useState("");
  const [client , setClient] = useState("");
  const [description , setDescription] = useState("");
  const [start , setStart] = useState("");
  const [end , setEnd] = useState("");
  const [member , setMember] = useState("");
  const [user, setUser] = useState("");
  const [file , setFile] = useState([ { file : ""}]);
  const [nameTask , setTaskName] = useState("");
  const [descriptionTask , setTaskDescription] = useState("");
  const [Taskstate , setTaskstate] = useState([ { state : ""}]);
  const [AssignedTo , setAssignedTo] = useState("");
  const [AssignedBy , setAssignedBy] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isClose,  setIsClose] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
 /****************************************************************************** */
  let { id } = useParams();
  useEffect(() => {
      axios.get("getprojects",{ id: id }).then((res) => {
        if (res.data) {
          setprojectList(res.data);
        }})
  },[]);
 /****************************************************************************** */
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  const toggleSubmit = () => {
    setSubmit(!isSubmit);
  }
  const Task = props => {
    return ( 
      <div className={Styles.taskbox}>
        {props.taskContent}
      </div>
    )
  }
  const Popup = (props) => {
    return (
      <div className={Styles.popup_box}>
        <div className={Styles.box} >
        <span className={Styles.close_icon} onClick={props.handleClose}><FontAwesomeIcon icon={solid("xmark")} color = "black"/></span>
          {props.content}
        </div>
      </div>
    );
  }
  /****************************************************************************** */
    const addtask = (e) => {
    e.preventDefault();
    axios.post('/addtask' , {
      nameTask : nameTask,
      descriptionTask:descriptionTask,
    }).then ( (res) => {
      if(res.data === "ERROR"){
        console.log("ERROR");
      }else {
        console.log("success");
      }
    })  }
 /****************************************************************************** */
  function deleteProject(id) {
    axios.delete(`/deleteproject/${id}`).then((res) => {
      if (res.data === "ERROR") {
        alert("An error occured");
      } else {
            axios.get("getprojects").then((res) => {
              setprojectList(res.data);
            });  
          }
        })
      }
  /****************************************************************************** */
  const closeProject = (id) => {
    document.getElementById("description").value= description ;
    document.getElementById("start").value= start;
    document.getElementById("end").value= end;
    document.getElementById("client").value= client;
    document.getElementById("state").value= state;
    document.getElementById("file").value= file;
    document.getElementById("nameTask").value= nameTask;
    document.getElementById("descriptionTask").value= descriptionTask;
  }
 /****************************************************************************** */
    const ProjectsPosts = ({projectList}) => { 
      return (
          <>
       <div className={styles.bloc_section}>
              {projectList.filter((val) => {
                if(searchItem === "") {
                  return val ;
                }else if ( val.name.toLowerCase().includes(searchItem.toLowerCase()) || val.state.toLowerCase().includes(searchItem.toLowerCase()) || val.client.toLowerCase().includes(searchItem.toLowerCase())  ){
                  return val;
                }
              }).map( (project) => {
             return (
              <div className={styles.Bloc} key={project._id}>
                 <br/><br/>
                <div className={styles.info_section}>
                  <h5>Name of project : {project.name}</h5>
                  <h5>State : {project.state}</h5>
                  <h5>Client : {project.client}</h5>
                  
                  <input type="button" value="close" className={styles.input} onClick={() => {closeProject(project._id)}}/>
                  <input type="button" value="Delete" onClick={()=> {deleteProject(project._id)}} className={styles.input}/>
                  <input type="button" value="Show" onClick={()=>togglePopup(project._id)} className={styles.input}/>
                       {isOpen && <Popup content={            
                       <>
                       <div key={project._id}> 
                      <h4 className={styles.projectName}>project name : {project.name}</h4><br/><br/>
                      <span>Assigned By :</span> &nbsp;&nbsp;
                      <select>
                        <option></option>
                      </select><br/><br/>
                      <span id="description" onChange={ (e) => setDescription(e.target.value)} >Description : {project.description}</span><br/><br/>
                      <span id="start">Start at : {project.start}</span><br/><br/>
                      <span id="end">End at  : <input type="date" value={project.end}/></span><br/><br/>
                      <span id="client"> Did for  : {project.client}</span><br/><br/>
                      <span id="state">State : {project.state}</span><br/><br/>
                      <span id="file">Files : </span><br/><br/>
                      <h4>List of Task :</h4><br/><br/>
                      <button onClick={toggleSubmit} className={styles.addtask_btn}>Add Task</button><br/><br/>
                      {isSubmit && <Task taskContent={<>
                        <form onSubmit={addtask}>
                      <input type="text" placeholder='Name' name="nameTask"  id="nameTask" onChange={ (e) => nameTask(e.target.value)} className={styles.input} required/><br/><br/>
                      <input type="text" placeholder='Description' className={styles.input} name="descriptionTask" id="descriptionTask" onChange={ (e) => setTaskDescription(e.target.value)} required /><br/><br/>
                      <input type="button" value="Save" className={styles.savetask_btn} />
                      </form>
                      </>} />}
                      </div>      
                      </>}
                      handleClose={togglePopup}
                      />}
                      </div>
              </div> 
              )})
              }
          </div>
        </>)}
      


// Get Current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = projectList.slice(indexOfFirstPost , indexOfLastPost);
 
  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
  <div className={styles.overlay}>
    <h1>Project's List</h1>
    <div className={styles.search_box}>
     <input className={styles.search_text}  type="text" onChange={ (e) => { setSearchItem(e.target.value)}} placeholder="Type to search" />
     <a className={styles.search_btn} href="#"> 
       <FontAwesomeIcon icon= {solid("search")} color = "black" className={styles.search_icon} />
     </a>
    </div>
    <ProjectsPosts projectList={currentPosts} />
    <Pagination postsPerPage={postsPerPage} totalPosts= {projectList.length} paginate = {paginate} />    
  </div>
  </>
  )
}


export default Projects