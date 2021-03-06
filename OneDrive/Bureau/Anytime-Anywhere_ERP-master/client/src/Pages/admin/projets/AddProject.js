import React, { useState , useEffect } from 'react';
import Select  from 'react-select';
import styles from '../../../Css/Client.module.css';
import { Link} from "react-router-dom";
import Styles from '../../../Css/AddProject.module.css';
import TextField from "@material-ui/core/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import axios from 'axios';
import swal from 'sweetalert';
import {makeStyles} from '@material-ui/core';
import {toast} from 'react-toastify';
import Tooltip from "@material-ui/core/Tooltip";
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
  const [waiting, setWaiting] = useState(true);
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
        setWaiting(false);
      }
    });
  }, []);

  //State options //
  const options = [
    { value: 'planning', label: 'En planification' },
    { value: 'in_progress', label: 'En cours' },
    { value: 'closed', label: 'Termin??' }
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
    width: '300px',
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
          title: "Erreur se produit", 
          text: "Veuillez v??rifier vos donn??e!", 
          type: "error"
        }).then(function(){
          window.location.reload()
        });
      }else if(res.data === "SUCCESS"){
        swal({
          title: "Ajout?? avec succ??s ", 
          type: "success"
        }).then(function(){
          window.location.reload()
        });
      }
    }
    )}
     
  return (
    <>
    <Navbar></Navbar>
    {waiting ? (
    <div className="row">
            <FontAwesomeIcon icon={solid("spinner")} size={"3x"} spin />
    </div>)
          :(
            <>
    <div className={Styles.overlay}>
      <section className={Styles.sectionP}>
      <Tooltip title="Liste des projets"> 
        <Link to={"/projectList"} className={Styles.spanOne}><FontAwesomeIcon icon={solid("arrow-left")}/></Link>
      </Tooltip>
        <div className={Styles.container}>
        
          <div className={Styles.form }>
            <form onSubmit={addproject}>
              <FontAwesomeIcon icon={solid("plus")} color="white"  className={Styles.span}/>   
              <br/>
              <br/>
              <br/>
              <h2 align="center">Ajouter un projet </h2>
              <div className={Styles.div1}>
                <TextField
                id="name"
                label="Entrer le nom ..."
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className={classes.field}
                variant= "outlined"
                />
                <br/><br/>
                <TextField
                id="start"
                type="date"
                label="Date de d??but ..."
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
                label="D??crire le projet ..."
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
                className={classes.field}
                variant= "outlined"
                />
              </div>
              <div className={Styles.div2}>
                <Select 
                      placeholder="S??lectionner les membres ..."
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
                    placeholder="S??lectionner les employ??s..."
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
            <label htmlFor="file" style={{cursor:'pointer'}}>
                <span>T??l??charger fichiers</span>
            </label>
          </div>
        </div>
        </div>
        <div className={Styles.buttons}>
        <button className={Styles.btn}>Enregistrer</button>
        </div>
        </form> 
  </div>
  </div>
  </section>
</div>
</>
    )}
   </>
  )
}

export default AddProject;
