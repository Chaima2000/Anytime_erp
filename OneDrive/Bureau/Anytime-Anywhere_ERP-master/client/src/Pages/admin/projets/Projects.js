import axios from 'axios';
import React, { useState , useEffect } from 'react';
import styles from '../../../Css/Project.module.css';
import Styles from "../../../Css/Users.module.css";
import Modal from 'react-modal';
import { Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  let { id } = useParams();
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
return (
    <>
    <div className={styles.overlay}>
    <h1 align="center">Project's List</h1>
    <section>
        <Link to="/projects/add">
          <FontAwesomeIcon className="navIcon" icon={solid("plus")} />
        </Link>
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
                  placeholder="Project Name ..."
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
      </section>
    
    <br />
  <div className={styles.bloc_Section}>
        {projectList.map ( (project)  => {
          return(
          <>
          <div className={styles.Bloc}>
            <h4>Project name : {project.name} </h4>
            <h4>Project state : {project.state}</h4>
            <h4>Project client : {project.client}</h4>
            <Link to={`/project/details/${project._id}`}><span className={styles.icons}><FontAwesomeIcon icon={solid("file")} color = "#663399" /></span></Link>
            <span onClick = {() => {setDeleteProject(project) ; Delete()}} className={styles.icons}> <FontAwesomeIcon icon={solid("trash")} color = "#9f4576" /> </span>
            <span className={styles.icons} onClick={() => {Disable()}}><FontAwesomeIcon icon={solid("lock")} color = "#808080" /></span>

            <Modal isOpen={deleteItem} onRequestClose = {() => setDeleteItem(false)} className={styles.deleteItem}
                                              shouldCloseOnOverlayClick={true} style = {
                                                {  
                                                  overlay : {
                                                    backgroundColor : '#00000020'
                                                  },
                                              }
                                              }>
                    <h5  className={styles.ModalParagraph}>Do you want to delete {DeleteProject.name} ? <br/></h5>
                    <div className={styles.btn_section}>
                      <input type="button"  value="CANCEL"  className= {styles.white_btn}   onClick= {() => setDeleteItem(false)} />
                      <input type="button"  value="CONFIRM" className= {styles.confirm_btn}  onClick={()=> {setDeleteItem(false) ; deleteProject(DeleteProject._id)}}/>
                    </div>
              </Modal>
          </div>
          </>
          );
          })}
          </div>
    <div className="paginationContainer">
      {allPages.map((page) => {
        if (page === currentPage) {
          return (
            <div
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        getProjects(page);
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
                        getProjects(page);
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

export default Projects