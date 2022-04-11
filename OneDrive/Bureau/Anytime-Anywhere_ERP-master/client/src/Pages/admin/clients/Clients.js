import React , { useState , useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link , withRouter } from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import axios from "axios" ;
import styles from "../../../Css/Client.module.css";
import Styles from "../../../Css/Project.module.css";
import table from "../../../Css/App.css";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';   
import Pagination from './../../../components/Pagination';
toast.configure()

function Clients(props){
  const [clientsList, setClientsList] = useState([]);
  const [currentPage , setcurrentPage] = useState(1);
  const [itemsPerPage , setitemsPerPage] = useState(3);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [searchItem , setSearchItem]= useState("");
  const [postsPerPage] = useState(7);
  const [value , setValue] = useState('');
  const [tableFilter , setTableFilter] =useState([])
        
  useEffect(() => {
      axios.get("getclients").then((res) => {
        if (res.data) {
          setClientsList(res.data);
        }
      })
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
      
/*pagination*/
const handleClick = (event) => {
  setcurrentPage(Number(event.target.id));
}
const pages = [];
for( let i=1 ; i<= Math.ceil(clientsList.length / itemsPerPage); i++) {
  pages.push(i);
}
const indexOfLastItems = currentPage*itemsPerPage;
const indexOfFirstItem = indexOfLastItems - itemsPerPage;
const currentItems = clientsList.slice(indexOfFirstItem , indexOfLastItems);
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


      const ClientsPosts = (clientsList) => { 
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
             {clientsList.filter((val) => {
                  if(searchItem === "") {
                    return val ;
                  }else if ( val.society.toLowerCase().includes(searchItem.toLowerCase())){
                    return val;
                  }
                }).map( (client) => {
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
            </>
      )
      }
 
  //Change page

    return (
    <>
     <h2>Clients 
     <button className={styles.add_Btn}><Link to={`/clients/add`} className={styles.link}><FontAwesomeIcon icon={solid("plus")} color = "rgb(126, 17, 82)"/> Add client </Link></button></h2>
     <div className={styles.search_box}>
     <input className={styles.search_text}  type="text" onChange={ (e) => { setSearchItem(e.target.value)}} placeholder="Client's name" />
     <a className={styles.search_btn} href="#"> 
       <FontAwesomeIcon icon= {solid("search")} color = "black" className={styles.search_icon} />
     </a>
    </div>
    {ClientsPosts(currentItems)}
  <ul className={Styles.pageNumbers}><li>
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
    );
}
export default withRouter( Clients );
