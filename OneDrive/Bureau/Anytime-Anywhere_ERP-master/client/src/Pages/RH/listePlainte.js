import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Tooltip from "@material-ui/core/Tooltip";
import styles from '../../Css/Plainte.module.css';
function ListePlainte() {
    const [plainteList,setPlainteList]=useState([]);
    const [search,setSearchTerm]=useState("");
    const [allPages, setAllPages] = useState([]);
    const [currentPage,setCurrentPage]=useState();
    var i=0;
    useEffect(()=>{
        axios.post("/getall").then((res)=>{
         if (res.data==="ERROR"){
             console.log(res.data);
         }else{
            setPlainteList(res.data);
         }
        }) 
     },[])
     function resetSearch() {
        document.getElementById("searchField").value = "";
        axios.post("/getclients").then((res) => {
          if (res.data === "ERROR") {
            alert("error !");
          } else {
            setPlainteList(res.data.clients);
            setAllPages(res.data.allPages);
          }
        });
  }
  return (
    <div className={styles.containerList}>
    <form onSubmit={(e) => {document.getElementById("searchField").disabled = true;document.getElementById("resetBtn").hidden = false;document.getElementById("searchBtn").hidden = true;e.preventDefault();setCurrentPage(1);}}
                  className={styles.search_form}>
                  <input id="searchField" required onChange={(e) => {setSearchTerm(e.target.value)}} 
                  className={styles.searchInput}
                  type="text"
                  placeholder="Nom du client ..." />
                  <button id="searchBtn" className={styles.transparentBtn}>
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
                          className="transparentBtn">
                          <FontAwesomeIcon icon={solid("undo")} size="lg" />
                  </button>
                </form>
    <Link to={`/add/plainte`} className={styles.link_list}><Tooltip title="ajouter une plainte"><i style={{color:'white'}}><FontAwesomeIcon icon={solid("circle-arrow-left")} /></i></Tooltip></Link>
    <div className={styles.liste}>
     <h3>Plaintes: </h3>
     <div className={styles.cards}>
        {plainteList.map((item)=>{
            i=i+1;
            return(
                <>
                <div className={styles.card}> 
                    <h3 style={{color:'green'}}>Plainte n° {i}</h3><br/><br/>
                    <h3> Email: {item.email}</h3><br/><br/>
                    <h3>Description:{item.raison}</h3><br/><br/>
                    <button style={{backgroundColor:'orangered', border:'none', color:'white',borderRadius:'5px', cursor:'pointer'}}>Consulter</button><button style={{backgroundColor:'grey', border:'none', color:'white',borderRadius:'5px', cursor:'pointer'}}>Supprimer</button>
                </div>
                </>
            )
        })}
     </div>
    </div>
    </div>
  )
}

export default ListePlainte