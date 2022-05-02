import React, { useState , useEffect , useRef } from 'react';
import Select  from 'react-select';
import axios from 'axios';
import swal from 'sweetalert';
import styles from '../../../../Css/Client.module.css'
import Styles from '../../../../Css/Receipts.module.css'

function Addreceipts() {
    const [project, setProject]= useState("");
    const [projectsList, setprojectsList]= useState([]);
    const [client, setclient]= useState("");
    const [clientsList, setClientsList]= useState([]);
    const [bank, setBank]= useState("");
    const [banksList, setBanksList]= useState([]);
    const [description, setDescription]=useState("");
    const [amount, setAmount]=useState("");
    const [state,setState]=useState("");
    const success = () => {
        document.getElementById("project").value="";
        document.getElementById("description").value="";
        document.getElementById("state").value="";
        document.getElementById("amount").value= "";
        document.getElementById("client").options= [""];
        document.getElementById("bank").value= "";
      }
    const customStyles = {
        control: (provided , state) => ({
          ...provided,
          border: state.isFocused ? 0 : 0,
          paddingLeft:'4px',
          fontSize: '10',
          background: 'rgba(224, 222, 222, 0.2)',
          opacity:1,
          outline: 'none',
          borderRadius: '35px',
          height: '19px',
          boxShadow: state.isFocused ? null : null,
        })
      }
      useEffect(() => {
        axios.get("/getclients").then((res) => {
          if (res.data){
            var options = []
            res.data.map((element) => {
              options.push({value: element._id, label: element.society} );
            })
            setClientsList(options);
            
          }
        });
      }, []);
      useEffect(() => {
        axios.get("/getbank").then((res) => {
          if (res.data){
            var options = []
            res.data.map((element) => {
              options.push({value: element._id, label: element.name} );
            })
            setBanksList(options);
            
          }
        });
      }, []);
      useEffect( ()=> {
        axios.get("/getprojects").then( (res)=>{
          if(res.data){
            var options=[]
            res.data.map( (element) => {
              options.push({value:element._id,label: element.name});
            })
            setprojectsList(options)
          }
        })
      })
      const addreceipt =(e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("project",project);
        data.append("client",client);
        data.append("bank",bank);
        data.append("description",description);
        data.append("amount",amount);
        data.append("state",state);
        const datax = {
          project:project,
          client:client,
          bank:bank,
          description:description,
          amount:amount,
          state:state,
        }
        axios.post("/addreceipt", datax).then((res)=>{
          if(res.data === "ERROR"){
            swal({
              title: "ERROR",
              button: "OK!",
            });
            console.log(e);
          }else if(res.data === "SUCCESS"){
            swal({
              title: "SUCCESS",
              text: "Added succesfully!",
              icon: "success",
              button: "OK!",
            });
            success();
          }
        }
        )}
        
          //State options //
        const options = [
        { value: 'paid', label: 'paid' },
        { value: 'unpaid', label: 'unpaid' },
        { value: 'partial payment', label: 'partial payment' }
      ]
  return (
    <>
    <section className={styles.section}>        
      <div className={styles.container}>
          <div className={styles.form }>
          <form onSubmit={addreceipt}>
            <h2 className={styles.h2}>Add receipt: </h2>
            <div className={styles.div1}>
            <br />
            <Select 
                      placeholder="Select project"
                      name="project"
                      id="project"
                      styles={customStyles}
                      options={projectsList} 
                      onChange= { (e) => { setProject(e.label)}}
                      required
                />
                <br />
                <Select 
                      placeholder="Select client"
                      name="client"
                      id="client"
                      styles={customStyles}
                      options={clientsList} 
                      onChange= { (e) => { setclient(e.label)}}
                      required
                />
                <br />
                <Select 
                      placeholder="Select bank"
                      name="bank"
                      id="bank"
                      styles={customStyles}
                      options={banksList} 
                      onChange= { (e) => { setBank(e.label)}}
                      required
                />
            </div>
            <div className={styles.div2}>
              <textarea id="description" className={Styles.formInput} placeholder="Enter description" onChange= { (e) => { setDescription(e.target.value)}} required />
              <input type="number" id="amount" className={Styles.formInput} placeholder="Enter amount" onChange= { (e) => { setAmount(e.target.value)}} required />
              <br />
              <br />
          <Select 
                placeholder="Select state"
                name="state"
                id="state"
                onChange={ (e) => {setState(e.label)}}
                styles={customStyles}
                  options={options} 
                  required
          />
            </div>
            <br />
            <br />
              <button align="center" className={styles.btn}>SAVE</button>
        </form> 
          </div>
        </div>
    </section>
    </>
  )
}

export default Addreceipts