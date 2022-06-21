import React ,{useContext,useState} from 'react';
import axios from 'axios';
import img from '../../uploads/feature_3.png';
import { useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import { TextField } from '@mui/material';
import {makeStyles} from '@material-ui/core';
import styles from '../../Css/Plainte.module.css';
import swal from 'sweetalert';
import { AppContext } from '../../Context/AppContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import 'fa-icons';
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
const useStyles= makeStyles({
  field:{
    width:'98%'
  }
})
function Plainte() {
  const {user}= useContext(AppContext)
  const classes= useStyles();
  const history = useHistory();
  const [objet, setObjet]=useState("");
  const [raison, setRaison]=useState("");
  const [email,setEmail]=useState(user.email);
  function AddPlainte(){
    axios.post("/addPlainte",{objet:objet,email:email,raison:raison}).then((res)=>{
      if(res.data === "ERROR"){
        swal("veuillez vérifier vos données ?")
      }else{
        swal("Envoyé avec succès").then(function(){
          history.push("/liste/plainte")
        })
      }
    })
  }
  return (
    <div className={styles.container}>
    <Link to={`/list/plaintes`} className={styles.link}><Tooltip title="Consulter la liste des plaintes"><i style={{color:'white'}}><FontAwesomeIcon icon={solid("circle-arrow-right")} /></i></Tooltip></Link>
    <div className={styles.right_image}><img src={img} /></div>
        <i className= {styles.i}><FontAwesomeIcon icon={solid("envelope-open")} /></i>
        <div className={styles.partOne}>
            <h3>Envoyer plainte</h3>
            <p>Cette page vous donne la possibilité de se plainter si vous avez une problème</p>
        </div>
        <form className= {styles.form} onSubmit={AddPlainte}>
        <i className= {styles.ii}><FontAwesomeIcon icon={solid("plus")} /></i>
        <h3>Plainte</h3>
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
                  value={email}
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
                    <br/><br/>
                    <button className={styles.button}>Envoyer</button>
        </div>
        </form>
    </div>
  )
}

export default Plainte