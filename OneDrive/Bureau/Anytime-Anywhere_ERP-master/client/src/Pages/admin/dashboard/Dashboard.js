import React , {useContext, useState,useEffect} from 'react';
import { AppContext } from "../../../Context/AppContext";
import Navbar from '../../../components/Navbar';
import styles from '../../../Css/dashboard.module.css';
import Avatar from '../../../Css/avatarDashboard.PNG';
import "../../../Css/bars.css"
import axios from 'axios';
import {PieChart, Pie, Sector, Cell, ScatterChart, Scatter, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const datach = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];




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
     
      const data = [
        {
          name: '',
          uv: 2000,
          // pv: 2400,
        },
        {
          name: 'Terminé',
          uv: 3000,
          // pv: 1398,
          // amt: 1210,
        },
        {
          name: 'En cours',
          uv: 3000,
          // pv: 1398,
          // amt: 1210,
        },
        {
          name: 'En pause',
          uv: 3000,
          // pv: 1398,
          // amt: 1210,
        },
        {
          name: '',
          uv: 3000,
          // pv: 1398,
          // amt: 1210,
        },
      ];
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
        <hr style={{width:"590px" , background:"#ccc" , border: "1px solid #ccc"}} />
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
                <Area type="monotone" dataKey="uv" stroke="#fada5e" fill="#fffacd" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className={styles.check_histo}>
            <h3 align="center">Etat des tâches</h3>
              
          </div>
        </div>
        <div className={styles.componentTwo}>
          <div className={styles.receiptCheck}>
            <h4 align="center">Etat des chèques</h4>
            <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={datach}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                >
                {datach.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            </ResponsiveContainer>
          </div>
          <div className={styles.secondo}>
            <h4 align="center"> Etat des frais</h4>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  data={datach}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {datach.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard