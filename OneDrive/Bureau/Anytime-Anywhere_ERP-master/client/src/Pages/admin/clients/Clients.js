import React , { useState , useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import axios from "axios" ;
import Modal from 'react-modal';
import Navbar from '../../../components/Navbar';
import Styles from "../../../Css/ProjectProfile.module.css";
import styles from "../../../Css/Client.module.css";
import Tooltip from "@material-ui/core/Tooltip";
import img from '../../../uploads/pic4.jpg';
Modal.setAppElement('#root')
function Clients(){
  const [clientsList, setClientsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [waiting, setWaiting] = useState(true);
  const [searchTerm , setSearchTerm]= useState("");
  const [allPages, setAllPages] = useState([]);
  const [DeleteClient , setDeleteClient] = useState({});
  const [ViewClient , setViewClient] = useState({});
  const [viewItem , setViewItem] = useState(false);
  const [editItem , setEditItem] = useState(false);
  const [deleteItem,setDeleteItem] = useState(false);
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

 const Delete = () => {
   setDeleteItem(true)
 }
 const View = () => {
  setViewItem(true)
}
  function deleteClient(id) {
    axios.delete(`/deleteclient/${id}`).then((res) => {
      if (res.data === "ERROR") {
        alert("An error occured");
      } else {
            axios.post("/getclients").then((res) => {
            setClientsList(res.data.clients);
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
     <Navbar />
     <h2 align="center">Liste des clients </h2>
     <Link to={`/clients/add`} className={styles.link_right}><Tooltip title="Consulter le client"><i className={styles.ii}><FontAwesomeIcon icon={solid("circle-arrow-right")} /></i></Tooltip></Link>
     <form onSubmit={(e) => {document.getElementById("searchField").disabled = true;document.getElementById("resetBtn").hidden = false;document.getElementById("searchBtn").hidden = true;e.preventDefault();getClients();setCurrentPage(1);}}
                  className={styles.search_form}>
                  <input id="searchField" required onChange={(e) => {setSearchTerm(e.target.value)}} 
                  className={styles.searchInput}
                  type="text"
                  placeholder="Nom du client ..." />
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
                          className="transparentBtn">
                          <FontAwesomeIcon icon={solid("undo")} size="lg" />
                  </button>
                </form>
    {waiting ? (
          <div className="row">
            <FontAwesomeIcon icon={solid("spinner")} spin size="3x" />
          </div>) : (
    <>
          <br />
          <br />
          <table className={styles.table}>
              <thead>
                <tr>
                    <th> <span className={styles.textThead} >Société </span> </th>
                    <th><span className={styles.textThead}>Activité</span> </th>
                    <th> <span className={styles.textThead} >Email </span> </th>
                  <th> <span className={styles.textThead}> Action </span> </th>
                </tr>
              </thead>
              <tbody>
                {clientsList.map( (client) => {
                  return ( 
                  <tr key = {client._id} className={styles.tr}>
                    <td data-label="Societé">  {client.society} </td>
                    <td data-label="Activité"> {client.activity}</td>
                    <td data-label="Email">{client.email}</td>
                    <td data-label="Action">
                    <Tooltip title="Consulter sa fiche">
                      <span onClick={()=> {setViewClient(client) ; View()}}>
                      <FontAwesomeIcon  icon={solid("file") }  color="#1a9cd4" />
                      </span></Tooltip>&nbsp;&nbsp;&nbsp;
                    <Tooltip title="Modifier"><Link to={`/EditClient/${client._id}`}><FontAwesomeIcon icon={solid("edit")} color = "#0e03a7"/></Link></Tooltip>&nbsp;&nbsp;
                    <Tooltip title="Supprimer"><span onClick={()=> {setDeleteClient(client) ; Delete()}}> <FontAwesomeIcon icon={solid("trash")} color = "#c71585"  /> </span></Tooltip></td>
                   
                   
                    
                    <Modal isOpen={deleteItem} onRequestClose = {() => setDeleteItem(false)} className={styles.deleteItem} 
                                              shouldCloseOnOverlayClick={true} style = {
                                                {  
                                                  overlay : {
                                                    backgroundColor : '#00000010'
                                                  }
                                              }
                                              }>
                        <h5  className={Styles.ModalParagraph}>Voulez-vous supprimer {DeleteClient.society} ? <br/></h5>
                        <div className={Styles.btn_section}>
                          <input type="button"  value="ANNULER"  className= {Styles.white_btn}   onClick= {() => setDeleteItem(false)} />
                          <input type="button"  value="CONFIRMER" className= {Styles.confirm_btn}  onClick={()=> {setDeleteItem(false) ; deleteClient(DeleteClient._id)}}/>
                        </div>
                    </Modal>
                    <Modal isOpen={viewItem} onRequestClose = {() => setViewItem(false)} className={styles.modelView}
                                                      shouldCloseOnOverlayClick={true} style = {
                                                        {  
                                                          overlay : {
                                                            backgroundColor : '#00000010'
                                                          },
                                                          content: {
                                                            width: '1200px',
                                                            borderRadius:'0px',
                                                            marginLeft:'-290px',
                                                            height:'600px',
                                                            padding:'20px',
                                                            marginTop:'-15px'
                                                          }
                                                      }
                    }><p>Nom du client:</p>
                    <h2 style={{fontSize:'28px', textTransform:'uppercase'}}>{ViewClient.society}</h2>
                      <div className={styles.viewClientDetails}>
                          <p>Activité: <span>{ViewClient.activity}</span></p><br/>
                          <p>Type: <span>{ViewClient.type}</span></p><br/>
                          <p>Email :<span> {ViewClient.email}</span> </p><br/>
                          <p>CEO : <span> {ViewClient.ceo}</span> </p><br/>
                          <p>Telephone: <span>{client.phone.map((number)=>{
                              return( <>{number.phone} ,  </>)})}</span></p><br/>
                          <p>Ville : <span>{ViewClient.city}</span></p><br/>
                          <p>Pays : <span>{ViewClient.country}</span></p><br/>
                          <p>Adresse : <span>{ViewClient.address}</span></p><br/>
                          <p>Code postal :<span> {ViewClient.zipCode}</span></p>
                      </div>
                      <div className={styles.imageClientDetails}>
                            <img src={img} />
                      </div>
                    </Modal>
                    </tr>
                )})}
              </tbody>
          </table>
          <div className={styles.paginationContainer}>
            {allPages.map((page) => {
              if (page === currentPage) {
                return (
                  <div
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        getClients(page);
                      }}
                      className="activePagination">
                    {page}
                  </div>)}
              else {
                  return (
                    <div
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        getClients(page);
                      }}
                      className={styles.pagination}>
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
