import axios from 'axios';
import React, { useState , useEffect } from 'react';
import styles from '../../../Css/Projects.module.css';
import Styles from "../../../Css/Users.module.css";
import Modal from 'react-modal';
import { Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
function Projects(props) {
  const [projectList , setprojectList] = useState([]);  
  const [disable , setDisable] = useState (false);
  const [DeleteProject  , setDeleteProject] = useState({});
  const [deleteItem,setDeleteItem] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [waiting, setWaiting] = useState(true);
  const [searchTerm , setSearchTerm]= useState("");
  const [allPages, setAllPages] = useState([]);
  const[ EditProject, setEditProject] = useState([]);
  const [editItem , setEdit] = useState(false);
  const [end , setEnd] = useState("");
  let { id } = useParams();
  var i=0;

  Modal.setAppElement('#root')
  
  function getProjects(page) {
    axios
      .post("/getprojects", { currentPage: page, searchTerm: searchTerm })
      .then((res) => {
        if (res.data === "ERROR") {
          alert("error !");
        } else {
          setWaiting(false);
          setprojectList(res.data.projects);
          setAllPages(res.data.allPages);
         }
      });
  }
  useEffect(() => {
    getProjects(currentPage);
  }, []);
  function deleteProject(id) {
    axios.delete(`/deleteproject/${id}`).then((res) => {
      if (res.data === "ERROR") {
        alert("An error occured");
      } else {
            axios.post("/getprojects").then((res) => {
              setprojectList(res.data.projects);
            });  
          }
        })
      }
  function resetSearch() {
        document.getElementById("searchField").value = "";
        axios.post("/getprojects").then((res) => {
          if (res.data === "ERROR") {
            alert("error !");
          } else {
            setprojectList(res.data.projects);
            setAllPages(res.data.allPages);
          }
        });
  }
  

  const Disable = () => {
    setDisable(true);
  }
  const Delete = () => {
      setDeleteItem(true);
  }
  const Edit = () => {
    setEdit(true);
}
return (
    <>
    {waiting ? (
    <div className="row">
            <FontAwesomeIcon icon={solid("spinner")} size={"3x"} spin />
    </div>)
          :(
            <>
    <div className={styles.Boss}>
    <br />
    <form 
        onSubmit={(e) => {
              document.getElementById("searchField").disabled = true;
              document.getElementById("resetBtn").hidden = false;
              document.getElementById("searchBtn").hidden = true;
              e.preventDefault();
              getProjects();
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
                  placeholder="Nom du projet ..."
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
    <br /><br />
        {projectList.map ( (project)  => {
          return(
          <>
            <div className={styles.Block}>
              <div className={styles.underBlock}>
                <p>Projet {i=i+1}:</p><br/>
                <span>{project.name}</span>
              </div>
              <br /><hr /><br/>
              <div className={styles.write}>
                <p>Débute à : {project.start}</p>
                <p>Termine à :{project.end}</p>
                <p>Etat: {project.state}</p>
              </div>
              <div className={styles.icons}>
              <Tippy content='Voir'>
                <Link to={`/project/details/${project._id}`}><span><FontAwesomeIcon icon={solid("file")} size="lg" color="#367588"/></span></Link>
              </Tippy>
              <Tippy content='supprimer'>
                <span onClick = {() => {setDeleteProject(project) ; Delete()}}><FontAwesomeIcon icon={solid("trash")} size="lg" color="#cd5c5c" /></span>
              </Tippy>
              <Tippy content="modifier">
                <span onClick={()=>{setEditProject(project); Edit()}}><FontAwesomeIcon icon={solid("edit")} size="lg" color="blue" /></span>
              </Tippy>
              <Tippy content="fermer">
                <span><FontAwesomeIcon icon={solid("lock")} size="lg" color="#1a1a1a"/></span>
                </Tippy>
              <Modal isOpen={deleteItem} onRequestClose = {() => setDeleteItem(false)}
                                              shouldCloseOnOverlayClick={true} style = {
                                                {  
                                                  overlay : {
                                                    backgroundColor : '#00000020'
                                                  },
                                                  content:{
                                                    position:'relative',
                                                    left: '30%',
                                                    top:'20%',
                                                    width: '37%',
                                                    borderRadius: '15px'
                                                  }
                                              }
                                              }>
                    <h5  className={styles.ModalParagraph}>Voulez-vous supprimer {DeleteProject.name} ? <br/></h5>
                    <div className={styles.btn_section}>
                      <input type="button"  value="ANNULER"  className= {styles.white_btn}   onClick= {() => setDeleteItem(false)} />
                      <input type="button"  value="CONFIRMER" className= {styles.confirm_btn}  onClick={()=> {setDeleteItem(false) ; deleteProject(DeleteProject._id)}}/>
                    </div>
              </Modal>
              <Modal isOpen={editItem} onRequestClose = {() => setEdit(false)}
                                              shouldCloseOnOverlayClick={true} style = {
                                                {  
                                                  overlay : {
                                                    backgroundColor : '#00000020'
                                                  },
                                                  content: {
                                                    padding:'25px',
                                                    position: 'relative',
                                                    top:'25%',
                                                    left: '27%',
                                                    width: '50%',
                                                    borderRadius:'15px',
                                                    fontSize: '20px',
                                                  }
                                              }
                                              }>
                   Projet: <h3 align="center" style={ {color:"rgb(187, 75, 142)" , textTransform: "uppercase" , fontWeight: "bold"}}>{project.name}</h3><br/>
                   <p>Débute à :{EditProject.start}</p>
                   <p>Termine à: &nbsp;&nbsp; <input  defaultValue={EditProject.end} type="date" className={styles.FormInput} onChange={(e) =>{setEnd(e.target.value)}}/> </p>
                   <p>Etat: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select defaultValue={EditProject.state} className={styles.FormInput}>
                              <option>En cours</option>
                              <option>En pause</option>
                              <option>Finis</option>
                            </select>
                   </p> 
                    <div className={styles.btn_section}>
                      <input type="button"  value="ANNULER"  className= {styles.white_btn}   onClick= {() => setDeleteItem(false)} />
                      <input type="button"  value="CONFIRMER" className= {styles.confirm_btn}  onClick={()=> {setDeleteItem(false) ; deleteProject(EditProject._id)}}/>
                    </div>
              </Modal>
              </div>
            </div>
          </>
            );
           })}
    </div>
    <div className="paginationContainer">
      {allPages.map((page) => {
        if (page === currentPage) {
          return (
            <div key={page} onClick={() => { setCurrentPage(page); getProjects(page);}} className="activePagination">
              {page}
            </div>
          );
          } else {
                  return (
                    <div key={page} onClick={() => { setCurrentPage(page); getProjects(page);}} className="pagination">
                      {page}
                    </div>
                  )}
      })}
    </div>
    </>
    )}
    
        
    </>
  )
}

export default Projects;