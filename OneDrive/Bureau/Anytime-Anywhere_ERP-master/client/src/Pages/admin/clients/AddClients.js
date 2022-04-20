import React, { useState } from 'react';
import styles from '../../../Css/Project.module.css';
import Styles from '../../../Css/Client.module.css';
import axios from 'axios';
import swal from 'sweetalert';
import {toast} from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Select  from 'react-select';
import TextField from '@material-ui/core/TextField';
import 'react-toastify/dist/ReactToastify.css';    
toast.configure()


function AddClients() {
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
    setType([ { type : ""}]);
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
  const options = [ 
    { value : 'particulier' , label : 'particulier'},
    { value : 'professionnel' , label : 'professionnel'}
  ]
  const customStyles = {
    control: (provided , state) => ({
      ...provided,
      background: 'white',
      outline: 'none',
      borderColor: '#9e9e9e',
      minHeight: '30px',
      height: '55px',
      boxShadow: state.isFocused ? null : null,
    }),
    menu: base => ({
      ...base,
      zIndex: 100
    })
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
        swal({
          title: "ERROR",
          button: "OK!",
        });
      }else{
        swal({
          title: "SUCCESS",
          text: "Added succesfully!",
          icon: "success",
          button: "OK!",
        });
        success();
      }
    }
    )}

  return (
    <>
    <h1 className={styles.form_title}>ADD CLIENT</h1>
    <form  onSubmit={addclient} className={Styles.form}>
     
    <div className={styles.div_Sides}>

            <div className={Styles.select}>
                  <Select 
                        placeholder="Select  type"
                        id="type"
                        onChange={(e)=>{setType(e.label)}}
                        styles={customStyles}
                        options={options}
                        isClearable 
                        required
                  />
            </div>
            <br />
            <TextField  id="society" 
                      type="text"
                      label="Enter Society's name " 
                      className={Styles.select}
                      variant="outlined"
                      onChange={(e)=>{setSociety(e.target.value)}} 
                      required 
            /> 
            <br />
            <br />
            <TextField  id="activity"
                      type="text" 
                      label="Enter activity's name " 
                      className={Styles.select}
                      variant="outlined"
                      onChange={(e)=>{setActivity(e.target.value)}} 
                      required 
            /> 
            <br />
            <br />
            <TextField  id="ceo" 
                      type="text"
                      label="Enter ceo's name " 
                      className={Styles.select}
                      variant="outlined"
                      onChange={(e)=>{setCeo(e.target.value)}} 
                      required 
            /> 
            <br />
            <br />
            <TextField  id="email" 
                      type="email"
                      label="Enter email's name " 
                      className={Styles.select}
                      variant="outlined"
                      onChange={(e)=>{setEmail(e.target.value)}} 
                      required 
            /> 
            {/* <select className={styles.input_item} name="type" id="type" >
              <option value="">  Select your type </option>
              <option value="particulier"> Particulier</option>
              <option value="professionnel">Professionnel</option>
            </select> */}
            {/* <input className={styles.input_item} type="text" onChange={(e)=>{setSociety(e.target.value)}} name="society" id="society" placeholder='Enter your Society' required/> */}
            {/* <input className={styles.input_item} type="text" name="activity" id="activity" onChange={(e)=>{setActivity(e.target.value)}} placeholder='Enter your activity' required/> */}
            {/* <input className={styles.input_item} type="text" name="ceo" id="ceo" onChange={(e)=>{setCeo(e.target.value)}} placeholder='Enter your CEO ' required /> */}
            {/* <input className={styles.input_item} type="email" name="email" id="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter your email' required/> */}
    </div>  
    <div className={styles.div_Sides}>
            {phone.map((phoneNumber, index) => {
                    return(
                    <div key={index}>
                        <TextField  id="phone" 
                                  type="number"
                                  label="Enter phone number " 
                                  className={Styles.select}
                                  variant="outlined"
                                  onChange={e => handlePhoneChange(e, index)}
                                  isClearable
                                  required 
                        /> 
                        
                            {/* <input className={Styles.phone_item} type="number" name="phone" id="phone" placeholder= "Enter your phone number" value={phoneNumber.phone} onChange={e => handlePhoneChange(e, index)} required/> */}
                            {phone.length !== 1 && <button className={Styles.addRemovePhoneBtn} onClick={() => handlePhoneRemove(index)}><FontAwesomeIcon icon={solid("xmark")} color = "black" className={styles.add_icon}/></button>}
                            {phone.length -1 === index && <button className={Styles.addRemovePhoneBtn} onClick={handlePhoneAdd}><FontAwesomeIcon icon={solid("plus")} color = "black" className={styles.add_icon}/></button>}
                        <br />
                        <br />
                    </div>
            );})}

            <TextField  id="country" 
                                  type="text"
                                  label="Enter country " 
                                  className={Styles.select}
                                  variant="outlined"
                                  onChange={(e)=>{setCountry(e.target.value)}}
                                  required 
            /> 
            <br />
            <br />
            <TextField  id="city" 
                                  type="text"
                                  label="Enter city " 
                                  className={Styles.select}
                                  variant="outlined"
                                  onChange={(e)=>{setCity(e.target.value)}}
                                  required 
            />
            <br />
            <br />
            <TextField  id="address" 
                                  type="text"
                                  label="Enter address " 
                                  className={Styles.select}
                                  variant="outlined"
                                  onChange={(e)=>{setAddress(e.target.value)}}
                                  required 
            />
            <br />
            <br />  
            <TextField  id="zipCode" 
                                  type="number"
                                  label="Enter zip Code " 
                                  className={Styles.select}
                                  variant="outlined"
                                  onChange={(e)=>{setZipCode(e.target.value)}}
                                  required 
            />  
            
            
            {/* <input className={styles.input_item} type="text" name="country" id="country" onChange={(e)=>{setCountry(e.target.value)}} placeholder='Enter your Country' required />
            <input className={styles.input_item} type="text" name="city" id="city" onChange={(e)=>{setCity(e.target.value)}} placeholder='Enter your City' required/>
            <input className={styles.input_item} type="number" name="zipCode" id="zipCode" onChange={(e)=>{setZipCode(e.target.value)}} placeholder='Enter your Zip Code' required />
            <input className={styles.input_item} type="text"  name=" address" id="address" onChange={(e)=>{setAddress(e.target.value)}} placeholder='Enter your address' required /> */}
            <button className={Styles.btn}> SAVE </button> 
        </div>
        <br />
        <br />
        
      {/* <div className={styles.btn_section}>
        <button className={Styles.btn}>Save</button>
      </div> */}
    </form>
    </>
  )
}

export default AddClients;
