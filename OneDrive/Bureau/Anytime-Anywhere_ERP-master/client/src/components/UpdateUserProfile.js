import React , { useContext , useState  }  from 'react';
import styles from "../Css/ProfileDropdown.module.css";
import { AppContext } from "../Context/AppContext";

function UpdateUserProfile() {
    const { user } = useContext(AppContext);
    const [Newfirstname , setNewfirstname] = useState("");
    const [ Newlastname , setNewlastname] = useState("");
    const [Newemail , setNewemail] = useState("");
    const [NewPassword , setNewpassword]= useState("");

  return (
  <>
    <h1>EDIT PROFILE</h1>
    <hr className={styles.hr} />
    <form>
    <div className={styles.informations}>
      <label>First Name: </label>
      <input type="text" className={styles.input} defaultValue={user.firstName} onChange= { (e) => setNewfirstname(e.target.value)} />
      <label>Last Name:</label> 
      <input type="text" className={styles.input} defaultValue={user.lastName} onChange= { (e) => setNewlastname(e.target.value)}/>
      <label>Email: </label>
      <input type="text" className={styles.input} defaultValue={user.email} onChange= { (e) => setNewemail(e.target.value)}/>
      <label>Password: </label>
      <input type="password" className={styles.input} defaultValue={user.password} onChange= { (e) => setNewpassword(e.target.value)}/>
      <label>Role:</label> 
      <input type="text" className={styles.input} defaultValue={user.role} disabled={true}/>
      <button className={styles.updateBtn}>Update</button>
    </div>
    <div className={styles.Userpicture}>
      <label>Picture:</label> 
    </div>
    </form>
  </>
  )
}

export default UpdateUserProfile