import React , { useContext , useState  }  from 'react';
import styles from "../Css/ProfileDropdown.module.css";
import { AppContext } from "../Context/AppContext";
import avatar from "../uploads/avatar.png";
import TextField from '@material-ui/core/TextField';

function UpdateUserProfile() {
    const { user } = useContext(AppContext);
    const [Newemail , setNewemail] = useState("");
    const [CurrentPassword , setCurrentpassword] = useState("");
    const [NewPassword , setNewpassword]= useState("");

  return (
  <>
   <h1 align="center">EDIT PROFILE</h1>
   <form className={styles.form}>
      <div>
        
      </div>
      {/* <div className= {styles.details_section}>
      <label>First Name: </label>
      <input type="text" className={styles.disabled_input} defaultValue={user.firstName} disabled={true} />
      <label>Last Name:</label> 
      <input type="text" className={styles.disabled_input} defaultValue={user.lastName} disabled={true} />
      <label>Email: </label>
      <br />
      <br />
      <input type="text" className={styles.input} defaultValue={user.email} onChange= { (e) => setNewemail(e.target.value)}/>
      <br />
      <label>Password: </label>
      <br />
      <br />
      <TextField  id="password" 
                      type="password"
                      label="Current password " 
                      className={styles.input}
                      variant="outlined"
                      defaultValue={user.password}
                      onChange= { (e) => setCurrentpassword(e.target.value)} 
                      required 
            /> 
      <br />
      <br />
      <br />
      <TextField   
                      type="password"
                      label="New password " 
                      className={styles.input}
                      variant="outlined"
                      defaultValue={user.password}
                      onChange= { (e) => setNewpassword(e.target.value)} 
                      required 
            /> 
      <br />
      <br />
      <button className={styles.updateBtn}>Update</button>
      </div>
      <div className={styles.picture_section}>
        <label>Picture:</label> 
        <br />
        <img className={styles.img_section} src= {avatar} />
        <br /> <br />
        <input type="file" id="input" className={styles.input_img} accept = "image/*" />
        <label htmlFor="input" className={styles.upload_btn}>Choose photo</label>
      </div> */}
   </form>
  </>
  )
}

export default UpdateUserProfile