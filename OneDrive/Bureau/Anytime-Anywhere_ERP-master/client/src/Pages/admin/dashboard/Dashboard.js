import React , {useContext} from 'react';
import { AppContext } from "../../../Context/AppContext";
import Navbar from '../../../components/Navbar';
import styles from '../../../Css/dashboard.module.css';
import Avatar from '../../../Css/avatarDashboard.PNG';
function Dashboard() {
    const { user } = useContext(AppContext);
  return (
      <>
      <Navbar/>
    <div className={styles.dash_content}>
        <div className={styles.dash_title}>
        <img src={Avatar} />
            <h3>Bonjour {user.firstName} {user.lastName} ! </h3><br/>
            <span>Bienvenue dans votre tableau de bord</span>
        </div>
    </div>
    </>
  )
}

export default Dashboard