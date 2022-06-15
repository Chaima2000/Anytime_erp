import React , {useContext, useState,useEffect} from 'react';
import { AppContext } from "../../Context/AppContext";
import Navbar from '../../components/Navbar';
import styles from '../../../src/Css/dashboard.module.css';
import Avatar from '../../../src/Css/avatarDashboard.PNG';
import "../../../src/Css/bars.css"
import axios from 'axios';
import {Bar} from "react-chartjs-2";
import {PieChart, Pie, Sector, Cell, ScatterChart, Scatter, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Dashboard() {
    const { user } = useContext(AppContext);
    const [projectnumber,setProjectNumber]=useState([]);
    const [usernumber,setUserNumber]=useState([]);
    const [clientnumber,setClientNumber]=useState([]);
    const [banknumber,setBankNumber]=useState([]);
    const projetState= [];
    const dataj=[];
    var inProgress=0;
    var planning=0;
    var closed=0;
     let counteruser = 0;
     let counterproject=0;
     let counterclient=0;
     let counterbank=0;
    
    useEffect(()=>{
      axios.post("/projectNumbers").then((res)=>{
        if(res.data === "ERROR"){
          alert("error")
        }
        else {
          setProjectNumber(res.data);
          for(let i = 0 ; i<res.data.length; i++){
            if(res.data[i].state === "in progress"){
              inProgress=inProgress+1;
            }
             else if(res.data[i].state === "planning"){
              planning+=1;
            } 
            else if (res.data[i].state === "closed"){
              closed+=1;
            }
          }
        }
        })
    },[]);

    useEffect(()=>{
      axios.post("/getBanks").then((res)=>{
        if(res.data === "ERROR"){
          alert("error")
        }
        else {
          setBankNumber(res.data.banks);
        }
      })
    },[])

    useEffect(()=>{
      axios.post("/getUsers").then((res)=>{
        if(res.data === "ERROR"){
          alert("error")
        }
        else {
          setUserNumber(res.data.users);
        }
      })
    },[])

    useEffect(()=>{
      axios.post("/getClients").then((res)=>{
        if(res.data === "ERROR"){
          alert("error")
        }
        else {
          setClientNumber(res.data.clients);
        }
      })
    },[])

      const numb = document.querySelector(".number");
      setInterval(() => {
        if(counterproject == projectnumber.length ){
              clearInterval();
            }else{
              counterproject= counterproject+1;
              numb.textContent = (counterproject/100) + "%";
              clearInterval();
            }
      },400);

     const numu = document.querySelector(".numberuser");
      setInterval(() => {
        if(counteruser == usernumber.length ){
              clearInterval();
            }else{
              counteruser= counteruser+1;
              numu.textContent = (counteruser/100) + "%";
              clearInterval();
            }
    },100);

    const numbank = document.querySelector(".numberbank");
      setInterval(() => {
        if(counterbank == banknumber.length ){
              clearInterval();
            }else{
              counterbank= counterbank+1;
              numbank.textContent = (counterbank/100) + "%";
              clearInterval();
            }
    },100);

    const numc = document.querySelector(".numberclient");
      setInterval(() => {
        if(counterclient == clientnumber.length ){
              clearInterval();
            }else{
              counterclient= counterclient+1;
              numc.textContent = (counterclient/100) + "%";
              clearInterval();
            }
    },100);

  
   
  return (
      <>
      <Navbar/>
    <div className={styles.dash_content}>
        <div className={styles.dash_title}>
            <img src={Avatar} />
            <h3>Bonjour {user.firstName} {user.lastName} ! </h3><br/>
            <span>Bienvenue dans votre tableau de bord</span>
        </div>
        <hr style={{marginLeft:'350px',width:"590px" , background:"#ccc" , border: "1px solid #ccc"}} />
        <br/>
        <br/>
      <div className={styles.component}>
          <div className={styles.card1}>
              <h3 align="center">Nombre des utilisateurs: </h3>
              <div className="circular">
                <div className="inneruser"></div>
                  <div className="numberuser">{counteruser} %</div>
                    <div className="circle">
                      <div className="bar left">
                        <div className="progressuser"></div>
                      </div>
                      <div className="bar right">
                        <div className="progressuser"></div>
                      </div>
                    </div>
              </div>
          </div>

          <div className={styles.card2}>
              <h3 align="center">Nombre des projets: </h3>
              <div className="circular">
                <div className="inner"></div>
                  <div className="number">{counterproject} %</div>
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
                <div className="innerclient"></div>
                  <div className="numberclient">{counterclient} %</div>
                    <div className="circle">
                      <div className="bar left">
                        <div className="progressclient"></div>
                      </div>
                      <div className="bar right">
                        <div className="progressclient"></div>
                      </div>
                    </div>
              </div>
          </div>

        <div className={styles.card4}>
            <h3 align="center"> Comptes Bancaires: </h3>
            <div className="circular">
              <div className="innerbanque"></div>
                <div className="numberbank">{counterbank} %</div>
                  <div className="circle">
                    <div className="bar left">
                      <div className="progressbanque"></div>
                    </div>
                    <div className="bar right">
                      <div className="progressbanque"></div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        {/* <div className={styles.secondComponent}>
          <div className={styles.histo}>
            <h4 align="center">Etat du projet: </h4>
            <Bar data={data} />
          </div>
          <div className={styles.check_histo}>
            <h3 align="center">Etat des tâches</h3>
              
          </div>
        </div> */}
        {/* <div className={styles.componentTwo}>
          <div className={styles.receiptCheck}>
            <h4 align="center">Etat des chèques</h4>
            
          </div>
          <div className={styles.secondo}>
            <h4 align="center"> Etat des frais</h4>
            
          </div>
        </div> */}
      </div>
    </>
  )
}

export default Dashboard