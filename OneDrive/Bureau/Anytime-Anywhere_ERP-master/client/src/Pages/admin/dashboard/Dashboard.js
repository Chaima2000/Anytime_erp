import React , {useContext, useState} from 'react';
import { AppContext } from "../../../Context/AppContext";
import Navbar from '../../../components/Navbar';
import styles from '../../../Css/dashboard.module.css';
import Avatar from '../../../Css/avatarDashboard.PNG';
import { useEffect } from 'react';
import "../../../Css/bars.css"



function Dashboard() {
    const { user } = useContext(AppContext);
    useEffect(()=>{
      const numb = document.querySelector(".number");
      let counter = 0;
      setInterval(() => {
        if(counter == 100 ){
          clearInterval();
        }else{
          counter+=1;
          numb.textContent = counter + "%";
        }
      }, 80);
    },[])
  return (
      <>
      <Navbar/>
    <div className={styles.dash_content}>
        <div className={styles.dash_title}>
        <img src={Avatar} />
            <h3>Bonjour {user.firstName} {user.lastName} ! </h3><br/>
            <span>Bienvenue dans votre tableau de bord</span>
        </div>
        <div className={styles.component}>
          <div className={styles.card1}>
              <h3 align="center">Nombre des utilisateurs: </h3>
              <div className="circular">
                <div className="inner"></div>
                  <div className="number">100%</div>
                    <div className="circle">
                      <div className="bar left">
                        <div className="progress"></div>
                      </div>
                      <div className="bar right">
                        <div className="progress"></div>
                      </div>
                    </div>
              </div>
          </div>
          <div className={styles.card2}>
              <h3 align="center">Nombre des projets: </h3>
              <div className="circular">
                <div className="inner"></div>
                  <div className="number">100%</div>
                    <div className="circle">
                      <div className="bar left">
                        <div className="progress"></div>
                      </div>
                      <div className="bar right">
                        <div className="progress"></div>
                      </div>
                    </div>
              </div>
          </div>
          <div className={styles.card3}>
              <h3 align="center">Nombre des clients: </h3>
              <div className="circular">
                <div className="inner"></div>
                  <div className="number">100%</div>
                    <div className="circle">
                      <div className="bar left">
                        <div className="progress"></div>
                      </div>
                      <div className="bar right">
                        <div className="progress"></div>
                      </div>
                    </div>
              </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Dashboard