import React , { useContext , useState , useEffect  }  from 'react';
import axios from 'axios';
import styles from "../Css/UpdateProfile.module.css";
import Navbar from './Navbar';
import { AppContext } from "../Context/AppContext";
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import avatar from "../uploads/avatar.png";
import TextField from '@material-ui/core/TextField';

function UpdateUserProfile() {
    const { user } = useContext(AppContext);
    const [users,setUser]=useState([]);
    const firstName=user.firstName;
    const [lastName,setlastName]=useState("");
    
    const [image,setImage]=useState("");
    const [email , setNewemail] = useState("");
    const [password , setCurrentpassword] = useState("");
    const [modalIsOpen,setModalIsOpen]=useState(false);
    const [modalOpen,setModalOpen]=useState(false);
    Modal.setAppElement('#root');
    const isOpen=()=>{
      setModalIsOpen(!modalIsOpen)
    }
    const Open=()=>{
      setModalOpen(!modalOpen)
    }
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
   useEffect(() => {
    axios.post("/getuser",{ id: user.id }).then((res) => {
      if (res.data) {
        setUser(res.data);
      }
    });
  },[]);
   const updateUser = (id) => {
    axios.put(`/modifyUser/${id}`, {password:password, id:id})
    .then((res) => {
      if (res.data === "ERROR") {
        alert("An error occured");
        console.log("erreur")
      } else {
        setUser(res.data);
    } 
    })
    }
  return (
  <>
  <Navbar/>
   <form className={styles.form}>
      <h2>Informations générales</h2>
      <br/>
      <br/>
      <div className={styles.div}>
      <table>
        <tr>
          <td><h4>PHOTO</h4></td>
          <Modal isOpen={modalIsOpen} onRequestClose = {() => setModalIsOpen(false)}
                shouldCloseOnOverlayClick={true}
                style = {
                          {  
                            overlay : {
                                        backgroundColor : '#00000030'
                                      },
                            content: {
                                        position:'relative',
                                        textAlign:'center',
                                        outline:'none',
                                        top:'13%',
                                        left: '32%',
                                        width: '37%',
                                        height: '405px',
                                        background:'#232b2b'
                                      }
                          }
                        }>
                          <form>
                            <h2 className={styles.h2} align="center">Modifier la photo du profil </h2>
                            <img  src={image} className={styles.bigImage} />
                            <div className={styles.divBtn}>
                                <button className={styles.bttn} onClick={()=>{updateUser(user.id)}}>Enregistrer</button>
                                <label className={styles.bttn}> Télécharger image
                                  <input type="file" onChange={async (e) => {
                                    const file = e.target.files[0];
                                    const base64 = await convertBase64(file);
                                    setImage(base64)}} style={{display:'none'}}  />
                                </label>
                            </div>
                          </form>

        </Modal>
          <td><p className={styles.p}>Ajoutez une photo pour personnaliser votre compte</p></td>
          <td><img src={user.image} className={styles.image} onClick={isOpen}/></td>
        </tr>
        <tr>
          <td><h4>NOM ET PRENOM</h4></td>
          <td><b>{user.firstName} {user.lastName}</b></td>
          <td><i><FontAwesomeIcon icon={solid("angle-right")} /></i></td>
        </tr>
        <tr>
          <td><h4>ADRESSES E-EMAIL</h4></td>
          <td><b>{user.email}</b></td>
          <td><i><FontAwesomeIcon icon={solid("angle-right")} /></i></td>
        </tr>
        <tr onClick={Open}>
          <td><h4>NOUVEAU MOT DE PASSE</h4></td>
          <td><b><input type="password" onChange={(e)=>{setCurrentpassword(e.target.value)}} /><i><FontAwesomeIcon icon={solid("edit")} /></i></b> <button className={styles.btN} value= {password} onClick={()=>{updateUser(user.id)}}>Enregistrer</button></td>
          <td><i><FontAwesomeIcon icon={solid("angle-right")} /></i></td>
          
        </tr>
      </table>
      </div>
   </form>
  </>
  )
}

export default UpdateUserProfile