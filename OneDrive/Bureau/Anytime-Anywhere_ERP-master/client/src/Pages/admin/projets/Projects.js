import axios from 'axios';
import React, { useState , useEffect } from 'react';
import styles from '../../../Css/Project.module.css';
import Modal from 'react-modal';
import { Link , withRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import ReactPaginate from  "react-paginate";
function Projects(props) {
  const [projectList , setprojectList] = useState([]); 
  const [currentPage , setcurrentPage] = useState(1);
  const [itemsPerPage , setitemsPerPage] = useState(3);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  //
  const [disable , setDisable] = useState (false);
  const [popProject  , setPopProject] = useState({});
  const [deleteItem,setDeleteItem] = useState(false);
  const [searchItem , setSearchItem]= useState("");
  

  
  let { id } = useParams();
  Modal.setAppElement('#root')

  useEffect( () => {
         axios.get("getprojects").then ( (res) => {
          if(res.data) {
            setprojectList(res.data);
          }
       })
  }, []);

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
  const Disable = () => {
    setDisable(true);
  }
  const Delete = () => {
      setDeleteItem(true);
  }

/*pagination*/
const handleClick = (event) => {
  setcurrentPage(Number(event.target.id));
}
const pages = [];
for( let i=1 ; i<= Math.ceil(projectList.length / itemsPerPage); i++) {
  pages.push(i);
}
const indexOfLastItems = currentPage*itemsPerPage;
const indexOfFirstItem = indexOfLastItems - itemsPerPage;
const currentItems = projectList.slice(indexOfFirstItem , indexOfLastItems);
const renderPagesNumbers = pages.map( (number) => {
  if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
  return (
    <li key= {number} id={number} onClick={handleClick} className={currentPage == number ? "active" : null}>
      {number}
    </li>
  );
}else {
return null;
}}
)
const handleNextbtn = () => {
  setcurrentPage(currentPage + 1);

  if (currentPage + 1 > maxPageNumberLimit) {
    setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
    setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
  }
};
const handlePrevbtn = () => {
  setcurrentPage(currentPage - 1);

  if ((currentPage - 1) % pageNumberLimit == 0) {
    setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
  }
};

let pageIncrementBtn = null;
if (pages.length > maxPageNumberLimit) {
  pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
}

let pageDecrementBtn = null;
if (minPageNumberLimit >= 1) {
  pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
}


const renderData = (projectList) => {
  return (
    <>
    <div className={styles.bloc_Section}>
        {projectList.filter((val) => {
          if(searchItem === "") {
            return val ;
          }else if ( val.name.toLowerCase().includes(searchItem.toLowerCase())){
            return val;
          }
        }).map ( (project)  => {
          return(
          <>
          <div className={styles.Bloc}>
            <h4>Project name : {project.name} </h4>
            <h4>Project state : </h4>
          {/*  {project.state.map( (states)=> {
              return (
                <>
                  <h4>{states.state}</h4>
                </>
              )
            })} </h4> */}
            <h4>Project client : {project.client}</h4>
            <Link to={`/project/addTask/${project._id}`}><input type="button" value="View" className={styles.input} /></Link>
            <input type="button" value="Delete" onClick = {() => {setPopProject(project) ; Delete()}} className={styles.input}/>
            <input type="button" value="Close" className={styles.input} onClick={() => {Disable()}} />
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
                    <p className={styles.closeParagraph}>Do you want to delete {popProject.name} ? <br/></p>
                    <div className={styles.btn_section}>
                    <input type="button"  value="Confirm" className={styles.close_Btn}  onClick={()=> {setDeleteItem(false) ; deleteProject(popProject._id)}}/>
                    <input type="button" value="Cancel" className= "transparentBtn" onClick={() => setDeleteItem(false)} />
                    </div>
              </Modal>
          </div>
          </>
          );
          })}
          </div>
          </>
  )
}



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
  </div>
  
  {renderData(currentItems)}
  <ul className={styles.pageNumbers}><li>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage == pages[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPagesNumbers}
        {pageIncrementBtn}

        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
    </>
  )
}

export default Projects