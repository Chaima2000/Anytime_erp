import React, { useState , useEffect } from 'react';
import Select  from 'react-select';
import axios from 'axios';
import swal from 'sweetalert';
import styles from '../../../../Css/Client.module.css'
function Checks() {
  const [name, setName] = useState("");
  const [description , setDescription] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [state, setState] = useState("");
  const [membersList , setMembersList] = useState([]);
  const [user , setUser] = useState("");
  const [clientsList , setClientsList] = useState([]);
  const [client , setClient] = useState("");
  const [projectsList, setprojectsList] = useState([]);
  const [project, setProject] = useState("");
  const success = () => {
    document.getElementById("name").value="";
    document.getElementById("description").value="";
    document.getElementById("state").value="";
    document.getElementById("client").value= "";
    document.getElementById("type").value= "";
    document.getElementById("user").value= "";
    document.getElementById("project").value= "";
    document.getElementById("value").value= "";
  }
  const addcheck =(e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name",name);
    data.append("state",state);
    data.append("client",client);
    data.append("description",description);
    data.append("type",type);
    data.append("user",user);
    data.append("value",value);
    data.append('project', project);
    const datax = {
      name:name,
      state:state,
      client:client,
      description:description,
      type:type,
      user:user,
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

  useEffect(() => {
    axios.get(`/getprojects`).then((res) => {
      if (res.data){
        var options = []
        res.data.map((element) => {
          options.push({value: element.name, label: element.name} );
        })
        setprojectsList(options);
      }
    });
  }, []);
  useEffect(() => {
    axios.get(`/getmembers`).then((res) => {
      if (res.data){
        var options = []
        res.data.map((element) => {
            var fullName = element.firstName + " " + element.lastName;
            options.push({value: element._id, label: fullName} );
        })
        setMembersList(options);
      }
    });
  }, []);
  useEffect(() => {
    axios.get("/getclients").then((res) => {
      if (res.data){
        var options = []
        res.data.map((element) => {
          options.push({value: element.society, label: element.society} );
        })
        setClientsList(options);
      }
    });
  }, []);
  const customStyles = {
    control: (provided , state) => ({
      ...provided,
      border: state.isFocused ? 0 : 0,
      paddingLeft:'4px',
      fontSize: '10',
      background: 'rgba(224, 222, 222, 0.2)',
      opacity:1,
      outline: 'none',
      width: '300px',
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
  return (
    <>
      <section className={styles.section}>        
      <div className={styles.container}>
          <div className={styles.form }>
          <form onSubmit={addcheck}>
            <h2 className={styles.h2}>Add check: </h2>
            <div className={styles.div1}>
              <input type="text" id="name" className={styles.formInput} placeholder="Enter name" onChange= { (e) => { setName(e.target.value)}} required />
              <textarea type="text" id="description" className={styles.formInput} placeholder="Enter description" onChange= { (e) => { setDescription(e.target.value)}} required />
              <input type="number" id="value" className={styles.formInput} placeholder="Enter value" onChange= { (e) => { setValue(e.target.value)}} required />
              <br />
              <br />
            <Select 
                placeholder="Select Type"
                name="type"
                id="type"
                onChange= { (e) => { setType(e.label)}}
                styles={customStyles}
                options={Type} 
                required
          />
            </div>
            <div className={styles.div2}>
            <br />
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
                      placeholder="Select Client"
                      name="client"
                      id="client"
                      onChange= { (e) => { setClient(e.label)}}
                      styles={customStyles}
                      options={clientsList} 
                      required
                />
              <br />
          <Select 
                placeholder="Select user"
                name="user"
                id="user"
                onChange={ (e) => {setUser(e.label)}}
                styles={customStyles}
                  options={membersList} 
                  required
          />
        <br />
              <Select 
                      placeholder="Select project"
                      name="project"
                      id="project"
                      onchange={ (e) => {setProject(e.label)}}
                      styles={customStyles}
                      options={projectsList} 
                      required
                />
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