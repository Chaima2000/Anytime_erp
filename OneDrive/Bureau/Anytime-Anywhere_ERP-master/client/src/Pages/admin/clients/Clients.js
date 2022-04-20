import React , { useState , useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import axios from "axios" ;
import Modal from 'react-modal';
import Select  from 'react-select';
import TextField from '@material-ui/core/TextField';
import styles from "../../../Css/Project.module.css";
import Styles from "../../../Css/Client.module.css";
import table from "../../../Css/App.css";

Modal.setAppElement('#root')
function Clients(){
  const [clientsList, setClientsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [waiting, setWaiting] = useState(true);
  const [searchTerm , setSearchTerm]= useState("");
  const [allPages, setAllPages] = useState([]);
  const [DeleteClient , setDeleteClient] = useState({});
  const [ViewClient , setViewClient] = useState({});
  const [EditClient , setEditClient] = useState({});
  const [viewItem , setViewItem] = useState(false);
  const [editItem , setEditItem] = useState(false);
  const [deleteItem,setDeleteItem] = useState(false);

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
  const customStyles = {
    control: (provided , state) => ({
      ...provided,
      background: 'white',
      opacity:1,
      outline: 'none',
      borderColor: '#9e9e9e',
      minHeight: '30px',
      height: '55px',
      boxShadow: state.isFocused ? null : null,
    })
  }
  const options = [ 
    { value : 'particulier' , label : 'particulier'},
    { value : 'professionnel' , label : 'professionnel'}
  ]
  const updateClient = (id) => {
    axios.put("/updateClient" , { type : type , society:society , activity:activity , email : email , ceo : ceo , phone:phone , city:city , country: country , zipCode: zipCode , address : address , id:id}).then( (response)=> {
      setClientsList(response.data);
     })
  }
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
 const Delete = () => {
   setDeleteItem(true)
 }
 const View = () => {
  setViewItem(true)
}
const Edit = () => {
  setEditItem(true)
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
     <h1 className={styles.form_title}>Clients </h1>
     <Link to={`/clients/add`}><button className={Styles.add_Btn}> <FontAwesomeIcon icon={solid("plus")} color = "#fff"/> Add client </button></Link>

    <form 
        onSubmit={(e) => {
              document.getElementById("searchField").disabled = true;
              document.getElementById("resetBtn").hidden = false;
              document.getElementById("searchBtn").hidden = true;
              e.preventDefault();
              getClients();
              setCurrentPage(1);
            }}
        className={Styles.search_form}
        >

        <input
                  id="searchField"
                  required
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  className={Styles.formInput}
                  type="text"
                  placeholder="Client's name ..."
        />
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
          <div className={styles.spinner}>
            <FontAwesomeIcon icon={solid("spinner")} spin size="3x" />
          </div>) : (
    <>
          <br />
          <br />
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
                {clientsList.map( (client) => {
                  return ( 
                  <tr key = {client._id}>
                    <td>{client.society}</td>
                    <td>{client.activity}</td>
                    <td>{client.email}</td>
                    <td><span onClick={()=> {setViewClient(client) ; View()}}><FontAwesomeIcon  icon={solid("file") }  color="#1a9cd4" /></span>&nbsp;&nbsp;
                    <span onClick={()=> {setEditClient(client) ; Edit()}}><FontAwesomeIcon icon={solid("edit")} color = "#0e03a7"/></span>&nbsp;&nbsp;
                    <span onClick={()=> {setDeleteClient(client.society) ; Delete()}}> <FontAwesomeIcon icon={solid("trash")} color = "#c71585"  /> </span></td> 
                    <Modal isOpen={deleteItem} onRequestClose = {() => setDeleteItem(false)} 
                                              shouldCloseOnOverlayClick={true} style = {
                                                {  
                                                  overlay : {
                                                    backgroundColor : '#00000010'
                                                  },
                                                  content : {
                                                      color : 'black' , 
                                                      outline: 'none',
                                                      backgroundColor : 'white',
                                                      width: '400px',
                                                      height: '195px',
                                                      padding : '5px',
                                                      position : 'relative',
                                                      top:'25%',
                                                      left: '35%',
                                                      borderRadius: '15px'
                                                      },
                                              }
                                              }>
                        <h5  className={styles.ModalParagraph}>Do you want to delete {DeleteClient} ? <br/></h5>
                        <div className={styles.btn_section}>
                          <input type="button"  value="CANCEL"  className= {styles.white_btn}   onClick= {() => setDeleteItem(false)} />
                          <input type="button"  value="CONFIRM" className= {styles.confirm_btn}  onClick={()=> {setDeleteItem(false) ; deleteClient(DeleteClient._id)}}/>
                        </div>
                    </Modal>
                    <Modal isOpen={viewItem} onRequestClose = {() => setViewItem(false)} 
                                                      shouldCloseOnOverlayClick={true} style = {
                                                        {  
                                                          overlay : {
                                                            backgroundColor : '#00000010'
                                                          },
                                                          content : {
                                                              color : 'black' , 
                                                              outline: 'none',
                                                              backgroundColor : 'white',
                                                              width: '500px',
                                                              height: '485px',
                                                              padding : '5px',
                                                              position : 'relative',
                                                              top:'18%',
                                                              left: '32%',
                                                              borderRadius: '15px'
                                                              }}
                    }>
                    <h1 className={styles.form_title}>Client informations</h1>
                      <div className={Styles.viewClientDetails}>
                          <p>Nom de la société : <span className={styles.h4}>{ViewClient.society}</span></p>
                          <p>Activité: <span className={styles.h4}>{ViewClient.activity}</span></p>
                          <p>Type: <span className={styles.h4}>{ViewClient.type}</span></p>
                          <p>Email :<span className={styles.h4}> {ViewClient.email}</span> </p>
                          <p>CEO : <span className={styles.h4}> {ViewClient.ceo}</span> </p>
                          {/* <p>Telephone: <span className={styles.h4}>{ ViewClient.phone.map((number)=>{
                            return( <>{number.phone} , </>)})}</span></p> */}
                          <p>City : <span className={styles.h4}>{ViewClient.city}</span> </p>
                          <p>Country : <span className={styles.h4}>{ViewClient.country}</span> </p>
                          <p>adresse : <span className={styles.h4}>{ViewClient.address}</span> </p>
                          <p>zipCode :<span className={styles.h4}> {ViewClient.zipCode}</span> </p>
                      </div>
                    </Modal>
                    <Modal isOpen={editItem} onRequestClose = {() => setEditItem(false)} 
                                                      shouldCloseOnOverlayClick={true} style = {
                                                        {  
                                                          overlay : {
                                                            backgroundColor : '#00000010'
                                                          },
                                                          content : {
                                                              color : 'black' , 
                                                              outline: 'none',
                                                              backgroundColor : 'white',
                                                              width: '500px',
                                                              height: '485px',
                                                              padding : '5px',
                                                              position : 'relative',
                                                              top:'18%',
                                                              left: '32%',
                                                              borderRadius: '15px'
                                                              }}
                    }>
                    <h1 className={styles.form_title}>Edit Client</h1>
              <div className={Styles.editClientDetails}>
                    <div className={Styles.select}>
                        <Select 
                              placeholder="Select  type"
                              id="type"
                              defaultValue={options.find(obj => obj.label === EditClient.type)}
                              onChange={(e)=>{setType(e.label)}}
                              styles={customStyles}
                              options={options} 
                              required
                        />
                    </div>
                    <br />
                    <TextField  id="society" 
                              type="text"
                              label="Enter Society's name " 
                              className={Styles.select}
                              variant="outlined"
                              defaultValue={EditClient.society}
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
                              defaultValue= {EditClient.activity}
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
                              defaultValue={EditClient.ceo}
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
                              defaultValue={EditClient.email}
                              onChange={(e)=>{setEmail(e.target.value)}} 
                              required 
                    /> 
                    <br />
                    <br />
                    {phone.map((phoneNumber, index) => {
                            return(
                            <div key={index}>
                                <TextField  id="phone" 
                                          type="number"
                                          label="Enter phone number " 
                                          className={Styles.select}
                                          variant="outlined"
                                          defaultValue={EditClient.phone}
                                          onChange={e => handlePhoneChange(e, index)}
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
                                          defaultValue={EditClient.country}
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
                                          defaultValue={EditClient.city}
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
                                          defaultValue={EditClient.address}
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
                                          defaultValue={EditClient.zipCode}
                                          onChange={(e)=>{setZipCode(e.target.value)}}
                                          required 
                    />  
            </div>
            <br />
            <br />
            <button className={Styles.btn} onClick = { () => { updateClient(EditClient._id)}}> SAVE </button> 
           </Modal>
                  </tr>
                  )})
                  }
              </tbody>
              
          </table>
          
          <div className="paginationContainer">
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
                      className="pagination">
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
