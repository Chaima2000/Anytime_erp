import React, { useState ,  useEffect , useContext } from 'react';
import axios from 'axios';
import Select  from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useParams } from "react-router-dom";
import styles from "../../../Css/Project.module.css";
import { AppContext } from "../../../Context/AppContext";
import Modal from 'react-modal';
import Pagination from './../../../components/Pagination';
import {toast} from 'react-toastify';
import { Link , withRouter } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';    
toast.configure();

function Projects() {
  const [name , setName] = useState("");
  const [state , setState] = useState("");
  const [client , setClient] = useState("");
  const [description , setDescription] = useState("");
  const [start , setStart] = useState("");
  const [end , setEnd] = useState("");
  const [membersList , setMembersList] = useState([]);
  const [members , setMembers] = useState([]);
  const [file , setFile] = useState([]);
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
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: '1px dotted pink',
      color: state.selectProps.menuColor,
      padding: 10,
    }),
  
    control: (_, { selectProps: { width }}) => ({
      width:width
    }),
  
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 0ms';
  
      return { ...provided, opacity, transition };
    }
  }
  function convertBase64(file) {
    return new Promise((resolve, reject) => {
     const fileReader = new FileReader();
     fileReader.readAsDataURL(file);
     fileReader.onload = () => {
       resolve(fileReader.result);
     };
     fileReader.onerror = (error) => {
       reject(error);
     };
   });
 }
  const addproject =(e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name",name);
    data.append("state",state);
    data.append("client",client);
    data.append("description",description);
    data.append("start",start);
    data.append("end",end);
    data.append("members",members);
    data.append('file', file);
    const datax = {
      name:name,
      state:state,
      client:client,
      description:description,
      start:start,
      end:end,
      members:members,
      file:file
    }
    axios.post("/addproject", datax).then((res)=>{
      if(res.data === "ERROR"){
        toast.error("There's an error" ,{position: toast.POSITION.TOP_CENTER , autoClose : false  });
      }else if(res.data === "SUCCESS"){
        toast.success('Added Successfully !' , {position:toast.POSITION.TOP_CENTER , autoClose:false });
        success();
        console.log(res.data);
      }
    }
    )}
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
                  <input type="button" value="Show" onClick={() => {setPopProject(project) ;  Pop()}} className={styles.input} />
                  <Link to={`/projectList`} ><input type="button" value="Add" className={styles.input} /> </Link><br/><br/>  
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
                    <form  onSubmit={addproject} encType = "multiple/form-data">
   <h1 className={styles.h1}>ADD PROJECT</h1>

   <div className={styles.left_inputs}>
      <input className={styles.left_input} placeholder="Name" type="text" onChange={(e)=>{setName(e.target.value)}} id="name" name="name" required /><br/><br/><br/>
                <Select 
                    isMulti
                    name="members"
                    id="members"
                    onChange={(e) => {
                      let values =[]
                      e.forEach(element=>{
                        values.push(element.value)
                      })
                    setMembers(values)
              }}
              options={membersList} 
              styles={customStyles}
              className={styles.left_input}
              required
              /><br/><br/>
                 
                
       <textarea className={styles.left_input} placeholder="Description" onChange={(e)=>{setDescription(e.target.value)}} id="description" name="description" required/><br/><br/>
      <label>Start Date : </label><br/><br/>
      <input type="date" className={styles.left_input} onChange={(e)=>{setStart(e.target.value)}} id="start" name="start" required /><br/><br/>
   </div>

   <div className={styles.right_inputs}>
      <input className={styles.right_input} placeholder="Client"  onChange={(e)=>{setClient(e.target.value)}} id="client" name="client" required /><br/><br/><br/>
      <select className = {styles.right_input} id="state" name="state" onChange={(e)=>{setState(e.target.value)}} required>
          <option value="in_progress">In progress</option>
          <option value="planning">Planning</option>
          <option value="closed">Closed</option>
      </select>
      <br/><br/>
      <label className={styles.btn_file} >Upload files
      <input type="file" className={styles.file_input} onChange={async (e) => {
                    var array = [];
                    const files = e.target.files;
                    for (let i = 0; i < files.length; i++) {
                     let file = files.item(i);
                     const base64 = await convertBase64(file);
                     array.push(base64);
                   }
                   setFile(array);
                 }}

 id="file" multiple/></label>  <br/><br/>      
      <label>End Date : </label><br/><br/>
      <input type="date" className={styles.right_input}  onChange={(e)=>{setEnd(e.target.value)}} id="end" name="end" required /><br/><br/>
   </div><br/>

  
   <button className={styles.btn}>SAVE</button> 
   </form>
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