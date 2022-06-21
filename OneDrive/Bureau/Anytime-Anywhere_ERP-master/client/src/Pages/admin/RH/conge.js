import React, {useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import conge from '../../../uploads/congé.jpg';
import { useHistory } from "react-router-dom";
import styles from '../../../Css/congé.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import {makeStyles} from '@material-ui/core';
import {toast} from 'react-toastify';
import Tooltip from "@material-ui/core/Tooltip";
import axios from 'axios';
import { Link} from "react-router-dom";
import swal from 'sweetalert';
toast.configure()
const useStyles= makeStyles({
  field:{
    width:'98%'
  }
})
function Conge() {
  const classes= useStyles();
  const history = useHistory();
  const [objet, setObjet]=useState("");
  const [debut, setStart]=useState("");
  const [end, setEnd]=useState("");
  const [raison, setRaison]=useState("");
  const [email,setEmail]=useState("");

  const [congélist, setCongeList]=useState("");

  function addConge(){
    axios.post("/addconge",{objet:objet, debut:debut, end:end, raison:raison,email:email,congélist:congélist}).then((res)=>{
      if(res.data === "ERROR"){
        swal("veuillez vérifier vos données ?")
      }else{
        setCongeList(res.data);
        swal("Envoyé avec succès").then(function(){
          history.push("/liste/congés")
        })
      }
    })
  }

  return (
    <>
    <div className={styles.container}>
    
        <Link to={`/liste/congés`} className={styles.link}><Tooltip title="Consulter la liste des congés"><i className={styles.ii}><FontAwesomeIcon icon={solid("circle-arrow-right")} /></i></Tooltip></Link>
    
        <div className={styles.partOne}>
            <i className={styles.i}><FontAwesomeIcon icon={solid("business-time")} /></i>
            <h3>Demande un congé</h3><br/><br/>
            <p>Dans cette page vous pouvez demander des congés</p>
        </div>
        <div className={styles.right_image}><img src={conge} /></div>
        <form className={styles.partTwo} onSubmit={addConge}>
            <h2 className={styles.h2}>Congé: </h2>
            <div className={styles.inputs}>
              <TextField
                  label="Objet"
                  onChange={(e)=>{setObjet(e.target.value)}}
                  className={classes.field}
                  variant= "outlined"
                  /><br/><br/>
              <TextField
                  label="Email"
                  type="email"
                  onChange={(e)=>{setEmail(e.target.value)}}
                  className={classes.field}
                  variant= "outlined"
                  /><br/><br/>
                  <TextField
                    label="Débute à"
                    onChange={(e)=>{setStart(e.target.value)}}
                    type="date"
                    className={classes.field}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    variant= "outlined"
                    /><br/><br/>
                    <TextField
                    label="Fini à"
                    onChange={(e)=>{setEnd(e.target.value)}}
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className={classes.field}
                    variant= "outlined"
                    /><br/><br/>
                  <TextField
                    maxRows={10}
                    onChange={(e)=>{setRaison(e.target.value)}}
                    multiline
                    rows={5}
                    label="Raison"
                    className={classes.field}
                    variant= "outlined"
                    />
                  <button>Envoyer demande</button>
            </div>
        </form>
    </div>
    </>
    
  )
}

export default Conge