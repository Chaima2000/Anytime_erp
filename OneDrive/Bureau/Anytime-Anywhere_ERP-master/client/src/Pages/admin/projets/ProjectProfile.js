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
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import Checkbox from '@mui/material/Checkbox';
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
  const[Urgent , setUrgent] = useState(false);
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
  const [visible , setVisible] = useState(3);
  const slice = tasksList.slice( 0 , visible);
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
    const dataT = {
      nameTask:nameTask,
      stateTask:stateTask,
      descriptionTask:descriptionTask,
      urgent:Urgent
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
  successTask();
})}
useEffect(() => {
  axios.post("/getproject",{ id: id }).then((res) => {
    if (res.data) {
      setProjectProfile(res.data);
      getClient(id);
      getUser(id);
      // getUserImage(id);
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
    width: '90%',
    borderRadius: '35px',
    height: '48px',
    boxShadow: state.isFocused ? null : null,
  })
}
 //State options //
 const options = [
  { value: 'planning', label: 'planning' },
  { value: 'in_progress', label: 'in progress' },
  { value: 'closed', label: 'closed' }
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
  console.log(e.target.checked)
}
const deletePopExpense = () => {
  setDeleteExpense(true)}
const Pop = () => {
  setModalIsOpen(true)}
  
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
  // function getUserImage(id){
  //   axios.get(`/getUserImage/${id}`).then( (res)=>{
  //     if(res.data){
  //       setUserImage(res.data);
  //     }else {
  //       alert("error")
  //     }
  //   })
  // }
return (
    <>
    {waiting ? (
    <div className="row">
            <FontAwesomeIcon icon={solid("spinner")} size={"3x"} spin />
    </div>)
          :(
            <>
      <form className={styles.Details}>
      <p>Nom du projet: &nbsp; &nbsp; &nbsp;<b>{projectProfile.name} </b></p>
      <p>Assigné par: &nbsp; &nbsp; &nbsp;<b><img src={user.image}  className={styles.profile}/>{user.firstName} {user.lastName}</b></p>
      <p>Assigné pour :&nbsp; &nbsp; &nbsp; <b><img src={userImage} />  {userList.map( (element) =>{ return(<>{element},   </>)})}</b></p>
      <p>Etat: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;<b> {projectProfile.state}</b></p>  
      <p>Client : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<b b> {clientList}</b></p>   
      <p>Description : &nbsp; &nbsp; &nbsp; &nbsp;<b>{projectProfile.description}</b></p>
      <p> Débute à : &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;<b> {projectProfile.start}</b></p>
      <p>Termine à : &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;<b>{projectProfile.end}</b> </p>
      <br />
      <button className="defaultBtn">SAVE</button>
    </form>


    <div className={styles.details}>
        <h2>Tâches 
        <Tippy content='Ajouter une tâche'>
          <p className={styles.add_icon}><FontAwesomeIcon icon= {solid("plus")} color = "white"  onClick={() => {setPopProject(projectProfile) ;  Pop()}} /></p>
        </Tippy> 
        </h2>
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
                <h2 align="center">Ajouter une tâche</h2>
                <br />
                <TextField id="name" 
                      type="text"
                      label = " Nom "
                      style={ {width:"90%"}}
                      variant="outlined"
                      onChange={ (e) => { setNameTask(e.target.value)}}   
                    />
                <br />
                <br />
                <TextField id="description" 
                      type="text"
                      label = " Description "
                      style={ {width:"90%"}}
                      variant="outlined"
                      onChange={ (e) => { setDescriptionTask(e.target.value)}}  
                    />
                <br />
                <br />
                <Select id="state" 
                      type="text"
                      label = " State "
                      styles={customStyles}
                      options={options}
                      variant="outlined"
                      onChange={ (e) => { setStateTask(e.target.value)}}  
                    />
                <br />
                <h3><label>Priorité: </label></h3>
                <h4>Urgent:  
                <Checkbox
                     id="urgent"
                    onChange={handleChange}
                  />
                </h4>
                <button className="defaultBtn" >Enregistrer</button>
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
                  <Link to={`/editTask/${task._id}`}><input className={styles.Btndefault} type="button" value="Modifier" /></Link>
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
            <br />
            <br />
            <br />
  </div>
      <div className={styles.details}>
        <h2>Frais 
        <Tippy content='Ajouter un frais'>
        <p className={styles.add_icon}><FontAwesomeIcon icon= {solid("plus")} color = "white" onClick={() => {setPopProject(projectProfile) ;  ExpensePop()}} /></p>
        </Tippy></h2>
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