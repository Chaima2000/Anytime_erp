import React, { useState , useEffect } from 'react';
import Select  from 'react-select';
import styles from '../../../Css/Project.module.css';
import axios from 'axios';
import swal from 'sweetalert';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import TextField from '@material-ui/core/TextField'; 
import Button from '@material-ui/core/Button';
toast.configure()


function AddProject(props) {
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
          options.push({value: element.society, label: element.society} );
        })
        setClientsList(options);
      }
    });
  }, []);
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
    background: 'white',
    opacity:1,
    outline: 'none',
    borderColor: '#9e9e9e',
    minHeight: '30px',
    height: '55px',
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
   <h1 className={styles.form_title}>ADD PROJECT</h1>
   <form  onSubmit={addproject} encType = "multiple/form-data" className={styles.form}>
      <div className={styles.div_Sides}>
          <TextField id="name" 
                      label="Project name " 
                      className={styles.select}
                      variant="outlined"
                      onChange={(e)=>{setName(e.target.value)}} 
                      required 
            /> 
            <br />
            <br />
              <TextField id="start" 
                      label = " Start date "
                      InputLabelProps={{ shrink: true, required: true }}
                      type="date"
                      className={styles.select}
                      variant="outlined"
                      onChange={(e)=>{setStart(e.target.value)}} 
                      required 
            /> 
            <br />
            <br />
          <TextField id="end" 
                      label = " End date "
                      InputLabelProps={{ shrink: true }}
                      type="date" 
                      className={styles.select}
                      variant="outlined"
                      onChange={(e)=>{setEnd(e.target.value)}} 
                      required 
          /> 
          <br />
          <br />
            <TextField id="description" 
                      multiline
                      label = " Description "
                      className={styles.select}
                      variant="outlined"
                      onChange={(e)=>{setDescription(e.target.value)}} 
                      required 
            />
      </div> 
      <div className={styles.div_Sides}>
        <div className={styles.select}>
          <Select 
                placeholder="Select Clients"
                name="clients"
                id="clients"
                onChange={(e) => {
                  setClient(e.label)
                }}
                styles={customStyles}
                options={clientsList} 
                required
          />
        </div>
        <br />
        <div className={styles.select}>
          <Select 
                isMulti
                placeholder="Select Members"
                name="members"
                id="state"
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
        </div>
        <br />
        <div className={styles.select}>
          <Select 
                placeholder="Select State"
                name="state"
                id="state"
                onChange={(e) => {
                  setState(e.label)
                }}
                styles={customStyles}
                options={options} 
                required
          />
        </div>
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
            <label htmlFor="file">
              <Button variant="contained" color="default" component="span" className={styles.upload_btn}>
                Upload Files
              </Button>
            </label>
        </div>
      </div>
          <button type="reset" className={styles.btn}> SAVE </button> 
   </form>
   </>
  )
}

export default AddProject;
