import React , { useState , useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link , withRouter } from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import axios from "axios" ;
import styles from "../../../Css/Client.module.css";
import Styles from "../../../Css/Users.module.css";
import table from "../../../Css/App.css";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';   
toast.configure()

function Clients(){
  const [clientsList, setClientsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [waiting, setWaiting] = useState(true);
  const [searchTerm , setSearchTerm]= useState("");
  const [allPages, setAllPages] = useState([]);
        
  function getClients(page) {
    axios
      .post("/getclients", { currentPage: page, searchTerm: searchTerm })
      .then((res) => {
        if (res.data === "ERROR") {
          alert("error !");
        } else {
          setWaiting(false);
          setClientsList(res.data.clients);
          setAllPages(res.data.allPages);
        }
      });
  }
  useEffect(() => {
    getClients(currentPage);
  }, []);

  function deleteClient(id) {
    axios.delete(`/deleteclient/${id}`).then((res) => {
      if (res.data === "ERROR") {
        alert("An error occured");
      } else {
            axios.post("/getclients").then((res) => {
            setClientsList(res.data);
            });  
          }
        })
      }
  function resetSearch() {
        document.getElementById("searchField").value = "";
        axios.post("/getclients").then((res) => {
          if (res.data === "ERROR") {
            alert("error !");
          } else {
            setClientsList(res.data.clients);
            setAllPages(res.data.allPages);
          }
        });
  }
  return (
    <>
     <h2>Clients 
     <button className={styles.add_Btn}><Link to={`/clients/add`} className={styles.link}><FontAwesomeIcon icon={solid("plus")} color = "rgb(126, 17, 82)"/> Add client </Link></button></h2>
    <h3 className={styles.searchField}>
    <form 
        onSubmit={(e) => {
              document.getElementById("searchField").disabled = true;
              document.getElementById("resetBtn").hidden = false;
              document.getElementById("searchBtn").hidden = true;
              e.preventDefault();
              getClients();
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
                  placeholder="Client Name ..."
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
    </h3>
    {waiting ? (
          <div className={styles.spinner}>
            <FontAwesomeIcon icon={solid("spinner")} spin size="3x" />
          </div>
        ) : (
<>
    <table className={table}>
             <thead>
               <tr>
                 <th>Name of society </th>
                 <th>Activity </th>
                 <th>Email </th>
                 <th>Action </th>
               </tr>
             </thead>
             <tbody>
                {clientsList.map( (client) => {
                  return ( 
                  <tr key = {client._id}>
                    <td>{client.society}</td>
                    <td>{client.activity}</td>
                    <td>{client.email}</td>
                    <td><Link to={`/client/edit/${client._id}`} ><FontAwesomeIcon icon={solid("edit")} color = "#0e03a7"/></Link>&nbsp;&nbsp;
                    <Link to={`/client/profile/${client._id}`}><FontAwesomeIcon  icon={solid("eye") }  color="#1a9cd4" /></Link>&nbsp;&nbsp;
                    <span onClick={()=> {deleteClient(client._id)}}> <FontAwesomeIcon icon={solid("trash")} color = "#c71585"  /> </span></td> 
                  </tr>
                  )})
                  }
             </tbody>
    </table>
    <div className="paginationContainer">
      {allPages.map((page) => {
        if (page === currentPage) {
          return (
            <div
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        getClients(page);
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
                        getClients(page);
                      }}
                      className="pagination"
                    >
                      {page}
                    </div>
                  )}
      })}
    </div>
    </>
    )}
    </>
    )}
export default Clients;
