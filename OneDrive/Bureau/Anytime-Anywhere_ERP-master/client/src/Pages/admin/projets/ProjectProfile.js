import React, { useState ,  useEffect , useContext} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from "../../../Css/Project.module.css";
import Modal from 'react-modal';
import { Link} from "react-router-dom";
import swal from 'sweetalert';
import { AppContext } from "../../../Context/AppContext";
import TextField from '@material-ui/core/TextField'; 
import Select  from 'react-select';

function ProjectProfile(props) {
  const { user } = useContext(AppContext);
  const [projectProfile, setProjectProfile] = useState([]);
  const [userList,setUserList]= useState([]);
  const [userImage,setUserImage]= useState("");
  const[end , setEnd] = useState("");
  const[state , setStateProject]= useState("");
  const [membersList , setMembersList] = useState([]);
 
  /** Tasks states **/
  const [tasksList , setTasksList] = useState([]);
  const[nameTask , setNameTask] = useState("");
  const [stateTask , setStateTask] = useState(null);
  const[descriptionTask , setDescriptionTask] = useState("");
  const[priorityTask , setpriorityTask] = useState("");
  const [waiting, setWaiting] = useState(true);
/** Models's states **/
  const [view , setViewTask] = useState(false);
  const [deleteTask,setDeleteTask] = useState(false);
  const [deleteExpenses,setDeleteExpense] = useState(false);
  const [modalIsOpen , setModalIsOpen] = useState(false);
  const [expenseIsOpen , setExpenseIsOpen] = useState(false);
  const [popProject , setPopProject] = useState({});
  const[ taskDelete , setDelete] = useState({});
  const[ taskEdit , setEdit] = useState(false);
  const[ expenseDelete , setexpenseDelete] = useState({});

/** Expenses's states **/
  const [expenses , setExpenses] = useState([]);
  const [clientList, setClientList] = useState("");  

  const [expenseName , setExpenseName] = useState("");
  const [expenseDescription , setExpenseDescription ] = useState("");
  const [expenseValue , setExpenseValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allPages, setAllPages] = useState([]);
  const [editTask , setEditTasks] = useState({});
  const [visible , setVisible] = useState(3);
  const slice = tasksList.slice( 0 , visible);
  const showMoreItems = () => {
    setVisible( visible + visible )
  };
  let { id } = useParams();

  Modal.setAppElement('#root');




  useEffect(() => {
    axios.post("/getproject",{ id: id }).then((res) => {
      if (res.data) {
        setProjectProfile(res.data);
        getClient(id);
        getUser(id);
        getUserImage(id);
      }
    });
  },[]);
  function getClient(id){
    axios.get(`/check/getclient/${id}`).then( (res)=>{
      if(res.data){
        setClientList(res.data);
      } 
    })
  }
  function getUser(id){
    axios.get(`/check/getUser/${id}`).then( (res)=>{
      if(res.data){
        setUserList(res.data);
      } 
    })
  }
  function getUserImage(id){
    axios.get(`/getUserImage/${id}`).then( (res)=>{
      if(res.data){
        setUserImage(res.data);
      }else {
        alert("error")
      }
    })
  }
   useEffect( () => {
    axios.get("/getTasks").then((res) => {
      if (res.data === "ERROR") {
        alert("error !");
      } else {
        setTasksList(res.data);
      }})
   } , []);

  useEffect(() => {
    axios.get("/getmembers").then((res) => {
      if (res.data){
        var options = []
        res.data.map((element) => {
            var fullName = element.firstName + " " + element.lastName;
            options.push({value: element._id, label: fullName} );
        })
        setMembersList(options);
      }
    });
  }, []);


    function getExpenses(page) {
      axios
        .post("/getExpenses", { currentPage: page})
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
    useEffect(() => {
      getExpenses(currentPage);
    }, []);
  const customStyles = {
    control: (provided , state) => ({
      ...provided,
      border: state.isFocused ? 0 : 0,
      paddingLeft:'4px',
      border: ' 1px solid rgb(212, 211, 211) ',
      fontSize: '10',
      background: 'rgba(224, 222, 222, 0.2)',
      opacity:1,
      outline: 'none',
      width: '82%',
      borderRadius: '35px',
      height: '48px',
      boxShadow: state.isFocused ? null : null,
    })
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
            axios.get("/getTasks").then((res) => {
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
          axios.post("/getExpenses").then((res) => {
            setExpenses(res.data.expenses);
          });  
        }
      })
}

const updateProject = (id) => {
  axios.put("/updateproject", { end: end , state:state, id:id })
  .then((res) => {
    if (res.data === "ERROR") {
      alert("An error occured");
    } else {
          setProjectProfile(res.data);
        }
      });
  };
  const updateTask = (id) => {
    axios.put(`/updateTask/${id}`, {priorityTask:priorityTask,stateTask:stateTask, id:id })
    .then((res) => {
      if (res.data === "ERROR") {
        alert("An error occured");
      } else {
        setTasksList(res.data);
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
      alert("error")
      }else if(res.data === "SUCCESS"){
        swal({
          title: "SUCCESS",
          text: "Added succesfully!",
          icon: "success",
          button: "OK!",
        });
  }
        success();
})}

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
      alert("error")
    }else if(res.data === "SUCCESS"){
      swal({
        title: "SUCCESS",
        text: "Added succesfully!",
        icon: "success",
        button: "OK!",
      });
}})}

