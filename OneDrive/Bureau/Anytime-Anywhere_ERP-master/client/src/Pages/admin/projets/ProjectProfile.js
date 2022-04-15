import React, { useState ,  useEffect , useContext} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from "../../../Css/Project.module.css";
import Styles from "../../../Css/Users.module.css";
import Modal from 'react-modal';
import swal from 'sweetalert';
import { AppContext } from "../../../Context/AppContext";

function ProjectProfile() {
  const { user } = useContext(AppContext);
  const [projectProfile, setProjectProfile] = useState([]);
  const[end , setEnd] = useState("");

  /** Tasks states **/
  const [tasksList , setTasksList] = useState([]);
  const[nameTask , setNameTask] = useState("");
  const [stateTask , setStateTask] = useState("");
  const[descriptionTask , setDescriptionTask] = useState("");
  const[priorityTask , setpriorityTask] = useState("");

/** Search + pagination' states **/
  const [currentPage, setCurrentPage] = useState(1);
  const [waiting, setWaiting] = useState(true);
  const [searchTerm , setSearchTerm]= useState("");
  const [allPages, setAllPages] = useState([]);
 
/** Models's states **/
  const [view , setViewTask] = useState("");
  const [deleteTask,setDeleteTask] = useState(false);
  const [viewExpense , setViewExpense] = useState("");
  const [deleteExpenses,setDeleteExpense] = useState(false);
  const [modalIsOpen , setModalIsOpen] = useState(false);
  const [popProject , setPopProject] = useState({});
  const [expenseModal , setexpenseModal] = useState(false);

/** Expenses's states **/
  const [expenses , setExpenses] = useState({});
  const [expenseName , setExpenseName] = useState("");
  const [expenseDescription , setExpensesDescription ] = useState("");
  const [expenseValue , setExpenseValue] = useState("");


  let { id } = useParams();

  Modal.setAppElement('#root');

  useEffect(() => {
    axios.post("/getproject",{ id: id }).then((res) => {
      if (res.data) {
        setProjectProfile(res.data);
      }
    });
  },[]);

  function getTasks(page) {
    axios
      .post("/getTasks", { currentPage: page , searchTerm: searchTerm})
      .then((res) => {
        if (res.data === "ERROR") {
          alert("error !");
        } else {
          setWaiting(false);
          setTasksList(res.data.tasks);
          setAllPages(res.data.allPages);
        }
      });
  }
  function getExpenses(page) {
    axios
      .post("/getexpenses", { currentPage: page , searchTerm: searchTerm})
      .then((res) => {
        if (res.data === "ERROR") {
          alert("error !");
        } else {
          setWaiting(false);
          setExpenses(res.data.expenses);
          setAllPages(res.data.allPages);
        }
      });
  }
  function resetSearch() {
    document.getElementById("searchField").value = "";
    axios.post("/getexpenses").then((res) => {
      if (res.data === "ERROR") {
        alert("error !");
      } else {
        setExpenses(res.data.expenses);
        setAllPages(res.data.allPages);
      }
    });
}
  useEffect(() => {
    getExpenses(currentPage);
  }, []);
  function resetSearch() {
    document.getElementById("searchField").value = "";
    axios.post("/getTasks").then((res) => {
      if (res.data === "ERROR") {
        alert("error !");
      } else {
        setTasksList(res.data.tasks);
        setAllPages(res.data.allPages);
      }
    });
}

  useEffect(() => {
    getTasks(currentPage);
  }, []);

const success =() => {
     document.getElementById("nameTask").value = "";
     document.getElementById("descriptionTask").value = "";
     document.getElementById("priorityTask").value = "";
     document.getElementById("stateTask").value = "";
}

function deletetask(id) {
    axios.delete(`/deleteTask/${id}`).then((res) => {
      if (res.data === "ERROR") {
        alert("An error occured");
      } else {
            axios.get("getTasks").then((res) => {
              setTasksList(res.data);
            });  
          }
        })
}
function deleteExpense(id) {
  axios.delete(`/deleteExpense/${id}`).then((res) => {
    if (res.data === "ERROR") {
      alert("An error occured");
    } else {
          axios.get("getExpense").then((res) => {
            setExpenses(res.data);
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
}})}

const addexpense =(e) => {
  e.preventDefault();
  const data = new FormData();
  data.append("expenseName",expenseName);
  data.append("expenseDescription",expenseDescription);
  data.append("expenseValue",expenseValue);
  const dataT = {
    expenseName:expenseName,
    expenseDescription:expenseDescription,
    expenseValue:expenseValue,
  }
  axios.post("/addExpense", dataT).then((res)=>{
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
}})}

const Pop = () => {
  setModalIsOpen(true)}

const ExpensePop = () => {
  setexpenseModal(true)}

const deletePopExpense = () => {
  setDeleteExpense(true)}

const deletePopUp = () => {
      setDeleteTask(true)}

const viewPopUp = () => {
      setViewTask(true)}

return (
    <>
      <h4 className={styles.h4}>Name : {projectProfile.name}</h4>
      <h4 className={styles.h4}>State : {projectProfile.state}</h4>   
      <h4 className={styles.h4}>Client : {projectProfile.client}</h4>   
      <h4 className={styles.h4}>Description : {projectProfile.description}</h4>é
      <h4 className={styles.h4}>Start at : {projectProfile.start}</h4>
      <h4 className={styles.h4}>End at :
      <input type="date" defaultValue={projectProfile.end} onChange = { (e) => { setEnd(e.target.value)}} className={Styles.formInput} /></h4>
      <div className={styles.task_section}>
        <br />
        Tasks
        <FontAwesomeIcon icon= {solid("plus")} color = "black" className={styles.add_icon} onClick={() => {setPopProject(projectProfile) ;  Pop()}} />
      
        <form 
            onSubmit={(e) => {
                  document.getElementById("searchField").disabled = true;
                  document.getElementById("resetBtn").hidden = false;
                  document.getElementById("searchBtn").hidden = true;
                  e.preventDefault();
                  getTasks();
                  setCurrentPage(1);
            }}
            className={styles.search_form}
          >
            <input
                      id="searchField"
                      required
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                      }}
                      className={Styles.formInput}
                      type="text"
                      placeholder="Task Name ..."
                    />
                    <button id="searchBtn" className="transparentBtn">
                      <FontAwesomeIcon icon={solid("search")} size="lg" />
                    </button>
                    <button
                              type="button"
                              onClick={() => {
                                resetSearch();
                                document.getElementById("searchField").disabled = false;
                                document.getElementById("resetBtn").hidden = true;
                                document.getElementById("searchBtn").hidden = false;
                              }}
                              hidden
                              id="resetBtn"
                              className="transparentBtn"
                    >
                              <FontAwesomeIcon icon={solid("undo")} size="lg" />
                    </button>
        </form>
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
                                              <select className={styles.input_item} name="stateTask" id="stateTask" onChange={ (e) => { setStateTask(e.target.value)}} required>
                                               <option value="Planning">Planning</option>
                                               <option value="In_progress">In progress</option>
                                               <option value="Closed">Closed</option>
                                              </select><br/><br/>
                                              <input type="text" placeholder='Task name' id="nameTask" name="nameTask" className={styles.input_item} onChange={ (e) => { setNameTask(e.target.value)}} required /> <br/><br/>
                                              <textarea placeholder='Task description'  id="descriptionTask"  name="descriptionTask" className={styles.input_item} onChange={ (e) => { setDescriptionTask(e.target.value)}} required /><br/><br/>
                                              <label>Priority : </label>
                                              <input  type="number" className={styles.input_item}  id="priorityTask" name="priorityTask" onChange={ (e) => { setpriorityTask(e.target.value)}} required/><br/><br/>
                                              <button className={styles.btn}>save</button>
                                            </form>
        </Modal>
        <br/>
        {tasksList.map( (task) => {
          return (
           <>
            <div className={styles.Bloc}>
               <h4>Name : {task.nameTask} </h4>
               <h4>Description : {task.descriptionTask} </h4>
               <h4>State : {task.stateTask} </h4>
               <input className={styles.DeleteTask} type="button" value="Delete" onClick={()=> { deletePopUp() }} />
               <input className={styles.DeleteTask} type="button" value="Edit"  />
               <input className={styles.DeleteTask} type="button" value="View" onClick={()=> { viewPopUp() }}  />   
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
            <Modal isOpen={view} onRequestClose = {() => {setViewTask(false) ; setTasksList(task)}} 
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
  <div className="paginationContainer">
      {allPages.map((page) => {
        if (page === currentPage) {
          return (
            <div
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        getTasks(page);
                      }}
                      className="activePagination"
            >
              {page}
            </div>
                  );
        } else {
                  return (
                    <div
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        getTasks(page);
                      }}
                      className="pagination"
                    >
                      {page}
                    </div>
                  )}
      })}
  </div>
  <div className={styles.task_section}>
        <br />
        Expenses
        <FontAwesomeIcon icon= {solid("plus")} color = "black" className={styles.add_icon} onClick={() => {setExpenses(expenses) ;  ExpensePop()}} />
        <form 
            onSubmit={(e) => {
                  document.getElementById("searchField").disabled = true;
                  document.getElementById("resetBtn").hidden = false;
                  document.getElementById("searchBtn").hidden = true;
                  e.preventDefault();
                  getExpenses();
                  setCurrentPage(1);
            }}
            className={styles.search_form}
          >
            <input
                      id="searchField"
                      required
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                      }}
                      className={Styles.formInput}
                      type="text"
                      placeholder="Expense Name ..."
                    />
                    <button id="searchBtn" className="transparentBtn">
                      <FontAwesomeIcon icon={solid("search")} size="lg" />
                    </button>
                    <button
                              type="button"
                              onClick={() => {
                                resetSearch();
                                document.getElementById("searchField").disabled = false;
                                document.getElementById("resetBtn").hidden = true;
                                document.getElementById("searchBtn").hidden = false;
                              }}
                              hidden
                              id="resetBtn"
                              className="transparentBtn"
                    >
                              <FontAwesomeIcon icon={solid("undo")} size="lg" />
                    </button>
        </form>
        <br/>
        {/* {expenses.map( (expense) => {
          return (
           <>
            <div className={styles.Bloc}>
               <h4>Name : {expense.expenseName} </h4>
               <h4>Description : {expense.expenseDescription} </h4>
               <h4>Value : {expense.expenseValue} </h4>
               <input className={styles.DeleteTask} type="button" value="Delete" onClick={()=> { deleteExpense() }} />
               <input className={styles.DeleteTask} type="button" value="Edit"  />
               <input className={styles.DeleteTask} type="button" value="View" onClick={()=> { viewExpense() }}  />
               
               
       <Modal isOpen={deleteExpenses} onRequestClose = {() => setDeleteExpense(false)} 
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
                     <input type="button"  value="Confirm" className={styles.close_Btn}  onClick={()=> {setDeleteExpense(false) ; deletePopExpense(expense._id)}}/>
                     <input type="button" value="Cancel" className= "transparentBtn" onClick={() => setDeleteExpense(false)} />
                    </div>
        </Modal>
        <Modal isOpen={viewExpense} onRequestClose = {() => {setViewExpense(false) ; setExpenses(expense)}} 
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
                <div className={styles.bloc_info} key= {expense._id}>
                    <h4>Expense's name : {expense.expenseName}</h4>
                    <h4>Expense's description : {expense.expenseDescription}</h4>
                    <h4>Expense's value : {expense.expenseValue}</h4>
                </div>
                    <div className={styles.btn_cancel}>
                     <input type="button" value="Cancel" className= "transparentBtn" onClick={() => setViewExpense(false)} />
                    </div>
        </Modal>
             </div>
    
           </>
          )
        })} */}
    </div>

</>
  )
}

export default ProjectProfile