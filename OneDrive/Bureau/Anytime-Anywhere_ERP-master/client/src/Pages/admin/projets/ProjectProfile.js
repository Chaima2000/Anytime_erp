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
import TextField from '@material-ui/core/TextField'; 
import Select  from 'react-select';


function ProjectProfile() {
  const { user } = useContext(AppContext);
  const [projectProfile, setProjectProfile] = useState([]);
  const[end , setEnd] = useState("");
  const [membersList , setMembersList] = useState([]);
  const [member , setMember] = useState([]);
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
  const [view , setViewTask] = useState(false);
  const [deleteTask,setDeleteTask] = useState(false);
  const [viewExpense , setViewExpense] = useState(false);
  const [deleteExpenses,setDeleteExpense] = useState(false);
  const [modalIsOpen , setModalIsOpen] = useState(false);
  const [expenseIsOpen , setExpenseIsOpen] = useState(false);
  const [popProject , setPopProject] = useState({});
  const[ taskDelete , setDelete] = useState({});
  const[ expenseDelete , setexpenseDelete] = useState({});

/** Expenses's states **/
  const [expenses , setExpenses] = useState([]);
  const [expenseName , setExpenseName] = useState("");
  const [expenseDescription , setExpenseDescription ] = useState("");
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
  useEffect(() => {
    getExpenses(currentPage);
  }, []);

  useEffect(() => {
    getTasks(currentPage);
  }, []);
  useEffect(() => {
    axios.get("/getmembers").then((res) => {
      if (res.data){
        var options = []
        res.data.map((element) => {
            var fullName = element.firstName + " " + element.lastName;
            options.push({value: fullName, label: fullName} );
        })
        setMembersList(options);
      }
    });
  }, []);
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

  const customStyles = {
    control: (provided , state) => ({
      ...provided,
      background: 'white',
      opacity:1,
      outline: 'none',
      borderColor: '#9e9e9e',
      minHeight: '30px',
      height: '55px',
      boxShadow: state.isFocused ? null : null,
    })
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
const success =() => {
     document.getElementById("name").value = "";
     document.getElementById("description").value = "";
     document.getElementById("priority").value = "";
     document.getElementById("state").value = "";
}

function deletetask(id) {
    axios.delete(`/deleteTask/${id}`).then((res) => {
      if (res.data === "ERROR") {
        alert("An error occured");
      } else {
            axios.post("getTasks").then((res) => {
              setTasksList(res.data.tasks);
            });  
          }
        })
}
function deleteExpense(id) {
  axios.delete(`/deleteExpense/${id}`).then((res) => {
    if (res.data === "ERROR") {
      alert("An error occured");
    } else {
          axios.post("getExpenses").then((res) => {
            setExpenses(res.data.expenses);
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
      member:member,
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
  //State options //
  const options = [
    { value: 'planning', label: 'planning' },
    { value: 'in_progress', label: 'in progress' },
    { value: 'closed', label: 'closed' }
  ]
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
}})}
const editproject = (e) => {
  e.preventDefault();
  
}
const Pop = () => {
  setModalIsOpen(true)}

const ExpensePop = () => {
  setExpenseIsOpen(true)}

const deletePopExpense = () => {
  setDeleteExpense(true)}

const deletePopUp = () => {
      setDeleteTask(true)}

const viewPopUp = () => {
      setViewTask(true)}
const viewexpense = () => {
      setViewExpense(true)}
const handleChange = (e) => {
  setpriorityTask(e.target.value);
  console.log(e.target.value);
}
return (
    <>
    <div className={styles.Details}>
      <form onSubmit={editproject}>
      <p>Project name: &nbsp; &nbsp; &nbsp;<span className={styles.h4}>{projectProfile.name} </span></p>
      <p>Assigned by: &nbsp; &nbsp; &nbsp;<span className={styles.h4}><img src={user.image}  className={styles.profile}/>{user.firstName} {user.lastName}</span></p>
      <p>Assigned to: &nbsp; &nbsp; &nbsp;<span className={styles.h4}><img src={user.image} className={styles.profile} />{projectProfile.members}</span></p>
      <p>State: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span className={styles.h4}> {projectProfile.state}</span></p>  
      <p>Client : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span  className={styles.h4}> {projectProfile.client}</span></p>   
      <p>Description : &nbsp; &nbsp; &nbsp; &nbsp;<span className={styles.h4}>{projectProfile.description}</span></p>
      <p> Start at : &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;<span className={styles.h4}> {projectProfile.start}</span></p>
      <p>End at :</p>
      <input type="date" defaultValue={projectProfile.end} onChange= { (e) => { setEnd(e.target.value)}} className={styles.formInput}/> 
     
      <br />
      <br />
    <div className={styles.select}>
      <Select 
                isMulti
                placeholder="Edit Members"
                name="members"
                defaultValue={projectProfile.members}
                onChange={ (e) => {setMember(e.target.value)}}
                styles={customStyles}
                options={membersList} 
      />
    </div>
    </form>
    <br />
      <button className="defaultBtn">SAVE</button>
    </div>
    <div className={styles.Details}>
        <h2>Tasks <FontAwesomeIcon icon= {solid("plus")} color = "black" className={styles.add_icon} onClick={() => {setPopProject(projectProfile) ;  Pop()}} /></h2>
        
      
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
                                                  backgroundColor : '#00000020'
                                                  },
                                                  content : {
                                                      color : 'black' , 
                                                      width: '450px',
                                                      outline: 'none',
                                                      backgroundColor : '#f7f7f7', 
                                                      },
                                               }
                                               }  
                                              >
            <form onSubmit={addtask}>
                <h2 align="center">Add task </h2>
                <br />
                <br />
                <TextField id="name" 
                      type="text"
                      label = " Name "
                      className={styles.select}
                      variant="outlined"
                      onChange={ (e) => { setNameTask(e.target.value)}}
                      required 
                    />
                <br />
                <br />
                <TextField id="description" 
                      type="text"
                      label = " Description "
                      className={styles.select}
                      variant="outlined"
                      onChange={ (e) => { setDescriptionTask(e.target.value)}}
                      required 
                    />
                <br />
                <br />
                <div className={styles.select}>
                    <Select 
                          placeholder="Select State"
                          id="state"
                          onChange={ (e) => { setStateTask(e.label)}}
                          styles={customStyles}
                          options={options} 
                          required
                    />
                </div>
                <br />
                <br />
                
                  <h4><label>Task's priority</label> &nbsp;&nbsp;
                  <input  type="checkbox" value="urgent" onChange= { (event) => { handleChange(event) }} /></h4>
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
               <h4>Priority : {task.priorityTask} </h4>
               <input className={styles.DeleteTask} type="button" value="Delete" onClick={()=> { setDelete(task) ; deletePopUp() }} />
               <input className={styles.DeleteTask} type="button" value="Edit"  />
            <Modal isOpen={deleteTask} onRequestClose = {() => setDeleteTask(false)} 
                                              shouldCloseOnOverlayClick={true} style = {
                                                {  
                                                  overlay : {
                                                    backgroundColor : '#00000020'
                                                  },
                                                  content : {
                                                    color : 'black' , 
                                                      outline: 'none',
                                                      backgroundColor : 'white',
                                                      width: '400px',
                                                      height: '195px',
                                                      padding : '5px',
                                                      position : 'relative',
                                                      top:'25%',
                                                      left: '35%',
                                                      borderRadius: '15px'
                                                      },
                                               }
                                               }>
                    <p className={styles.ModalParagraph}>Do you want to delete {taskDelete.nameTask} ?</p>
                    <br />
                    <div className={styles.btn_section}>
                    <input type="button" value="CANCEL" onClick={() => setDeleteTask(false)} className= {styles.white_btn} />
                     <input type="button"  value="CONFIRM" onClick={()=> {setDeleteTask(false) ; deletetask(taskDelete._id)}} className= {styles.confirm_btn}/>
                    </div>
            </Modal>
             </div>
           </>
          )
        })}
  <br />
  <br />
  <br />
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
  </div>
        <br/>
        <div className={styles.Details}>
        <h2>Expenses <FontAwesomeIcon icon= {solid("plus")} color = "black" className={styles.add_icon} onClick={() => {setPopProject(projectProfile) ;  ExpensePop()}} /></h2>
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
        <Modal isOpen={expenseIsOpen} onRequestClose = {() => setExpenseIsOpen(false)} 
                                              shouldCloseOnOverlayClick={true} className={styles.Modal}
                                              style = {
                                                {  
                                                  overlay : {
                                                    backgroundColor : '#00000020'
                                                  },
                                                  content : {
                                                      color : 'black' , 
                                                      width: '450px',
                                                      height: '395px',
                                                      outline: 'none',
                                                      backgroundColor : '#f7f7f7', 
                                                      },
                                               }
                                               }  
                                              >
            <form onSubmit={addexpense}>
                <h2 align="center">Add expense </h2>
                <br />
                <br />
                <TextField id="name" 
                      type="text"
                      label = " Name "
                      className={styles.select}
                      variant="outlined"
                      onChange={(e)=>{setExpenseName(e.target.value)}} 
                      required 
                    />
                <br />
                <br />
                <TextField id="description" 
                      multiline
                      type="text"
                      label = " Description "
                      className={styles.select}
                      variant="outlined"
                      onChange={(e)=>{setExpenseDescription(e.target.value)}} 
                      required 
                    />
                <br />
                <br />
                <TextField id="value"
                      type="number" 
                      label = " Value "
                      className={styles.select}
                      variant="outlined"
                      onChange={(e)=>{setExpenseValue(e.target.value)}} 
                      required 
                    />
                <br />
                <br />
                <br />
                <button className={styles.btn}>save</button>
            </form>
        </Modal>
        <br/>
        {expenses.map( (expense) => {
          return (
           <>
            <div className={styles.Bloc}>
               <h4>Name : {expense.expenseName} </h4>
               <h4>Description : {expense.expenseDescription} </h4>
               <h4>Value : {expense.expenseValue} </h4>
               <input className={styles.DeleteTask} type="button" value="Delete" onClick={()=> { setexpenseDelete(expense) ;  deletePopExpense() }} />
               <input className={styles.DeleteTask} type="button" value="Edit"  />
            <Modal isOpen={deleteExpenses} onRequestClose = {() => setDeleteExpense(false)} 
                                              shouldCloseOnOverlayClick={true} style = {
                                                {  
                                                  overlay : {
                                                    backgroundColor : '#00000020'
                                                  },
                                                  content : {
                                                      color : 'black' , 
                                                      outline: 'none',
                                                      backgroundColor : 'white',
                                                      width: '400px',
                                                      height: '195px',
                                                      padding : '5px',
                                                      position : 'relative',
                                                      top:'25%',
                                                      left: '35%',
                                                      borderRadius: '15px'
                                                      },
                                               }
                                               }>
                    <p className={styles.ModalParagraph}>Do you want to delete { expenseDelete.expenseName} ? <br/></p>
                    <div className={styles.btn_section}>
                    <input type="button" value="CANCEL" className= {styles.white_btn} onClick={() => setDeleteExpense(false)} />
                    <input type="button"  value="CONFIRM" className= {styles.confirm_btn}  onClick={()=> {setDeleteExpense(false) ; deleteExpense(expenseDelete._id)}}/>
                    </div>
            </Modal>
             </div>
           </>
          )
        })}
  <br />
  <br />
  <br />
  <div className="paginationContainer">
      {allPages.map((page) => {
        if (page === currentPage) {
          return (
            <div
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        getExpenses(page);
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
                        getExpenses(page);
                      }}
                      className="pagination"
                    >
                      {page}
                    </div>
                  )}
      })}
  </div>
    </div>

</>
  )
}

export default ProjectProfile