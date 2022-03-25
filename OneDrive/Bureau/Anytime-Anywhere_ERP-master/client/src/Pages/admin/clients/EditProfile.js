import { useState, useEffect } from "react";
import styles from '../../../Css/Client.module.css';
import {defaultBtn ,transparentBtn} from '../../../Css/App.css';
import axios from 'axios';
import {toast} from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import 'react-toastify/dist/ReactToastify.css';    
import { useParams } from "react-router-dom";
toast.configure()


function EditClient(props) {
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
  const [client, setClients] = useState({phone:[{phone:""}]});

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

  let { id } = useParams();
  useEffect(() => {
    axios.get("editclient",{ id: id }).then((res) => {
      if (res.data) {
        setClients(res.data);
      }
    }).catch(err => console.error(err));
  },[]);



  const success = () => {
    document.getElementById("type").value="";
    document.getElementById("society").value="";
    document.getElementById("activity").value="";
    document.getElementById("ceo").value="";
    document.getElementById("email").value="";
    document.getElementById("phone").value= "";
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
      <hr/>
      <div className={styles.info_section}>
      <label>Select your Type :</label><br/><br/>
        <select className={styles.Select_Section} name="type" id="type" onChange={(e)=>{setType(e.target.value)}} value={client.type}>
          <option value="particulier"> Particulier</option>
          <option value="professionnel">Professionnel</option>
        </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input className={styles.Input_Section} type="text" onChange={(e)=>{setSociety(e.target.value)}} name="society" id="society" value={client.society} placeholder='Enter your Society' required/>
        <br/><br/>
        <input className={styles.Input_Section} type="text" name="activity" id="activity" onChange={(e)=>{setActivity(e.target.value)}} value={client.activity} placeholder='Enter your activity' required/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input className={styles.Input_Section} type="text" name="ceo" id="ceo" onChange={(e)=>{setCeo(e.target.value)}} value={client.ceo} placeholder='Enter your CEO ' required />
        <br/>
        <input className={styles.EmailSection} type="email" name="email" id="email" onChange={(e)=>{setEmail(e.target.value)}} value={client.email} placeholder='Enter your email' required/><br/><br/>
        <input className={styles.Input_Section} type="text" name="country" id="country" onChange={(e)=>{setCountry(e.target.value)}} value={client.country} placeholder='Enter your Country' required />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input className={styles.Input_Section} type="text" name="city" id="city" onChange={(e)=>{setCity(e.target.value)}} value={client.city} placeholder='Enter your City' required/>
        <br/><br/>
        <input className={styles.Input_Section} type="number" name="zipCode" id="zipCode" onChange={(e)=>{setZipCode(e.target.value)}} value={client.zipCode}  placeholder='Enter your Zip Code' required />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input className={styles.Input_Section} type="text"  name=" address" id="address" onChange={(e)=>{setAddress(e.target.value)}} value={client.address} placeholder='Enter your address' required />
        {phone.map((phoneNumber, index) => {
                return(
                <div key={index}>
                     <input className={styles.PhoneSection} type="number" name="phone" id="phone" placeholder= "Enter your phone number" value={phoneNumber.phone} onChange={e => handlePhoneChange(e, index)} required/>
                     {phone.length !== 1 && <button className={styles.addRemovePhoneBtn} onClick={() => handlePhoneRemove(index)}><FontAwesomeIcon icon={solid("remove")} color = "black"/></button>}
                     {phone.length -1 === index && <button className={styles.addRemovePhoneBtn} onClick={handlePhoneAdd}><FontAwesomeIcon icon={solid("add")} color = "black"/></button>}
                  </div>
              );})}
      </div>
      <div className={styles.btn_section}>
        <button className="defaultBtn">Save</button>&nbsp;&nbsp;
        <button className="transparentBtn">Cancel</button>
      </div>
    </form>
  )
}

export default EditClient;
