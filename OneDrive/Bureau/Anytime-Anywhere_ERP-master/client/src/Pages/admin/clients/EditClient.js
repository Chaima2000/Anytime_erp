import React , {useState ,  useEffect} from 'react';
import axios from 'axios';
import Navbar from "../../../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from '../../../Css/Task.module.css';
function EditClient () {
    const [client, setclient]= useState({phone:[{phone:""}]});
    const [address , setAddress] = useState("");
    const [email , setEmail] = useState("");

    let { id } = useParams();
    useEffect(() => {
        axios.post("/getclient",{ id: id }).then((res) => {
          if (res.data) {
            setclient(res.data);
          }
        });
      },[]);
      const updateClient = (id) => {
        axios.put(`/editClient/${id}`, {email:email ,address:address, id:id })
        .then((res) => {
          if (res.data === "ERROR") {
            alert("An error occured");
          } else {
            setclient(res.data);
        } 
        })
        }
return(
    <>
    <Navbar/>
    <Link to="/Clients">
          <FontAwesomeIcon className="navIcon" icon={solid("arrow-left")} />
    </Link>
     <form className={styles.bloc}>
    <p className={styles.p}>Nom du la société :  {client.society} </p>
    <p className={styles.p}>Type
     :  {client.type} </p>
    <p className={styles.p}>Activité: {client.activity}</p>
    <p className={styles.p}>Email: &nbsp;&nbsp;&nbsp; <FontAwesomeIcon icon={solid("edit")} color = "blue"/> </p>
    <input placeholder="Modifier l'email" defaultValue={client.email} type="email" className={styles.formInput}onChange={(e)=>{setEmail(e.target.value)}} />
    <p className={styles.p}>CEO: {client.ceo}</p>
    <p>Telephone: <span>{client.phone.map((number)=>{
     return( <>{number.phone} , </>)})}</span></p>
    <p>Ville: {client.city}</p>
    <p>Pays: {client.country}</p>
    <p>Addresse: &nbsp;&nbsp;&nbsp; <FontAwesomeIcon icon={solid("edit")} color = "blue"/></p>
    <input placeholder="Modifier l'addresse" defaultValue={client.address} className={styles.formInput}onChange={(e)=>{setAddress(e.target.value)}} />
    <p>Code postal:{client.zipCode}</p>
    <br />
    <button className="defaultBtn" onClick={()=>{updateClient(client._id)}}>Enregistrer</button>
    </form>
    </>
)
}
export default EditClient;