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

function Projects(props) {
  const [membersList , setMembersList] = useState([]);
  const [projectList , setprojectList] = useState([]);
  const [disabled , setDisabled] = useState(false);
  const [enable , setEnable] = useState(false);
  const [deleteItem,setDeleteItem] = useState(false);
  const [currentPage , setCurrentPage] = useState(1);
  const [searchItem , setSearchItem]= useState("");
  const [postsPerPage] = useState(6);
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

 /****************************************************************************** */
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
 /****************************************************************************** */
    const ProjectsPosts = ({projectList}) => { 
      return (
          <>
       <div className={styles.bloc_section}>
       <Link to={`/projects/add`}><input type="button" value="Add" className={styles.addProject_Btn} /> </Link><br/><br/>  
              {projectList.filter((val) => {
                if(searchItem === "") {
                  return val ;
                }else if ( val.name.toLowerCase().includes(searchItem.toLowerCase())){
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
                 <Link to={`/project/addTask/${project._id}`}><input type="button" value="Show" className={styles.input} /></Link>
                </div>
              </div> 
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
     <input className={styles.search_text}  type="text" onChange={ (e) => { setSearchItem(e.target.value)}} placeholder="Project's name" />
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