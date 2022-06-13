import React, { useState , useEffect } from 'react';
import Select  from 'react-select';
import styles from '../../../Css/Client.module.css';
import Styles from '../../../Css/AddProject.module.css';
import TextField from "@material-ui/core/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import axios from 'axios';
import {makeStyles} from '@material-ui/core';
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Navbar from "../../../components/Navbar";
toast.configure()
const useStyles= makeStyles({
  field:{
    width:'300px'
  }
})

function AddProject() {
  const [name , setName] = useState("");
  const [state , setState] = useState("");
  const [client , setClient] = useState("");
  const [clientsList , setClientsList] = useState([]);
  const [description , setDescription] = useState("");
  const [start , setStart] = useState("");
  const [end , setEnd] = useState("");
  const [membersList , setMembersList] = useState([]);
  const [members , setMembers] = useState({});
  const history = useHistory();
  const [file , setFile] = useState([]);
  const classes= useStyles();
  useEffect(() => {
    axios.get("/getclients").then((res) => {
      if (res.data){
        var options = []
        res.data.map((element) => {
          options.push({value: element._id, label: element.society} );
        })
        setClientsList(options);
      }
    });
  }, []);
  useEffect(() => {
    axios.get(`/getmembers`).then((res) => {
      if (res.data){
        var options = []
        res.data.map((element) => {
            var fullName = element.firstName + " " + element.lastName;
            options.push({value: element._id, label: fullName} );
        })
        setMembersList(options);
      }
    });
  }, []);

  //State options //
  const options = [
    { value: 'planning', label: 'planning' },
    { value: 'in_progress', label: 'in progress' },
    { value: 'closed', label: 'closed' }
  ]

  function convertBase64(file) {
    return new Promise((resolve, reject) => {
     const fileReader = new FileReader();
     fileReader.readAsDataURL(file);
     fileReader.onload = () => {
       resolve(fileReader.result);
     };
     fileReader.onerror = (error) => {
       reject(error);
     };
   });
 }

 const customStyles = {
  control: (provided , state) => ({
    ...provided,
    // border: state.isFocused ? 0 : 0,
    paddingLeft:'4px',
    fontSize: '18',
    opacity:1,
    outline: 'none',
    width: '1300',
    // borderRadius: '35px',
    height: '55px',
    boxShadow: state.isFocused ? null : null,
  })
}
const customstyles = {
  control: (provided , state) => ({
    ...provided,
    // border: state.isFocused ? 0 : 0,
    paddingLeft:'4px',
    fontSize: '18',
    opacity:1,
    outline: 'none',
    width: '800',
    // borderRadius: '35px',
    height: '55px',
    boxShadow: state.isFocused ? null : null,
  })
}

  const addproject =(e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name",name);
    data.append("state",state);
    data.append("client",client);
    data.append("description",description);
    data.append("start",start);
    data.append("end",end);
    data.append("members",members);
    data.append('file', file);
    const datax = {
      name:name,
      state:state,
      client:client,
      description:description,
      start:start,
      end:end,
      user:members,
      file:file
    }
    axios.post("/addproject", datax).then((res)=>{
      if(res.data === "ERROR"){
        swal({
          title: "ERROR",
          button: "OK!",
        });
        console.log(e);
      }else if(res.data === "SUCCESS"){
        history.push("/projectList");
      }
    }
    )}

  return (
    <>
    <Navbar></Navbar>
    <div className={Styles.overlay}>
      <section className={styles.section}>   
        <div className={Styles.container}>
          <div className={Styles.form }>
            <form onSubmit={addproject}>
            <br/>
            <span className={Styles.span}><FontAwesomeIcon icon={solid("plus")} size="lg" color="white"/></span>     
              <h2 align="center" className={styles.h2}>Add project </h2>
              <div className={styles.div1}>
              <TextField
              id="name"
              label="Entrer votre nom ..."
              onChange={(e) => {
                setName(e.target.value);
              }}
              className={classes.field}
              variant= "outlined"
              />
              {/* <input type="text" id="name" className={styles.formInput} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter name ..." required  /> <br /><br /> */}
              {/* Start date:
              <input type="date" id="start" className={styles.formInput} onChange={(e)=>{setStart(e.target.value)}} placeholder="Start date" required /> <br /> <br />
               */}
               <br/><br/>
               <TextField
              id="start"
              type="date"
              label="Date de début ..."
              onChange={(e) => {
                setStart(e.target.value)
              }}
              className={classes.field}
              InputLabelProps={{
                shrink: true,
              }}
              variant= "outlined"
              />
              <br/><br/>
              <TextField
              id="end"
              type="date"
              label="Date de fin ... "
              onChange={(e) => {
                setEnd(e.target.value)
              }}
              className={classes.field}
              InputLabelProps={{
                shrink: true,
              }}
              variant= "outlined"
              />
              <br/><br/>
              <TextField
              id="description"
              label="Décrire le projet ..."
              onChange={(e) => {
                setDescription(e.target.value)
              }}
              className={classes.field}
              variant= "outlined"
              />
              {/* End date:
              <input type="date" id="end" className={styles.formInput} onChange={(e)=>{setEnd(e.target.value)}}  placeholder="End date"  /> <br /> */}
              {/* <textarea id="description" className={styles.formInput} onChange={(e)=>{setDescription(e.target.value)}} placeholder=" Enter description ..."  required  /> <br /> */}
              </div>
              <div className={styles.div2}>
                <Select 
                      placeholder="Sélectionner les membres ..."
                      name="client"
                      id="client"
                      onChange={(e) => {
                        setClient(e.value)
                      }}
                      styles={customStyles}
                      options={clientsList} 
                      required
                />
              <br /> 
          <Select 
                isMulti
                placeholder="Sélectionner les employés..."
                name="members"
                id="members"
                onChange={(e) => {
                  let values =[]
                  e.forEach(element=>{
                  values.push(element.value)
                  })
                  setMembers(values)
                }}
                styles={customStyles}
                  options={membersList} 
                  required
          />
        <br />
          <Select 
                placeholder="Etat du projet..."
                name="state"
                id="state"
                onChange={(e) => {
                  setState(e.label)
                }}
                styles={customStyles}
                options={options} 
                
          />
        <div>
        <br />
        <div className={Styles.btnupload}>
            <input
              accept="image/*"
              id="file"
              multiple
              type="file"
              style={{display: 'none'}}
              onChange={async (e) => {
                          var array = [];
                          const files = e.target.files;
                          for (let i = 0; i < files.length; i++) {
                          let file = files.item(i);
                          const base64 = await convertBase64(file);
                          array.push(base64);
                        }
                        setFile(array);
                      }}
            />
            <label htmlFor="file">
                <span>Télécharger fichiers</span>
              </label>
          </div>
        </div>
        </div>
        <button className={styles.btn}>SAVE</button>
            

        </form> 
  </div>
  </div>
  </section>
</div>
   </>
  )
}

export default AddProject;
