import React, { useEffect, useState } from 'react';
import styles from '../../../Css/congé.module.css';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Tooltip from "@material-ui/core/Tooltip";
function Liste() {
    const [congeList,setCongéList]=useState([]);
    const [search,setSearchTerm]=useState("");
    const [allPages, setAllPages] = useState([]);
    const [currentPage,setCurrentPage]=useState();
    var i=0;
    useEffect(()=>{
       axios.post("/getall").then((res)=>{
        if (res.data==="ERROR"){
            console.log(res.data);
        }else{
            setCongéList(res.data)
        }
       }) 
    },[])
    function resetSearch() {
        document.getElementById("searchField").value = "";
        axios.post("/getclients").then((res) => {
          if (res.data === "ERROR") {
            alert("error !");
          } else {
            setCongéList(res.data.clients);
            setAllPages(res.data.allPages);
          }
        });
  }
  return (
    <div className={styles.container}>
    <Link to={"/add/congé"}><Tooltip title="Ajouter un congé"><i className={styles.iii}><FontAwesomeIcon icon={solid("circle-arrow-left")} /></i></Tooltip></Link>
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
     <div className={styles.liste}>
      Congés:
        <table className={styles.table}>
            <thead>
            <tr>
                <th>ID</th>
                <th>Débute à: </th>
                <th>Se termine à:</th>
                <th>Ajouté par: </th>
                <th>Action:</th>
            </tr>
            </thead>
            <tbody>
               {congeList.map((item)=>{
                i=i+1;
                return(
                    <tr>
                        <td data-label="ID">{i}</td>
                        <td data-label="Débute à">{item.debut}</td>
                        <td data-label="Se termine à">{item.end}</td>
                        <td data-label="Ajouté par">{item.email}</td>
                        <td data-label="Action"><Link><FontAwesomeIcon icon={solid("file")} color = "#d2b48c"/></Link> &nbsp;&nbsp; <Link to={'/'}><FontAwesomeIcon icon={solid("edit")} color = "#0e03a7"/></Link>&nbsp;&nbsp;<Link><FontAwesomeIcon icon={solid("trash")} color = "red"/></Link></td>
                    </tr>
                )
                })}
            </tbody>
        </table>
     </div>
    </div>
  )
}

export default Liste