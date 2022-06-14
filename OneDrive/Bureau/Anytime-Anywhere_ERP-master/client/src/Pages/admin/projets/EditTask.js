import React , {useState ,  useEffect} from 'react';
import axios from 'axios';
import Select  from 'react-select';
import Checkbox from '@mui/material/Checkbox';
import { useParams } from "react-router-dom";
import styles from '../../../Css/Task.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Navbar from "../../../components/Navbar";
function EditTask() {
    const [tasks, setTasks]= useState([]);
    const [stateTask,setStateTask]= useState("");
    const[descriptionTask , setDescriptionTask] = useState("");
    const[Urgent , setUrgent] = useState(false);
    let { id } = useParams();
    const customStyles = {
        control: (provided , state) => ({
          ...provided,
          border: state.isFocused ? 0 : 0,
          paddingLeft:'4px',
          border: ' 1px solid rgb(212, 211, 211) ',
          fontSize: '10',
          opacity:1,
          outline: 'none',
          width: '42%',
          borderRadius: '5px',
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
  { value: 'planning', label: 'En planification' },
  { value: 'in_progress', label: 'En cours' },
  { value: 'closed', label: 'Terminé' }
]
  const handleChange = (e) => {
    setUrgent(e.target.checked);
  }
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
    <Navbar/>
    <span className={styles.edit}> <FontAwesomeIcon icon= {solid("edit")} color = "white"/></span>
    <br/><br/>
    <h2 align="center">Modifier la Tâche</h2>
    <form className={styles.bloc}>
    <h4>Nom du tâche :  {tasks.nameTask} </h4>
    <br />
    <Select 
      className={styles.editState}
          name="stateTask"
          styles={customStyles}
          placeholder="Modifier l'état du tâche"
          options={options}  
          onChange={ (e) => { setStateTask(e.label)}}
      />
      <h5>
                <Checkbox
                     id="urgent"
                    onChange={handleChange}
                  />
                Est-elle urgente ?  
                </h5><br />
      <button onClick={()=>{updateTask(tasks._id)}} className="defaultBtn">Save</button>
    </form>
    </>
  )
}

export default EditTask