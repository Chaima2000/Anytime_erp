import React, { useState , useEffect , Component } from 'react';
import Select, { NonceProvider } from 'react-select';
import styles from '../../../Css/Project.module.css';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link , withRouter } from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';    
toast.configure()


function AddProject(props) {
  const [name , setName] = useState("");
  const [state , setState] = useState("");
  const [client , setClient] = useState("");
  const [description , setDescription] = useState("");
  const [start , setStart] = useState("");
  const [end , setEnd] = useState("");
  const [membersList , setMembersList] = useState([]);
  const [members , setMembers] = useState([]);
  const [file , setFile] = useState([]);

  useEffect(() => {
    axios.get("/getmembers").then((res) => {
      if (res.data){
        var options = []
        res.data.map((element) => {
            options.push({value: element.firstName, label: element.firstName} );
        })
        setMembersList(options);
      }
    });
  }, []);
 
const getFile = (e) => {
  console.log(e.target.files)
  setFile({file : e.target.files});
}
  const success = () => {
    document.getElementById("name").value="";
    document.getElementById("state").value="";
    document.getElementById("client").value="";
    document.getElementById("description").value="";
    document.getElementById("start").value="";
    document.getElementById("end").value= "";
    setMembersList([{members : ""}]);
    setFile([{ file : ""}]);
  }
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: '1px dotted pink',
      color: state.selectProps.menuColor,
      padding: 10,
    }),
  
    control: (_, { selectProps: { width }}) => ({
      width:width
    }),
  
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 0ms';
  
      return { ...provided, opacity, transition };
    }
  }
  const addproject =(e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name",name);
    data.append("state",state);
    data.append("client",client);
    data.append("description",description);
    data.append("start",start);
    data.append("end",end);
    data.append("members",members);
      data.append('file', file);
    const datax = {
      name:name,
      state:state,
      client:client,
      description:description,
      start:start,
      end:end,
      members:members,
      file:file
    }
    axios.post("/addproject", datax).then((res)=>{
      if(res.data === "ERROR"){
        toast.error("There's an error" ,{position: toast.POSITION.TOP_CENTER , autoClose : false  });
      }else if(res.data === "SUCCESS"){
        toast.success('Added Successfully !' , {position:toast.POSITION.TOP_CENTER , autoClose:false });
        success();
      }
    }
    )}

  return (
   <form  onSubmit={addproject}>
   <h1 className={styles.h1}>ADD PROJECT</h1>

   <div className={styles.left_inputs}>
      <input className={styles.left_input} placeholder="Name" type="text" onChange={(e)=>{setName(e.target.value)}} id="name" name="name" required /><br/><br/><br/>
                <Select 
                    isMulti
                    name="members"
                    id="members"
                    onChange={(e) => {
                      let values =[]
                      e.forEach(element=>{
                        values.push(element.value)
                      })
                    setMembers(values)
              }}
              options={membersList} 
              styles={customStyles}
              className={styles.left_input}
                    // classNamePrefix="select"
                    /><br/><br/>
                 
                
       <textarea className={styles.left_input} placeholder="Description" onChange={(e)=>{setDescription(e.target.value)}} id="description" name="description" required/><br/><br/>
      <label>Start Date : </label><br/><br/>
      <input type="date" className={styles.left_input} onChange={(e)=>{setStart(e.target.value)}} id="start" name="start" required /><br/><br/>
   </div>

   <div className={styles.right_inputs}>
      <input className={styles.right_input} placeholder="Client"  onChange={(e)=>{setClient(e.target.value)}} id="client" name="client" required /><br/><br/><br/>
      <select className = {styles.right_input} id="state" name="state" onChange={(e)=>{setState(e.target.value)}} required>
          <option value="in_progress">In progress</option>
          <option value="planning">Planning</option>
          <option value="closed">Closed</option>
      </select>
      <br/><br/>
      <label className={styles.btn_file} >Upload files
      <input type="file" className={styles.file_input} onChange={getFile} id="file" name="file" enctype="multipart/form-data"  multiple /></label>  <br/><br/>      <label>End Date : </label><br/><br/>
      <input type="date" className={styles.right_input}  onChange={(e)=>{setEnd(e.target.value)}} id="end" name="end" required /><br/><br/>
   </div><br/>

  
   <button className={styles.btn}>SAVE</button> 
   </form>
  )
}

export default AddProject;
