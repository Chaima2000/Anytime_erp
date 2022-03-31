import React, { useState ,  useEffect , useContext} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import styles from "../../../Css/Project.module.css";
import Modal from 'react-modal';
import { AppContext } from "../../../Context/AppContext";

function ProjectProfile(props) {
  const [projectProfile, setProjectProfile] = useState({});
  const [membersList , setMembersList] = useState([]);
  const [members , setMembers] = useState([]);
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
  useEffect(() => {
    axios.get("/getmembers").then((res) => {
      if (res.data){
        var options = []
        res.data.map((element) => {
            options.push({value: element.firstName, label: element.firstName} );
        })
        setMembersList(options);
      }
    });
  }, []);
  const Pop = () => {
    setModalIsOpen(true);
   }
  return (
    <>
      <h4>Name : {projectProfile.name}</h4>
      <h4>Start at : {projectProfile.start}</h4>
      <h4>End at : <input type="date" value={projectProfile.end}/></h4>
      <h4>State : {projectProfile.state}</h4>   
      <h4>Description : {projectProfile.description}</h4>
      {/* <h3>Files : {projectProfile.file}</h3> */}
      <input type="button" value="Add task" className={styles.input}  onClick={() => {setPopProject(projectProfile) ;  Pop()}} />
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
                                              <input type="text" placeholder='Task name ' className={styles.input_projectProfile} /> <br/><br/>
                                              <input type="text" placeholder='Task description ' className={styles.input_projectProfile} />
                                              <h4>Assigned by : {user.firstName}</h4>
                                              <h4>Assigned to : {projectProfile.members}</h4>
                                              <h4>State :</h4> <select className={styles.input_projectProfile}><option>Planning</option><option>In progress</option><option>Closed</option></select><br/><br/>
                                              <textarea placeholder=' Task description' className={styles.input_projectProfile} /><br/><br/>
                                              <label>Priority : </label>
                                              <input  type="number" className={styles.input_projectProfile_priority}/><br/><br/>
                                              <input type="button" className={styles.input_SaveBtn} value="save" />


     </Modal>

     


</>
  )
}

export default ProjectProfile