import React from 'react'
import styles from '../../../Css/Plainte.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import 'fa-icons';
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
function Plainte() {
  return (
    <div className={styles.container}>
        <div className={styles.partOne}>
            <h3>Envoyer plainte</h3>
            <p>Cette page vous donne la possibilité de se plainter si vous avez une problème</p>
        </div>
    </div>
  )
}

export default Plainte