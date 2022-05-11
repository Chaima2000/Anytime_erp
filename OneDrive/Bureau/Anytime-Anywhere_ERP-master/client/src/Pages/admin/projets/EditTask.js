import React , {useState ,  useEffect} from 'react';
import axios from 'axios';
import Select  from 'react-select';
import { useParams } from "react-router-dom";
import styles from '../../../Css/Task.module.css';
function EditTask() {
    const [tasks, setTasks]= useState([]);
    const [stateTask,setStateTask]= useState("");

    let { id } = useParams();
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
    useEffect(() => {
        axios.post("/getTask",{ id: id }).then((res) => {
          if (res.data) {
            setTasks(res.data);
          }
        });
      },[]);
      //State options //
  const options = [
    { value: 'planning', label: 'planning' },
    { value: 'in_progress', label: 'in progress' },
    { value: 'closed', label: 'closed' }
  ]
 
  const updateTask = (id) => {
    axios.put(`/updateTask/${id}`, {stateTask:stateTask, id:id })
    .then((res) => {
      if (res.data === "ERROR") {
        alert("An error occured");
      } else {
        setTasks(res.data);
    } 
    })
    }
  return (
    <>
    <form className={styles.bloc}>
    <h4>Nom du tâche :  {tasks.nameTask} </h4>
    <h4>Description :  {tasks.nameTask} </h4>
    <h4>Priorité: {tasks.priorityTask}</h4>
    <h4>Etat du tâche : {tasks.stateTask}</h4>
    <br />
    <Select 
      className={styles.editState}
          name="stateTask"
          styles={customStyles}
          placeholder="Modifier l'état du tâche"
          options={options}  
          onChange={ (e) => { setStateTask(e.label)}}
      />
      <br /><br />
      <button onClick={()=>{updateTask(tasks._id)}} className="defaultBtn">Save</button>
    </form>
    </>
  )
}

export default EditTask