import React, { useState ,  useEffect , useContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useParams } from "react-router-dom";
import styles from "../../../Css/Project.module.css";
import { AppContext } from "../../../Context/AppContext";
import Modal from 'react-modal';
import Pagination from './../../../components/Pagination';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';    
toast.configure();

function Projects() {
  const [projectList , setprojectList] = useState([]);
  const [popProject , setPopProject] = useState({});
  const [disabled , setDisabled] = useState(false);
  const [modalIsOpen , setModalIsOpen] = useState(false);
  const [enable , setEnable] = useState(false);
  const [deleteItem,setDeleteItem] = useState(false);
  const [currentPage , setCurrentPage] = useState(1);
  const [searchItem , setSearchItem]= useState("");
  const [postsPerPage] = useState(6);
  const [nameTask , setTaskName] = useState("");
  const [end , setEnd] = useState("");
  const [descriptionTask , setTaskDescription] = useState("");
  const [priority , setPriority] = useState([ { state : ""}]);
  const { user } = useContext(AppContext);
  const [show , setShow] = useState(true); 
  Modal.setAppElement('#root')
 /****************************************************************************** */
  let { id } = useParams();
  useEffect(() => {
      axios.get("getprojects").then((res) => {
        if (res.data) {
          setprojectList(res.data);
        }})
  },[]);
/***************************************************************** */
const addTask =(e) => {
  e.preventDefault();
  axios.post("/addTask" , {
    nameTask : nameTask,
    descriptionTask: descriptionTask,
    priority:priority,
  }).then ( (res) => {
     if(res.data === "ERROR") {
      toast.error("There's an error" ,{position: toast.POSITION.TOP_CENTER , autoClose : false  });
     }else { 
      toast.success('Added Successfully !' , {position:toast.POSITION.TOP_CENTER , autoClose:false });
      success();
     }
  })
  }
 /****************************************************************************** */
 const Pop = () => {
  setModalIsOpen(true);
 }
const Delete = () => {
  setDeleteItem(true);
}
 const PopUp = () => {
  setEnable(true);
 }
 const close = () => {
   setDisabled(true);
 }
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
      const success = () => {
        document.getElementById("nameTask").value="";
        document.getElementById("descriptionTask").value="";
        document.getElementById("priority").value="";
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
               <>
              <div className={styles.Bloc} key={project._id}>
                 <br/><br/>
                <div className={styles.info_section}>
                  <h5>Name of project : {project.name}</h5>
                  <h5>State : {project.state}</h5>
                  <h5>Client : {project.client}</h5>
                  <h5>Description : {project.description}</h5>
                </div>
                <div className={styles.buttonSection}>
                  <input type="button" value="close" className={styles.input} onClick= {()=>{PopUp() ; close()}}/>
                  <input type="button" value="Delete" onClick = {() => {Delete()}} className={styles.input}/>
                  <input type="button" value="Show" onClick={() => {setPopProject(project) ;  Pop()}} className={styles.input} /><br/><br/>  
                </div>
              </div> 
              {/*** Show modal ***/}
              <Modal isOpen={modalIsOpen} onRequestClose = {() => setModalIsOpen(false)} 
                                              shouldCloseOnOverlayClick={true} className={styles.Modal}
                                              style = {
                                                {  
                                                  overlay : {
                                                    backgroundColor : '#00000050'
                                                  },
                                                  content : {
                                                      color : 'black' , 
                                                      backgroundColor : 'white', 
                                                      },
                                               }
                                               }  
                                              >
                    <h4 className={styles.projectName}><span className={styles.spans}>Project Name :</span>{popProject.name}</h4><br/>
                    <h5><span className={styles.spans}>Assigned by :</span>{user.firstName}</h5>
                    <h5><span className={styles.spans}>Assigned to :</span>{project.members}</h5>
                   
                      <h5><span  className={styles.spans}>State :</span> {popProject.state}</h5>
                      <h5><span  className={styles.spans}>Start at :</span>  {popProject.start}</h5>
                      <span  className={styles.spans}>End at :</span><input  type="date" value = {project.end} onChange ={(e) => { setEnd(e.target.value)}}/>
                        {project.file.map( (files) => {
                          return ( 
                            <>
                              <h5><span className={styles.spans}>Files uploaded : </span>{files.file}</h5>
                            </>
                          )
                        })}
                      <input type="button" value="AddTask" id="addTask" className={styles.inputBtn} onClick={ () => {setShow(!show)}} /> <br/> <br/>
                      { show? 
                        <form onSubmit={addTask}>
                         <input type="text" placeholder='Enter name' className={styles.inputTasks} id="nameTask" name= "nameTask"  onChange={(e) => {setTaskName(e.target.value)}} disabled={disabled} /> <br/><br/>
                         <textarea type="text" placeholder='Enter description' className={styles.inputTasks} id="descriptionTask" name= "descriptionTask" onChange={(e) => {setTaskDescription(e.target.value)}} disabled={disabled} /> <br/><br/>
                         <h5><span className={styles.spans}>State :</span></h5>
                         <select className={styles.inputTasks} name="priority" id="priority"  onChange={(e) => setPriority(e.target.value)} disabled={disabled} >
                           <option>In progress</option>
                           <option>Planning</option>
                           <option>Closed</option>
                         </select>
                         <h5><span className={styles.spans}>Priority :</span></h5><input type="number" className={styles.inputTasks} onChange = { (e) => {setPriority(e.target.value)}} disabled={disabled}  /><br/><br/>
                         <button value="Save" className={styles.inputBtn}>Save</button><br/><br/>
                         </form> : null 
                      }
                      <input type="button" value="Close" className={styles.inputBtn} onClick={() => setModalIsOpen(false)}/><br/><br/> 
              </Modal>
               {/*** Close Modal ***/}
              <Modal isOpen={enable} onRequestClose = {() => setEnable(false)} 
                                              shouldCloseOnOverlayClick={true} style = {
                                                {  
                                                  overlay : {
                                                    backgroundColor : '#00000020'
                                                  },
                                                  content : {
                                                      color : 'black' , 
                                                      backgroundColor : 'white', 
                                                      },
                                               }
                                               } className={styles.ModalClose}   >
                    <p className={styles.closeParagraph}>Do you want to close this project ? <br/></p>
                    <div className={styles.btn_section}>
                     <input type="button"  value="Confirm" className={styles.close_Btn}  onClick={() => setEnable(false)} />
                     <input type="button" value="Cancel" className= "transparentBtn" onClick={() => setEnable(false)} />
                    </div>
              </Modal>
               {/*** Delete Modal ***/}
              <Modal isOpen={deleteItem} onRequestClose = {() => setDeleteItem(false)} 
                                              shouldCloseOnOverlayClick={true} style = {
                                                {  
                                                  overlay : {
                                                    backgroundColor : '#00000020'
                                                  },
                                                  content : {
                                                      color : 'black' , 
                                                      backgroundColor : 'white', 
                                                      },
                                               }
                                               } className={styles.ModalClose}   >
                    <p className={styles.closeParagraph}>Do you want to close this project ? <br/></p>
                    <div className={styles.btn_section}>
                     <input type="button"  value="Confirm" className={styles.close_Btn}  onClick={()=> {setDeleteItem(false) ; deleteProject(project._id)}}/>
                     <input type="button" value="Cancel" className= "transparentBtn" onClick={() => setDeleteItem(false)} />
                    </div>
              </Modal>
                  </>
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