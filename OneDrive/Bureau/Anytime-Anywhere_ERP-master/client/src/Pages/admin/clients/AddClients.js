import React, { useState } from 'react';
import styles from '../../../Css/Client.module.css';
import axios from 'axios';
import {toast} from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import 'react-toastify/dist/ReactToastify.css';    
toast.configure()


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

  const success = () => {
    document.getElementById("type").value="";
    document.getElementById("society").value="";
    document.getElementById("activity").value="";
    document.getElementById("ceo").value="";
    document.getElementById("email").value="";
    setPhoneNumber([ { phone : ""}]);
    document.getElementById("city").value="";
    document.getElementById("country").value="";
    document.getElementById("zipCode").value="";
    document.getElementById("address").value="";
  }

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
      if(res.data === "ERROR"){
        toast.error("There's an error" ,{position: toast.POSITION.TOP_CENTER , autoClose : false  });
      }else{
        toast.success('Added Successfully !' , {position:toast.POSITION.TOP_CENTER , autoClose:false });
        success();
      }
    }
    )}

  return (
    <form className={styles.form_section} onSubmit={addclient}>
      <h1>ADD CLIENT</h1>
      <div className={styles.info_section}>
        <select className={styles.Select_Section} name="type" id="type" onChange={(e)=>{setType(e.target.value)}}>
          <option value=""> ------------------------------------   Select your type    ------------------------------------</option>
          <option value="particulier"> Particulier</option>
          <option value="professionnel">Professionnel</option>
        </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input className={styles.Input_Section} type="text" onChange={(e)=>{setSociety(e.target.value)}} name="society" id="society" placeholder='Enter your Society' required/>
        <br/><br/>
        <input className={styles.Input_Section} type="text" name="activity" id="activity" onChange={(e)=>{setActivity(e.target.value)}} placeholder='Enter your activity' required/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input className={styles.Input_Section} type="text" name="ceo" id="ceo" onChange={(e)=>{setCeo(e.target.value)}} placeholder='Enter your CEO ' required /><br/>
        <br/>
        <input className={styles.Input_Section} type="email" name="email" id="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter your email' required/>
        {phone.map((phoneNumber, index) => {
                return(
                <div key={index}>
                     <input className={styles.Input_Section} type="number" name="phone" id="phone" placeholder= "Enter your phone number" value={phoneNumber.phone} onChange={e => handlePhoneChange(e, index)} required/>
                     {phone.length !== 1 && <button className={styles.addRemovePhoneBtn} onClick={() => handlePhoneRemove(index)}><FontAwesomeIcon icon={solid("remove")} color = "black"/></button>}
                     {phone.length -1 === index && <button className={styles.addRemovePhoneBtn} onClick={handlePhoneAdd}><FontAwesomeIcon icon={solid("add")} color = "black"/></button>}
                  </div>
              );})}
        <input className={styles.Input_Section} type="text" name="country" id="country" onChange={(e)=>{setCountry(e.target.value)}} placeholder='Enter your Country' required />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input className={styles.Input_Section} type="text" name="city" id="city" onChange={(e)=>{setCity(e.target.value)}} placeholder='Enter your City' required/>
        <br/><br/>
        <input className={styles.Input_Section} type="number" name="zipCode" id="zipCode" onChange={(e)=>{setZipCode(e.target.value)}} placeholder='Enter your Zip Code' required />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input className={styles.Input_Section} type="text"  name=" address" id="address" onChange={(e)=>{setAddress(e.target.value)}} placeholder='Enter your address' required />
      </div>
      <div className={styles.btn_section}>
        <button className="defaultBtn">Save</button>&nbsp;&nbsp;
      </div>
    </form>
  )
}

export default AddClients;