const Pop = () => {
  setModalIsOpen(true)}

const ExpensePop = () => {
  setExpenseIsOpen(true)}

const deletePopExpense = () => {
  setDeleteExpense(true)}

const deletePopUp = () => {
      setDeleteTask(true)}

const editTasks = () =>{
  setEdit(true) 
}
const handleChange = (e) => {
  setpriorityTask(e.target.value);
}

return (
    <>
      <form className={styles.Details}>
      <p>Nom du projet: &nbsp; &nbsp; &nbsp;<span className={styles.h4}>{projectProfile.name} </span></p>
      <p>Assigné par: &nbsp; &nbsp; &nbsp;<span className={styles.h4}><img src={user.image}  className={styles.profile}/>{user.firstName} {user.lastName}</span></p>
      <p>Assigné pour :&nbsp; &nbsp; &nbsp; <span className={styles.h4}><img src={userImage} />  {userList.map( (element) =>{ return(<>{element},   </>)})}</span></p>
      <p>Etat: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span className={styles.h4} > {projectProfile.state}</span></p>  
      <p>Client : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span  className={styles.h4}> {clientList}</span></p>   
      <p>Description : &nbsp; &nbsp; &nbsp; &nbsp;<span className={styles.h4}>{projectProfile.description}</span></p>
      <p> Débute à : &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;<span className={styles.h4}> {projectProfile.start}</span></p>
      <p>Termine à : </p>
      <input type="date" defaultValue={projectProfile.end} onChange= { (e) => { setEnd(e.target.value)}}  className={styles.endDate}/> 
      <br />
      <br />
      <Select 
      className={styles.editState}
          placeholder="Modifier l'état"
          id="state"
          styles={customStyles}
          options={options} 
          defaultValue={projectProfile.state}
          onChange={ (e) => { setStateProject(e.label)}}
      />
      <br />
      <br />
      <button className="defaultBtn" onClick={() => {updateProject(projectProfile._id)}}>SAVE</button>
    </form>
    <div className={styles.details}>
        <h2>Tâches <FontAwesomeIcon icon= {solid("plus")} color = "black" className={styles.add_icon} onClick={() => {setPopProject(projectProfile) ;  Pop()}} /></h2>
        <Modal isOpen={modalIsOpen} onRequestClose = {() => setModalIsOpen(false)} className={styles.modelEdit}
                                              shouldCloseOnOverlayClick={true}
                                              style = {
                                                {  
                                                  overlay : {
                                                  backgroundColor : '#00000030'
                                                  }
                                               }
                                               }  
                                              >
            <form onSubmit={addtask}>
                <h2 align="center">Ajouter tâche</h2>
                <br />
                <TextField id="name" 
                      type="text"
                      label = " Nom "
                      className={styles.FieldInput}
                      variant="outlined"
                      onChange={ (e) => { setNameTask(e.target.value)}}
                       
                    />
                <br />
                <br />
                <TextField id="description" 
                      type="text"
                      label = " Description "
                      className={styles.FieldInput}
                      variant="outlined"
                      onChange={ (e) => { setDescriptionTask(e.target.value)}}
                       
                    />
                <br />
                <br />
                <div className={styles.FieldInput}>
                    <Select 
                          placeholder="Selectionner l'état"
                          id="state"
                          onChange={ (e) => { setStateTask(e.label)}}
                          styles={customStyles}
                          options={options} 
                          
                    />
                </div>
                  <h4><label>Priorité: </label><br /><br />
                  <label>Urgent: </label><input  type="checkbox" value="urgent" onChange= { (event) => {handleChange(event) }} /></h4>
                <button className={styles.Btn} >Enregistrer</button>
            </form>
        </Modal>
        <br/>
        {slice.map( (task , index) => {
          return (
           <>
            <div className={styles.Bloc} key= {index}>
               <h4>Nom du tâche : {task.nameTask} </h4>
               <h4>Description : {task.descriptionTask} </h4>
               <h4>Etat : {task.stateTask} </h4>
               <h4>Priorité : {task.priorityTask} </h4>
               <input className={styles.BtnTask} type="button" value="Supprimer" onClick={()=> { setDelete(task) ; deletePopUp() }} />
               <Link to={`/editTask/${task._id}`}><input className={styles.BtnTask} type="button" value="Modifier" /></Link>
               </div>
           </>
          )
        })}
      <br />
      <br />
      <br />
      <br />
        <button onClick={showMoreItems} className={styles.readMore}> Voir tous les tâches </button>
            <Modal isOpen={deleteTask} onRequestClose = {() => setDeleteTask(false)} className={styles.deleteItem}
                                              shouldCloseOnOverlayClick={true} style = {
                                                {  
                                                  overlay : {
                                                    backgroundColor : '#00000020'
                                                  }
                                               }
                                               }>
                    <p className={styles.ModalParagraph}>Voulez-vous supprimer {taskDelete.nameTask} ?</p>
                    <br />
                    <div className={styles.btn_section}>
                    <input type="button" value="Annuler" onClick={() => setDeleteTask(false)} className= {styles.white_btn} />
                     <input type="button"  value="Confirmer" onClick={()=> {setDeleteTask(false) ; deletetask(taskDelete._id)}} className= {styles.confirm_btn}/>
                    </div>
            </Modal>   
  <br />
  <br />
  <br />
  </div>
        <br/>
        <div className={styles.details}>
        <h2>Frais <FontAwesomeIcon icon= {solid("plus")} color = "black" className={styles.add_iconExp} onClick={() => {setPopProject(projectProfile) ;  ExpensePop()}} /></h2>
        <Modal isOpen={expenseIsOpen} onRequestClose = {() => setExpenseIsOpen(false)} 
                                              shouldCloseOnOverlayClick={true} className={styles.modelEdit}
                                              style = {
                                                {  
                                                  overlay : {
                                                    backgroundColor : '#00000030'
                                                  },
                                                  
                                               }
                                               }  
                                              >
            <form onSubmit={addexpense}>
                <h2 align="center">Ajouter frais </h2>
                <br />
                <br />
                <TextField id="name" 
                      type="text"
                      label = " Nom "
                      className={styles.FieldInput}
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
                      className={styles.FieldInput}
                      variant="outlined"
                      onChange={(e)=>{setExpenseDescription(e.target.value)}} 
                      required 
                    />
                <br />
                <br />
                <TextField id="value"
                      type="number" 
                      label = " Valeur "
                      className={styles.FieldInput}
                      variant="outlined"
                      onChange={(e)=>{setExpenseValue(e.target.value)}} 
                      required 
                    />
                <br />
                <br />
                <br />
                <button className={styles.Btn}>Enregistrer</button>
            </form>
        </Modal>
        <br/>
        {expenses.map( (expense) => {
          return (
           <>
            <div className={styles.Bloc}>
               <h4>Nom : {expense.expenseName} </h4>
               <h4>Description : {expense.expenseDescription} </h4>
               <h4>Valeur : {expense.expenseValue} </h4>
               <input className={styles.BtnTask} type="button" value="Supprimer" onClick={()=> { setexpenseDelete(expense) ;  deletePopExpense() }} />
               <Link to={`/editExpense/${expense._id}`}><input className={styles.BtnTask} type="button" value="Modifier"  /></Link>
            <Modal isOpen={deleteExpenses} onRequestClose = {() => setDeleteExpense(false)} className={styles.deleteItem}
                                              shouldCloseOnOverlayClick={true} style = {
                                                {  
                                                  overlay : {
                                                    backgroundColor : '#00000020'
                                                  }
                                               }
                                               }>
                    <p className={styles.ModalParagraph}>Voulez-vous supprimer { expenseDelete.expenseName} ? <br/></p>
                    <div className={styles.btn_section}>
                    <input type="button" value="ANNULER" className= {styles.white_btn} onClick={() => setDeleteExpense(false)} />
                    <input type="button"  value="CONFIRMER" className= {styles.confirm_btn}  onClick={()=> {setDeleteExpense(false) ; deleteExpense(expenseDelete._id)}}/>
                    </div>
            </Modal>
             </div>
           </>
          )
        })}
        <br />
  <br />
  <br />
        <div className={styles.paginationContainer}>
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