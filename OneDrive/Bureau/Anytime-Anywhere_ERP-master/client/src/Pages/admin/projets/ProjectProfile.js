import React, { useState ,  useEffect , useContext} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styles from "../../../Css/ProjectProfile.module.css";
import Modal from 'react-modal';
import { Link} from "react-router-dom";
import swal from 'sweetalert';
import { AppContext } from "../../../Context/AppContext";
import TextField from '@material-ui/core/TextField'; 
import Tooltip from "@material-ui/core/Tooltip";
import Checkbox from '@mui/material/Checkbox';
import Select  from 'react-select';
import Navbar from '../../../components/Navbar';
import {makeStyles} from '@material-ui/core';
const useStyles= makeStyles({
  field:{
    width:'410px',
    height:'5px',
    marginBottom:'15px'
  }
})
function ProjectProfile(props) {
  const { user } = useContext(AppContext);
  const [image,setImage]=useState([]);
  const [projectProfile, setProjectProfile] = useState([]);
  const [userList,setUserList]= useState([]);
  const [userImage,setUserImage]= useState("");

  /** Tasks states **/
  const [tasksList , setTasksList] = useState([]);
  const project=useParams();
  const[nameTask , setNameTask] = useState("");
  const [stateTask , setStateTask] = useState("");
  const[descriptionTask , setDescriptionTask] = useState("");
  const[Urgent , setUrgent] = useState(false);
  const [waiting, setWaiting] = useState(true);
/** Models's states **/
  const [deleteTask,setDeleteTask] = useState(false);
  const [deleteExpenses,setDeleteExpense] = useState(false);
  const [modalIsOpen , setModalIsOpen] = useState(false);
  const [modalIsEdit,setmodalIsEdit]=useState(false);
  const [expenseIsOpen , setExpenseIsOpen] = useState(false);
  const [popProject , setPopProject] = useState({});
  const[ taskDelete , setDelete] = useState({});
  const[ taskEdit , setEdit] = useState({});
  const[ expenseDelete , setexpenseDelete] = useState({});
/** Expenses's states **/
  const [expenses , setExpenses] = useState([]);
  const [clientList, setClientList] = useState("");  
  const [expenseName , setExpenseName] = useState("");
  const [expenseDescription , setExpenseDescription ] = useState("");
  const [expenseValue , setExpenseValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allPages, setAllPages] = useState([]);
  const [visible , setVisible] = useState(3);
  const slice = tasksList.slice( 0 , visible);
  const classes= useStyles();
  const showMoreItems = () => {
    setVisible( visible + visible )
  };
  let { id } = useParams();
var i=0;
  Modal.setAppElement('#root');
  const addtask =(e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name",nameTask);
    data.append("state",stateTask);
    data.append("description",descriptionTask);
    data.append("urgent",Urgent);
    data.append("project",project);
    const dataT = {
      nameTask:nameTask,
      stateTask:stateTask,
      descriptionTask:descriptionTask,
      urgent:Urgent,
      project: project
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
})}
useEffect(() => {
  axios.post("/getproject",{ id: id }).then((res) => {
    if (res.data) {
      setProjectProfile(res.data);
      getClient(id);
      getUser(id);
    }
  });
},[]);
useEffect(() => {
  axios.get(`/getUserImage/${id}`).then((res) => {
    if (res.data) {
      setImage(res.data)
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
useEffect( () => {
  axios.get("/getTasks").then((res) => {
    if (res.data === "ERROR") {
      alert("error !");
    } else {
      setTasksList(res.data);
    }})
 } , []);
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
    background: 'white',
    opacity:1,
    outline: 'none',
    width: '94%',
    borderRadius: '5px',
    height: '48px',
    boxShadow: state.isFocused ? null : null,
  })
}
 //State options //
 const options = [
  { value: 'planning', label: 'En planification' },
  { value: 'in_progress', label: 'En cours' },
  { value: 'closed', label: 'Terminé' }
]
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
const updateTask = (id) => {
  axios.put(`/updateTask/${id}`, {stateTask:stateTask, id:id })
  .then((res) => {
    if (res.data === "ERROR") {
      alert("An error occured");
    } else {
      setTasksList(res.data);
  } 
  })
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
const addexpense =(e) => {
  e.preventDefault();
  const data = new FormData();
  data.append("name",expenseName);
  data.append("priority",expenseDescription);
  data.append("value",expenseValue);
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
}
successExpense();
})}
const handleChange = (e) => {
  setUrgent(e.target.checked);
}
const deletePopExpense = () => {
  setDeleteExpense(true)}
const Pop = () => {
  setModalIsOpen(true)}
  const EditPop = () => {
    setmodalIsEdit(true)}
const Edit = () => {
  setmodalIsEdit(true)
}
const ExpensePop = () => {
  setExpenseIsOpen(true)}

const deletePopUp = () => {
  setDeleteTask(true)}
const successTask =() => {
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("priority").value = "";
    document.getElementById("state").value = "";
}
const successExpense = () =>{
  document.getElementById("name").value="";
  document.getElementById("description").value="";
  document.getElementById("urgent").value=false;
  document.getElementById("value").value="";
}
 
