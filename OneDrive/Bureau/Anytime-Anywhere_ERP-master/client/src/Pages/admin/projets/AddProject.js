import React, { useState , useEffect } from 'react';
import Select  from 'react-select';
import styles from '../../../Css/Client.module.css';
import Styles from '../../../Css/Project.module.css';
import axios from 'axios';
import swal from 'sweetalert';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure()


function AddProject() {
  const [name , setName] = useState("");
  const [state , setState] = useState("");
  const [client , setClient] = useState("");
  const [clientsList , setClientsList] = useState([]);
  const [description , setDescription] = useState("");
  const [start , setStart] = useState("");
  const [end , setEnd] = useState("");
  const [membersList , setMembersList] = useState([]);
  const [members , setMembers] = useState([]);

  const [file , setFile] = useState([]);
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
  const success = () => {
    document.getElementById("name").value="";
    document.getElementById("description").value="";
    document.getElementById("start").value="";
    document.getElementById("end").value= "";
  }
  //State options //
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
  control: (provided , state) => ({
    ...provided,
    border: state.isFocused ? 0 : 0,
    paddingLeft:'4px',
    fontSize: '10',
    background: 'rgba(224, 222, 222, 0.2)',
    opacity:1,
    outline: 'none',
    width: '1300',
    borderRadius: '35px',
    height: '19px',
    boxShadow: state.isFocused ? null : null,
  })
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
    <>
      <section className={styles.section}>        
        <div className={styles.container}>
          <div className={styles.form }>
            <form onSubmit={addproject}>
              <h2 className={styles.h2}>Add project: </h2>
              <div className={styles.div1}>
              <input type="text" id="name" className={styles.formInput} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter name ..." required  /> <br /><br />
              Start date:
              <input type="date" id="start" className={styles.formInput} onChange={(e)=>{setStart(e.target.value)}} placeholder="Start date" required /> <br /> <br />
              End date:
              <input type="date" id="end" className={styles.formInput} onChange={(e)=>{setEnd(e.target.value)}}  placeholder="End date"  /> <br />
              <textarea id="description" className={styles.formInput} onChange={(e)=>{setDescription(e.target.value)}} placeholder=" Enter description ..."  required  /> <br />
              </div>
              <div className={styles.div2}>
              <br />
                <Select 
                      placeholder="Select Client"
                      name="client"
                      id="client"
                      onChange={(e) => {
                        setClient(e.value)
                      }}
                      styles={customStyles}
                      options={clientsList} 
                      required
                />
              <br /> <br /><br />
          <Select 
                isMulti
                placeholder="Select Member"
                name="members"
                id="members"
                onChange={(e) => {
                  let values =[]
                  e.forEach(element=>{
                  values.push(element.value)
                  })
                  setMembers(values)
                }}
                styles={customStyles}
                  options={membersList} 
                  required
          />
        <br /> <br />
          <Select 
                placeholder="Select State"
                name="state"
                id="state"
                onChange={(e) => {
                  setState(e.label)
                }}
                styles={customStyles}
                options={options} 
                
          />
        <div>
        <br />
            <input
              accept="image/*"
              id="file"
              multiple
              type="file"
              style={{display: 'none'}}
              onChange={async (e) => {
                          var array = [];
                          const files = e.target.files;
                          for (let i = 0; i < files.length; i++) {
                          let file = files.item(i);
                          const base64 = await convertBase64(file);
                          array.push(base64);
                        }
                        setFile(array);
                      }}
            />
            <label htmlFor="file" className={Styles.btnUpload}>
                Upload Files
              </label>
        </div>
        </div>
        <button className={styles.btn}>SAVE</button>
            

        </form> 
  </div>
  </div>
  </section>
   </>
  )
}

export default AddProject;
