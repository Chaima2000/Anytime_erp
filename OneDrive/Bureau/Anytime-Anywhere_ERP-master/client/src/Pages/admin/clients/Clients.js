import React , { useState , useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link , withRouter } from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import axios from "axios" ;
import styles from "../../../Css/Client.module.css";
import table from "../../../Css/App.css";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';   
import Pagination from './../../../components/Pagination';
toast.configure()

function Clients(props){
  const [clientsList, setClientsList] = useState([]);
  const [loading , setLoading] = useState(false);
  const [currentPage , setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);
  const [value , setValue] = useState('');
  const [tableFilter , setTableFilter] =useState([])
        
  useEffect(() => {
    const fetchPosts =  () => {
      setLoading(true);
      axios.get("getclients").then((res) => {
        if (res.data) {
          setClientsList(res.data);
          setLoading(false);
        }})
    }
    fetchPosts();
  },[]);

  //delete clients
  function deleteClient(id) {
    axios.delete(`/deleteclient/${id}`).then((res) => {
      if (res.data === "ERROR") {
        alert("An error occured");
      } else {
            axios.get("getclients").then((res) => {
            setClientsList(res.data);
            });  
          }
        })
      }
      function Update(id){
        console.log(id);
        props.history.push("/EditProfile/"+id)
      }
      const ClientsPosts = ({clientsList , loading}) => { 
        if(loading){
            return <h2>loading .. </h2>
        }
      return (
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
             {value.length > 0 ? tableFilter.map( (client) => {
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
              : 
              clientsList.map( (client) => {
              return ( 
               <tr key = {client._id}>
                <td>{client.society}</td>
                <td>{client.activity}</td>
                <td>{client.email}</td>
                <td><Link to={`/client/edit/${client._id}` } onClick={()=>{Update(client._id)}} ><FontAwesomeIcon icon={solid("edit")} color = "#0e03a7"/></Link>&nbsp;&nbsp;
                <Link to={`/client/profile/${client._id}`}><FontAwesomeIcon  icon={solid("eye") }  color="#1a9cd4" /></Link>&nbsp;&nbsp;
                <span onClick={()=> {deleteClient(client._id)}}> <FontAwesomeIcon icon={solid("trash")} color = "#c71585"  /> </span></td> 
               </tr>
              )})
              }
             </tbody>
           </table>
            </>
      )
      }

      const filterData =(e) => {
        if(e.target.value != "") {
          setValue(e.target.value);
          const filterTable =  clientsList.filter(o => Object.keys(o).some(k =>
            String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())));
            setTableFilter([...filterTable]);
        }
        else {
          setValue(e.target.value);
          setClientsList([...clientsList])
        }
      }


// Get Current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = clientsList.slice(indexOfFirstPost , indexOfLastPost);
 
  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
    <>
     <h2>Clients 
     <button className={styles.add_Btn}><Link to={`/clients/add`} className={styles.link}><FontAwesomeIcon icon={solid("plus")} color = "rgb(126, 17, 82)"/> Add client </Link></button></h2>
     <div className={styles.ui_search}>
       <div className="ui icon input">
      <input type="text" placeholder="Search Clients" className={styles.prompt} value={value} onChange={filterData} />
      <FontAwesomeIcon icon= {solid("search")} color = "black" className={styles.search_icon} />
       </div>
     </div><br/><br/><br/>
     <ClientsPosts clientsList={currentPosts} loading = {loading}/>
     <Pagination postsPerPage={postsPerPage} totalPosts={clientsList.length} paginate = {paginate} />
    </>
    );
}
export default withRouter( Clients );