return (
    <>
    <Navbar></Navbar>
    {waiting ? (
    <div className="row">
            <FontAwesomeIcon icon={solid("spinner")} size={"3x"} spin />
    </div>)
          :(
            <>
      <h2 align="center">Détails du projet:</h2>
      <form className={styles.Details}>
      <p>Nom du projet: &nbsp; &nbsp; &nbsp;<b>{projectProfile.name} </b></p>
      <p>Assigné par: &nbsp; &nbsp; &nbsp;<b><img src={user.image}  className={styles.profile}/>{user.firstName} {user.lastName}</b></p>
      <p>Assigné pour :&nbsp; &nbsp; &nbsp; <b>{image.map( (img) => { return (<><img src={img} className={styles.profile} alt="user" /></>)})}   {userList.map( (element) =>{ return(<>{element},   </>)})}</b></p>
      <p>Etat: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;<b> {projectProfile.state}</b></p>  
      <p>Client : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<b b> {clientList}</b></p>   
      <p>Description : &nbsp; &nbsp; &nbsp; &nbsp;<b>{projectProfile.description}</b></p>
      <p> Débute à : &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;<b> {projectProfile.start}</b></p>
      <p>Termine à : &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;<b>{projectProfile.end}</b> </p>
    </form>


    <div className={styles.details}>
        <h2 align="center">Tâches </h2>
        <Tooltip title="Ajouter une tâche">
          <p className={styles.add_icon}>
              <FontAwesomeIcon icon= {solid("plus")} color = "white"  onClick={() => {setPopProject(projectProfile) ;  Pop()}} />
          </p>
        </Tooltip>
        <Modal isOpen={modalIsOpen} onRequestClose = {() => setModalIsOpen(false)}
                shouldCloseOnOverlayClick={true}
                style = {
                          {  
                            overlay : {
                                        backgroundColor : '#00000030'
                                      },
                            content: {
                                        position:'relative',
                                        borderRadius:'30px',
                                        outline:'none',
                                        top:'13%',
                                        left: '32%',
                                        width: '37%',
                                        height: '405px',
                                      }
                          }
                        }>
            <form onSubmit={addtask}>
                <span className={styles.plus_icon}><FontAwesomeIcon icon= {solid("plus")} color = "white"/></span>
                <br/>
                <h2 align="center">Ajouter une tâche</h2>
                <br />
                <TextField id="name" 
                      type="text"
                      label = " Nom "
                      variant="outlined"
                      onChange={ (e) => { setNameTask(e.target.value)}}
                      className={classes.field}   
                    />
                <br />
                <br />
                <br/>
                <TextField id="description" 
                      type="text"
                      label = " Description "
                      variant="outlined"
                      className={classes.field}  
                      onChange={ (e) => { setDescriptionTask(e.target.value)}}  
                    />
                <br />
                <br />
                <br/>
                <Select id="state" 
                type="text"
                      placeholder="Sélectionner l état"
                      styles={customStyles}
                      variant="outlined"
                      onChange={ (e) => setStateTask(e.value)}  
                      options={options}
                    />
                <h5>
                <Checkbox
                     id="urgent"
                    onChange={handleChange}
                  />
                Est-il urgent ?  
                </h5>
                <button className={styles.defaultBtn} >Enregistrer</button>
            </form>
        </Modal>
        <br/>
      
        {slice.map( (task , index) => {
          return (
           <>
            <div className={styles.Bloc} key= {index}>
              <div className={styles.content}>
              <h4>Nom du tâche :  {task.nameTask} </h4>
              <h4>  Etat : {task.stateTask} </h4>
              <h4>  Priorité : {task.priorityTask} &nbsp; &nbsp; &nbsp;<FontAwesomeIcon icon= {solid("flag")} color="#a9a9a9" size="lg" /></h4>
                  <input className={styles.btnView}  type="button" value="Afficher" />
                  <input className={styles.Btndefault} type="button" value="Modifier" onClick={()=> { setEdit(task) ; EditPop() }} /> 
                  <input className={styles.BtnTransparent} type="button" value="Supprimer" onClick={()=> { setDelete(task) ; deletePopUp() }} />
              </div>
            </div>
           </>
          )
        })}
        <br />
        <br />
        <br />
        <br />
        <button onClick={showMoreItems} className="btn"> Voir tous les tâches </button>
            <Modal isOpen={deleteTask} onRequestClose = {() => setDeleteTask(false)} 
                                              shouldCloseOnOverlayClick={true} style = {
                                                {  
                                                  overlay : {
                                                    backgroundColor : '#00000020'
                                                  },
                                                  content: {
                                                    position:'relative',
                                                    borderRadius:'30px',
                                                    outline:'none',
                                                    fontSize: '20px',
                                                    top:'25%',
                                                    left: '32%',
                                                    width: '32%',
                                                    height: '205px',
                                                    textAlign: 'center'
                                                  }
                                               }
                                               }>
                    <b className={styles.ModalParagraph}>Voulez-vous supprimer {taskDelete.nameTask} ?</b>
                    <br />
                    <div className={styles.btn_section}>
                    <input type="button" value="Annuler" onClick={() => setDeleteTask(false)} className= {styles.white_btn} />
                     <input type="button"  value="Confirmer" onClick={()=> {setDeleteTask(false) ; deletetask(taskDelete._id)}} className= {styles.confirm_btn}/>
                    </div>
            </Modal> 
            <Modal isOpen={modalIsEdit} onRequestClose = {() => setmodalIsEdit(false)}
                shouldCloseOnOverlayClick={true}
                style = {
                          {  
                            overlay : {
                                        backgroundColor : '#00000030'
                                      },
                            content: {
                                        position:'relative',
                                        borderRadius:'30px',
                                        outline:'none',
                                        top:'13%',
                                        left: '32%',
                                        width: '37%',
                                        height: '405px',
                                      }
                          }
                        }>
    <span className={styles.edit}> <FontAwesomeIcon icon= {solid("edit")} color = "white"/></span>
    <br/>
    <h2 align="center">Modifier la Tâche</h2>
    <form className={styles.bloc}>
    <h4>Nom du tâche :  {taskEdit.nameTask} </h4>
    <br />
      <TextField id="description" 
                      type="text"
                      label = " Description "
                      variant="outlined"
                      onChange={ (e) => { setDescriptionTask(e.target.value)}}
                      className={classes.field}   
                    />
      <br />
      <br/>
      <br/>
      <Select 
      className={styles.editState}
          name="stateTask"
          styles={customStyles}
          placeholder="Modifier l'état du tâche"
          options={options}  
          onChange={ (e) => { setStateTask(e.label)}}
      />
      <br/>
                <Checkbox
                     id="urgent"
                    onChange={handleChange}
                  />
                Est-elle urgente ?  
      <button onClick={()=>{updateTask(taskEdit._id)}} className={styles.defaultBtn}>Save</button>
    </form>
        </Modal>
        <br/>
        
            <br />
            <br />
            <br />
  </div>
      <div className={styles.details}>
        <h2>Frais 
        {/* <Tippy content='Ajouter un frais'> */}
        <p className={styles.add_icon_f}><FontAwesomeIcon icon= {solid("plus")} color = "white" onClick={() => {setPopProject(projectProfile) ;  ExpensePop()}} /></p>
       
       </h2>
        <Modal isOpen={expenseIsOpen} onRequestClose = {() => setExpenseIsOpen(false)} 
                                              shouldCloseOnOverlayClick={true}
                                              style = {
                                                {  
                                                  overlay : {
                                                    backgroundColor : '#00000030'
                                                  },
                                                  content : {
                                                    background: '#fff',
                                                    padding:'25px',
                                                    outline:'none',
                                                    width: '35%',
                                                    height: '415px',
                                                    marginLeft: '28%',
                                                    borderRadius:  '12px',
                                                    fontSize: '20px',
                                                    position:'relative',
                                                    top:'15%',
                                                    left:'3%'
                                                  }
                                               }
                                               }  
                                              >
            <form onSubmit={addexpense} style={{textAlign:"center"}}>
                <h3 align="center">Ajouter frais </h3>
                <br />
                <TextField id="name" 
                      type="text"
                      label = " Nom "
                      style={ {width: "90%"}}
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
                      style={ {width: "90%"}}
                      variant="outlined"
                      onChange={(e)=>{setExpenseDescription(e.target.value)}} 
                      required 
                    />
                <br />
                <br />
                <TextField id="value"
                      type="number" 
                      label = " Valeur "
                      style={ {width: "90%"}}
                      variant="outlined"
                      onChange={(e)=>{setExpenseValue(e.target.value)}} 
                      required 
                    />
                <br />
                <br />
                <button className="defaultBtn">Enregistrer</button>
            </form>
        </Modal>
        <br/>
        {expenses.map( (expense , index) => {
          return (
           <>
            <div className={styles.Bloc} key={index}>
               <h4>Nom : {expense.expenseName} </h4>
               <h4>Description : {expense.expenseDescription} </h4>
               <h4>Valeur : {expense.expenseValue} </h4>
               <Link to={`/editExpense/${expense._id}`}><input className={styles.Btndefault} type="button" value="Modifier"  /></Link>
               <input className={styles.BtnTransparent} type="button" value="Supprimer" onClick={()=> { setexpenseDelete(expense) ;  deletePopExpense() }} />
            <Modal isOpen={deleteExpenses} onRequestClose = {() => setDeleteExpense(false)}
                                              shouldCloseOnOverlayClick={true} style = {
                                                {  
                                                  overlay : {
                                                    backgroundColor : '#00000020'
                                                  },
                                                  content: {
                                                    position:'relative',
                                                    borderRadius:'30px',
                                                    outline:'none',
                                                    fontSize: '20px',
                                                    top:'25%',
                                                    left: '32%',
                                                    width: '32%',
                                                    height: '205px',
                                                    textAlign: 'center'
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
    <div className="paginationContainer">
      {allPages.map((page) => {
        if (page === currentPage) {
          return (
            <div key={page} onClick={() => { setCurrentPage(page); getExpenses(page);}} className="activePagination">
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
    </>)}
    </>)
}

export default ProjectProfile