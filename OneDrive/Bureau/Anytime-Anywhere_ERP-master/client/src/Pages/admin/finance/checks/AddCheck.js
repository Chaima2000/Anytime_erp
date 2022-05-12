import React, { useState , useEffect} from 'react';
import Select  from 'react-select';
import axios from 'axios';
import swal from 'sweetalert';
import styles from '../../../../Css/Client.module.css'
import { useParams } from 'react-router-dom';
function Checks() {
  const [name, setName] = useState("");
  const [description , setDescription] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [state, setState] = useState("");
  const [ClientSociety , setClientList] = useState("");
  const [projectsList, setprojectsList] = useState([]);
  const [project, setProject] = useState("");
  const [userList , setUserList] = useState([]);
  const success = () => {
    document.getElementById("name").value="";
    document.getElementById("description").value="";
    document.getElementById("state").value="";
    document.getElementById("type").value= "";
    document.getElementById("project").options= [""];
    document.getElementById("value").value= "";
  }

  useEffect( ()=> {
    axios.get(`/getprojects`).then( (res)=>{
      if(res.data){
        var options=[]
        res.data.map( (element) => {
          options.push({value:element._id,label: element.name});
        })
        setprojectsList(options)
      }
     
    })
  }, [])

  function getClient(project){
    axios.get(`/check/getclient/${project}`).then( (res)=>{
      if(res.data){
        setClientList(res.data);
      } 
    })
  }
  function getUser(project){
    axios.get(`/check/getUser/${project}`).then( (res)=>{
      if(res.data){
        setUserList(res.data);
      } 
    })
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
    //State options //
    const options = [
      { value: 'paid', label: 'paid' },
      { value: 'unpaid', label: 'unpaid' },
      { value: 'partial payment', label: 'partial payment' }
    ]
    //Type options
    const Type= [
      {value: 'income' , label: 'income'},
      { value: 'outcome' , label: 'outcome'}
    ]
    
  

  const addcheck =(e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name",name);
    data.append("state",state);
    data.append("client",ClientSociety);
    data.append("description",description);
    data.append("type",type);
    data.append("user",userList);
    data.append("value",value);
    data.append('project', project);
    const datax = {
      name:name,
      state:state,
      ClientSociety:ClientSociety,
      description:description,
      type:type,
      user:userList,
      value:value,
      project:project
    }
    axios.post("/addcheck", datax).then((res)=>{
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
    
  return (
    <>
      <section className={styles.section}>        
      <div className={styles.container}>
          <div className={styles.form }>
          <form onSubmit={addcheck}>
            <h2 className={styles.h2}>Add check: </h2>
            <div className={styles.div1}>
              <input type="text" id="name" className={styles.formInput} placeholder="Enter name" onChange= { (e) => { setName(e.target.value)}} required />
              <textarea id="description" className={styles.formInput} placeholder="Enter description" onChange= { (e) => { setDescription(e.target.value)}} required />
              <input type="number" id="value" className={styles.formInput} placeholder="Enter value" onChange= { (e) => { setValue(e.target.value)}} required />
              <br />
              <br />
            <Select 
            
                placeholder="Select Type"
                name="type"
                id="type"
                styles={customStyles}
                onChange= {(e) => setType(e.value)}
                options={Type}              
                required
          />
            </div><br />
            <div className={styles.div2}>
            <Select 
                placeholder="Select State"
                name="state"
                id="state"
                onChange= { (e) => { setState(e.label)}}
                styles={customStyles}
                options={options} 
                required
          />
              <br />
              <Select 
                      placeholder="Select project"
                      name="project"
                      id="project"
                      styles={customStyles}
                      options={projectsList} 
                      onChange= { (e) =>{setProject(e.value); getClient(e.value) ; getUser(e.value)}}
                      required
                />
          <br />
          <p>Client: <b>{ClientSociety}</b></p>
          <p>Assigned to: <b>{userList.map( (users) => {
            return (<> 
            {users}, 
          </>)})}</b></p>
            </div>
            <br />
            <br />
              <button className={styles.btn}>SAVE</button>
        </form> 
          </div>
        </div>
    </section>
    </>
  )
}

export default Checks