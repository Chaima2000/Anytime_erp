import { useState, useEffect } from "react";
import styles from "../../../Css/Client.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
function ViewClient(props){
    const [client, setClient] = useState({phone:[{phone:""}]});
    let { id } = useParams();
    useEffect(() => {
      axios.post("/getclient",{ id: id }).then((res) => {
        if (res.data) {
          setClient(res.data);
        }
      });
    },[]);
    return ( 
          <>  <form className={styles.form_section}>
                  <h1>CLIENT INFORMATIONS</h1>
                  <hr />
                  <h3>Type: <span>{client.type}</span></h3>
                  <h3>Nom de la société : <span>{client.society}</span></h3>
                  <h3>Activité: <span>{client.activity}</span></h3>
                  <h3>Email :<span> {client.email}</span> </h3>
                  <h3>CEO : <span>{client.ceo}</span> </h3>
                  <h3>Telephone: <span>{client.phone.map((number)=>{
                    return( <>{number.phone} , </>)})}</span></h3>
                  <h3>City : <span>{client.city}</span> </h3>
                  <h3>Country : <span>{client.country}</span> </h3>
                  <h3>zipCode :<span> {client.zipCode}</span> </h3>
                  <h3>adresse : <span>{client.address}</span> </h3>
                  <h3>date de création :  </h3>
              </form>
            <section align="center">History</section>

          </>

    )
}
export default ViewClient;