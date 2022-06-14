import React , { useContext , useState  }  from 'react';
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
    const [Newemail , setNewemail] = useState("");
    const [CurrentPassword , setCurrentpassword] = useState("");
    const [NewPassword , setNewpassword]= useState("");
    const [modalIsOpen,setModalIsOpen]=useState(false);
    Modal.setAppElement('#root');
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
                                        borderRadius:'30px',
                                        outline:'none',
                                        top:'13%',
                                        left: '32%',
                                        width: '37%',
                                        height: '405px',
                                      }
                          }
                        }>

        </Modal>
          <td><p>Ajoutez une photo pour personnaliser votre compte</p></td>
          <td><img src={user.image} className={styles.image}/></td>
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
        <tr>
          <td><h4>MOT DE PASSE</h4></td>
          <td><b>{user.password}</b></td>
          <td><i><FontAwesomeIcon icon={solid("angle-right")} /></i></td>
        </tr>
      </table>
      </div>
   </form>
  </>
  )
}

export default UpdateUserProfile