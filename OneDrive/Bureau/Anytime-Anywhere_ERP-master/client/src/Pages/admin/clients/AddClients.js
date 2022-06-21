import React, { useState } from 'react';
import styles from '../../../Css/Client.module.css';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Navbar from "../../../components/Navbar";

function AddClients(props) {
  const [type , setType] = useState("");
  const [society , setSociety] = useState("");
  const [activity , setActivity] = useState("");
  const [ceo , setCeo] = useState("");
  const [email , setEmail] = useState("");
  const [phone , setPhoneNumber] = useState([ { phone : ""}]);
  const [country , setCountry] = useState("");
  const [city , setCity] = useState("");
  const [zipCode , setZipCode] = useState("");
  const [address , setAddress] = useState("");
  const history = useHistory();
  /***Phone functions ***/
  const handlePhoneChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...phone];
    list[index][name] = value;
    setPhoneNumber(list);
  };
  const handlePhoneRemove = index => {
    const list = [...phone];
    list.splice(index, 1);
    setPhoneNumber(list);
  };
  const handlePhoneAdd = () => {
    setPhoneNumber([...phone, { phone : "" }]);
  };


  const addclient =(e) => {
    e.preventDefault();
    axios.post("/addclient", {
      type: type,
      society: society,
      activity:activity,
      email: email,
      ceo : ceo,
      phone: phone,
      city: city,
      country: country,
      zipCode: zipCode,
      address: address,  
    }).then((res)=>{
      if(res.data === "SUCCESS"){
        history.push("/Clients");
      }else{
        swal({
          title: "ERROR",
          icon: "error",
          button: "OK!",
        });
      }
    }
    )}
 return ( 
   <>
   <Navbar></Navbar>
    <section className={styles.section}>        
      <div className={styles.container}>
          <div className={styles.form }>
          <form onSubmit={addclient}>
          <FontAwesomeIcon icon={solid("plus")} color="white"  className={styles.span}/>   
            <h2 className={styles.h2}>Ajouter un client: </h2>
            <div className={styles.div1}>
              <input className={styles.formInput} type="text" placeholder='Nom' onChange={(e)=>{setSociety(e.target.value)}} name="society" id="society" required /><br />
              <select className={styles.selectInput} name="type" placeholder='Type' id="type" onChange={(e)=>{setType(e.target.value)}} required >
                <option value="particulier">Particulier</option>
                <option value="professionnel">Professionnel </option>
              </select><br />
              <input type="text" placeholder='Activité' className={styles.formInput} name="activity" id="activity" onChange={(e)=>{setActivity(e.target.value)}}   required/> <br /> 
              <input type="email" id="email" placeholder='Email' name="email" className={styles.formInput} onChange={(e)=>{setEmail(e.target.value)}}  required /> <br />
              <input className={styles.formInput} placeholder='Ceo' type="text" name="ceo" id="ceo" onChange={(e)=>{setCeo(e.target.value)}} required /><br />
            </div>
            <div className={styles.div2}>
            <input className={styles.formInput} placeholder='Ville' type="text" name="city" id="city" onChange={(e)=>{setCity(e.target.value)}} required /><br />
            <input className={styles.formInput} placeholder='Pays' type="text" name="country" id="country" onChange={(e)=>{setCountry(e.target.value)}} required /><br />
            <input className={styles.formInput} placeholder='Code postal' type="number" name="zipCode" id="zipCode" onChange={(e)=>{setZipCode(e.target.value)}} required /><br />
            <input className= {styles.formInput} type="text" placeholder='Address' name=" address" id="address" onChange={(e)=>{setAddress(e.target.value)}} required /> <br />
            {phone.map((phoneNumber, index) => {
                          return(
                          <div key={index}>
                              <input className={styles.phoneInput} type="number" placeholder='Numéro du téléphone' name="phone" id="phone"  value={phoneNumber.phone} onChange={e => handlePhoneChange(e, index)} required/>
                              {phone.length !== 1 && <button className={styles.addRemovePhoneBtn} onClick={() => handlePhoneRemove(index)}><FontAwesomeIcon icon={solid("remove")} color = "black"/></button>}
                              {phone.length -1 === index && <button className={styles.addRemovePhoneBtn} onClick={handlePhoneAdd}><FontAwesomeIcon icon={solid("add")} color = "black"/></button>}
                              <br />
                            </div>
                        );})}
            </div>
            <br />
            <br />
              <button className={styles.btn}>Enregistrer</button>
        </form> 
          </div>
        </div>
    </section>
   </>
 )
}

export default AddClients;
