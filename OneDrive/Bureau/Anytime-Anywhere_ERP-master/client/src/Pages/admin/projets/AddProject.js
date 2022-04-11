import React, { useState , useEffect } from 'react';
import Select  from 'react-select';
import styles from '../../../Css/Project.module.css';
import axios from 'axios';
import swal from 'sweetalert';
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
  const success = () => {
    document.getElementById("name").value="";
    document.getElementById("state").value="";
    document.getElementById("client").value="";
    document.getElementById("description").value="";
    document.getElementById("start").value="";
    document.getElementById("end").value= "";
    setMembers([{members : ""}]);
    setFile([{ file : ""}]);
  }
  //select options //
  const options = [
    { value: 'planning', label: 'planning' },
    { value: 'in_progress', label: 'in progress' },
    { value: 'closed', label: 'closed' }
  ]

  function convertBase64(file) {
    return new Promise((resolve, reject) => {
     const fileReader = new FileReader();
     fileReader.readAsDataURL(file);
     fileReader.onload = () => {
       resolve(fileReader.result);
     };
     fileReader.onerror = (error) => {
       reject(error);
     };
   });
 }

  const customStyles = {  
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
   <form  onSubmit={addproject} encType = "multiple/form-data">
   <h1 className={styles.h1}>ADD PROJECT</h1>
   <div className={styles.div_section}>
      <div className={styles.div_left}>
        <input className={styles.input_item} 
               placeholder="Name" type="text" 
               onChange={(e)=>{setName(e.target.value)}} 
               id="name" 
               name="name" 
               required />
        <Select 
            isMulti
            placeholder="Select Members"
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
              className={styles.input_item}
              required
              />
              <label>Start Date : </label>
              <input type="date" 
              className={styles.input_item} 
              onChange={(e)=>{setStart(e.target.value)}} 
              id="start" 
              name="start" 
              required />
              <textarea className={styles.input_item} 
              placeholder="Description" 
              onChange={(e)=>{setDescription(e.target.value)}} 
              id="description" 
              name="description" 
              required/>
      </div>

   <div className={styles.div_right}>
      <input className={styles.input_item} placeholder="Client"  onChange={(e)=>{setClient(e.target.value)}} id="client" name="client" required />
      <Select 
                    name="state"
                    placeholder="Select States"
                    id="state"
                    onChange={(e) => {
                    setState(e)
                    }}
              options={options} 
              styles={customStyles}
              className={styles.input_item}
              required
              />
                <label>End Date : </label><br/>
                 <input type="date" className={styles.input_item}  onChange={(e)=>{setEnd(e.target.value)}} id="end" name="end" required />
                 <label className={styles.btn_file} >Upload files
                 <input type="file" className={styles.file_input} onChange={async (e) => {
                    var array = [];
                    const files = e.target.files;
                    for (let i = 0; i < files.length; i++) {
                     let file = files.item(i);
                     const base64 = await convertBase64(file);
                     array.push(base64);
                   }
                   setFile(array);
                 }}

                 id="file" multiple/></label>  
   </div>

   </div>
   <button className={styles.btn}>SAVE</button> 
   </form>
  )
}

export default AddProject;
