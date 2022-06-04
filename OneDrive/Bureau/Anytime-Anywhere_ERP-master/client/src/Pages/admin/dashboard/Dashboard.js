import React , {useContext, useState,useEffect} from 'react';
import { AppContext } from "../../../Context/AppContext";
import Navbar from '../../../components/Navbar';
import styles from '../../../Css/dashboard.module.css';
import Avatar from '../../../Css/avatarDashboard.PNG';
import "../../../Css/bars.css"
import axios from 'axios';
import { ScatterChart, Scatter, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const datay = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];


function Dashboard() {
    const { user } = useContext(AppContext);
    const [projectnumber,setProjectNumber]=useState([]);
    const [usernumber,setUserNumber]=useState([]);
    const [clientnumber,setClientNumber]=useState([]);
     let counteruser = 0;
     let counterproject=0;
     let counterclient=0;
    
    useEffect(()=>{
      axios.post("/projectNumbers").then((res)=>{
        if(res.data === "ERROR"){
          alert("error")
        }
        else {
          setProjectNumber(res.data);
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
    console.log(clientnumber.length)
      const numb = document.querySelector(".number");
      setInterval(() => {
        if(counterproject == projectnumber.length ){
              clearInterval();
            }else{
              counterproject= counterproject+1;
              numb.textContent = (counterproject/100) + "%";
              clearInterval();
            }
    },400)
    const numu = document.querySelector(".numberuser");
      setInterval(() => {
        if(counteruser == usernumber.length ){
              clearInterval();
            }else{
              counteruser= counteruser+1;
              numu.textContent = (counteruser/100) + "%";
              clearInterval();
            }
    },100)
    const numc = document.querySelector(".numberclient");
      setInterval(() => {
        if(counterclient == clientnumber.length ){
              clearInterval();
            }else{
              counterclient= counterclient+1;
              numc.textContent = (counterclient/100) + "%";
              clearInterval();
            }
    },100)
  
   
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
          </div>
      <div className={styles.secondComponent}>
        <div className={styles.histo}>
        <h4 align="center">Etat du projet: </h4>
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
      </div>
      <div className={styles.check_histo}>
      <h3 align="center">Etat des tâches</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          width={400}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="stature" unit="cm" />
          <YAxis type="number" dataKey="y" name="weight" unit="kg" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="A school" data={datay} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
      </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard