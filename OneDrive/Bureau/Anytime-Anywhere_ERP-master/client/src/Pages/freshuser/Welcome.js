import React from "react";
import styles from '../../Css/fresh.module.css';
import Navbar from '../../components/Navbar';
function Welcome() {
  return (
  <>
  <Navbar />
  <div className={styles.freshDiv}>
     <p>Veuillez contacter votre superviseur pour obtenir un rôle</p>
  </div>
  </>);
}

export default Welcome;
