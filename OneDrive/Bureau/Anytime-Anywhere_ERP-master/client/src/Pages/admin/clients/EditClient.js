import React , {useState ,  useEffect} from 'react';
import axios from 'axios';
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
    <Link to="/Clients">
          <FontAwesomeIcon className="navIcon" icon={solid("arrow-left")} />
        </Link>
     <form className={styles.bloc}>
    <h3>Nom du la société :  {client.society} </h3>
    <h3>Type :  {client.type} </h3>
    <h3>Activité: {client.activity}</h3>
    <h3>Email: &nbsp;&nbsp;&nbsp; <FontAwesomeIcon icon={solid("edit")} color = "blue"/> </h3>
    <input placeholder="Modifier l'email" defaultValue={client.email} type="email" className={styles.formInput}onChange={(e)=>{setEmail(e.target.value)}} />
    <h3>CEO: {client.ceo}</h3>
    <h3>Telephone: <span>{client.phone.map((number)=>{
     return( <>{number.phone} , </>)})}</span></h3>
    <h3>Ville: {client.city}</h3>
    <h3>Pays: {client.country}</h3>
    <h3>Addresse: &nbsp;&nbsp;&nbsp; <FontAwesomeIcon icon={solid("edit")} color = "blue"/></h3>
    <input placeholder="Modifier l'addresse" defaultValue={client.address} className={styles.formInput}onChange={(e)=>{setAddress(e.target.value)}} />
    <h3>Code postal:{client.zipCode}</h3>
    <br />
    <button className="defaultBtn" onClick={()=>{updateClient(client._id)}}>Enregistrer</button>
    </form>
    </>
)
}
export default EditClient;