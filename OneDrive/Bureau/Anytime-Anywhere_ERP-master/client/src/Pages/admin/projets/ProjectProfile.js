import React, { useState ,  useEffect , useContext} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from "../../../Css/Project.module.css";
import Modal from 'react-modal';
import swal from 'sweetalert';
import { AppContext } from "../../../Context/AppContext";

function ProjectProfile(props) {
  const [tasks , setTasks] = useState([]);
  const [view , setViewTask] = useState("");
  const [deleteTask,setDeleteTask] = useState(false);
  const[nameTask , setNameTask] = useState("");
  const[end , setEnd] = useState("");
  const [stateTask , setStateTask] = useState("");
  const[descriptionTask , setDescriptionTask] = useState("");
  const[priorityTask , setpriorityTask] = useState("");
  const [projectProfile, setProjectProfile] = useState({});
  const { user } = useContext(AppContext);
  const [modalIsOpen , setModalIsOpen] = useState(false);
  const [popProject , setPopProject] = useState({});
  let { id } = useParams();
  Modal.setAppElement('#root')
  useEffect(() => {
    axios.post("/getproject",{ id: id }).then((res) => {
      if (res.data) {
        setProjectProfile(res.data);
      }
    });
  },[]);
  const Pop = () => {
    setModalIsOpen(true);
   }

   const success =() => {
     document.getElementById("nameTask").value = "";
     document.getElementById("descriptionTask").value = "";
     document.getElementById("priorityTask").value = "";
     document.getElementById("stateTask").value = "";
   }
   useEffect(() => {
    axios.get("getTasks").then((res) => {
      if (res.data) {
        setTasks(res.data);
      }})
   },[]);
   function deletetask(id) {
    axios.delete(`/deleteTask/${id}`).then((res) => {
      if (res.data === "ERROR") {
        alert("An error occured");
      } else {
            axios.get("getTasks").then((res) => {
              setTasks(res.data);
            });  
          }
        })
      }
   const addtask =(e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("nameTask",nameTask);
    data.append("stateTask",stateTask);
    data.append("descriptionTask",descriptionTask);
    data.append("priorityTask",priorityTask);
    const dataT = {
      nameTask:nameTask,
      stateTask:stateTask,
      descriptionTask:descriptionTask,
      priorityTask:priorityTask
    }
    axios.post("/addTask", dataT).then((res)=>{
      if(res.data === "ERROR"){
        console.log(e);
      }else if(res.data === "SUCCESS"){
        swal({
          title: "SUCCESS",
          text: "Added succesfully!",
          icon: "success",
          button: "OK!",
        });
       success();

      }
    }
    )}
    const deletePopUp = () => {
      setDeleteTask(true);
     }
     const viewPopUp = () => {
      setViewTask(true);
     }

  return (
    <>
      <h4 className={styles.h4}>Name : {projectProfile.name}</h4>
      <h4 className={styles.h4}>Description : {projectProfile.description}</h4>
      <h4 className={styles.h4}>State : {projectProfile.state}</h4>   
      <h4 className={styles.h4}>Start at : {projectProfile.start}</h4>
      <h4 className={styles.h4}>End at :


       <input type="date" defaultValue={projectProfile.end} onChange = { (e) => { setEnd(e.target.value)}} className={styles.input_item_cd } /></h4>




      <input type="button" value="Add task" className={styles.addBtn_input}  onClick={() => {setPopProject(projectProfile) ;  Pop()}} />
      <Modal isOpen={modalIsOpen} onRequestClose = {() => setModalIsOpen(false)} 
                                              shouldCloseOnOverlayClick={true} className={styles.Modal}
                                              style = {
                                                {  
                                                  overlay : {
                                                    backgroundColor : '#00000050'
                                                  },
                                                  content : {
                                                      color : 'black' , 
                                                      backgroundColor : '#f7f7f7', 
                                                      },
                                               }
                                               }  
                                              >
                                            <form onSubmit={addtask}>
                                              <h1>Add task </h1>
                                              <h4>Assigned by : {user.firstName}</h4>
                                              <h4>Assigned to :</h4>  <FontAwesomeIcon icon= {solid("user")} /> {projectProfile.members}
                                              <h4>State :</h4> 
                                              <select className={styles.input_item} name="stateTask" id="stateTask" onChange={ (e) => { setStateTask(e.target.value)}}>
                                               <option value="Planning">Planning</option>
                                               <option value="In_progress">In progress</option>
                                               <option value="Closed">Closed</option>
                                              </select><br/><br/>
                                              <input type="text" placeholder='Task name ' id="nameTask" name="nameTask" className={styles.input_item} onChange={ (e) => { setNameTask(e.target.value)}} required /> <br/><br/>
                                              <textarea placeholder=' Task description'  id="descriptionTask"  name="descriptionTask" className={styles.input_item} onChange={ (e) => { setDescriptionTask(e.target.value)}} required /><br/><br/>
                                              <label>Priority : </label>
                                              <input  type="number" className={styles.input_item}  id="priorityTask" name="priorityTask" onChange={ (e) => { setpriorityTask(e.target.value)}} required/><br/><br/>
                                              <button className={styles.btn}>save</button>
                                          </form>
     </Modal><br/>
      <div className={styles.taskBloc}>
        <h1>Tasks's List : </h1>
        {tasks.map( (task) => {
          return (
           <>
            <div className={styles.Bloc}>
               <h4>Name : {task.nameTask} </h4>
               <h4>Description : {task.descriptionTask} </h4>
               <h4>State : {task.stateTask} </h4>
               <input className={styles.DeleteTask} type="button" value="Delete" onClick={()=> { deletePopUp() }} />
               <input className={styles.DeleteTask} type="button" value="Edit"  />
               <input className={styles.DeleteTask} type="button" value="View" onClick={()=> { viewPopUp() }}  />
                {/*** Delete Modal ***/}
       <Modal isOpen={deleteTask} onRequestClose = {() => setDeleteTask(false)} 
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
                    <p className={styles.closeParagraph}>Do you want to delete ? <br/></p>
                    <div className={styles.btn_section}>
                     <input type="button"  value="Confirm" className={styles.close_Btn}  onClick={()=> {setDeleteTask(false) ; deletetask(task._id)}}/>
                     <input type="button" value="Cancel" className= "transparentBtn" onClick={() => setDeleteTask(false)} />
                    </div>
        </Modal>
        <Modal isOpen={view} onRequestClose = {() => {setViewTask(false) ; setTasks(task)}} 
                                              shouldCloseOnOverlayClick={true} style = {
                                                {  
                                                  overlay : {
                                                    backgroundColor : '#00000080'
                                                  },
                                                  content : {
                                                      color : 'black' , 
                                                      backgroundColor : 'white', 
                                                      },
                                               }
                                               } className={styles.TaskModal}   >
                <div className={styles.bloc_info} key= {task._id}>
                    <h4>Task's name : {task.nameTask}</h4>
                    <h4>Task's description : {task.nameTask}</h4>
                    <h4>Task's state : {task.nameTask}</h4>
                    <h4>Assigned by : {user.firstName}</h4>
                    <h4>Assigned to :</h4>  <FontAwesomeIcon icon= {solid("user")} /> {projectProfile.members}
                </div>
                    <div className={styles.btn_cancel}>
                     <input type="button" value="Cancel" className= "transparentBtn" onClick={() => setViewTask(false)} />
                    </div>
        </Modal>

             </div>
           </>
          )
        })}
      </div>
      
     


</>
  )
}

export default ProjectProfile