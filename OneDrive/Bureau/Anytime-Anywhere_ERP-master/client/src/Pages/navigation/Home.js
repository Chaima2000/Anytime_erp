import React , {Component} from 'react';
import styles from '../../Css/home.module.css';
import Typical from 'react-typical';
function Home() {

  return (
    <>
    <div className={styles.section1} >
      <p><Typical steps={['', 900, "Bienvenue Dans Notre Planification Des Ressources D'entreprise",100]} loop={Infinity} wrapper="p" /></p>
    </div>
    </>
  )
}

export default Home