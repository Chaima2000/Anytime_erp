import React ,  {useState} from 'react';
import axios from 'axios';


function QuickAccess(){
  const [quickaccess, setQuickacess] = useState([]);
  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    // Case 1 : The user checks the box
    if (checked) {
      setQuickacess([...quickaccess,value]);
    }
    
    // Case 2  : The user unchecks the box
else {
  setQuickacess([ quickaccess.filter((e) => e !== value)]);
  }
};

console.log(quickaccess)


      const addelement =(e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("quickaccess",quickaccess);
        const datax = {
          quickaccess:quickaccess,
        }
        axios.post("/addelement", datax).then((res)=>{
          if(res.data === "SUCCESS"){
            alert("check quick access")
          }else{
            alert("error")
          }
        }
        )}
  return (
    <>
        <form onSubmit={addelement}>
            <input type="checkbox" value="liste des utilisateurs" id="listUser" onChange={handleChange} />
            <label htmlFor='listUser'>Liste des utilisateurs</label><br />
            <input type="checkbox" value="liste des banques" id="listBank" onChange={handleChange} />
            <label htmlFor='listBank'>Liste des banques</label><br />
            <input type="checkbox" value="Ajouter un banque" id="Bank" onChange={handleChange} />
            <label htmlFor='Bank'>Ajouter banque</label><br />
            <input type="checkbox" value="liste des frais" id="listReceipts" onChange={handleChange} />
            <label htmlFor='listReceipts'>Liste des frais</label><br />
            <input type="checkbox" value="Ajouter un frais" id="Receipt" onChange={handleChange} />
            <label htmlFor='Receipt'>Ajouter frais</label><br />
            <input type="checkbox" value="Liste des chèques" id="listCheck" onChange={handleChange} />
            <label htmlFor='listCheck'>Liste des chèques</label><br />
            <input type="checkbox" value="Ajouter un chèque" id="Check" onChange={handleChange} />
            <label htmlFor='Check'>Ajouter chèque</label><br />
            <input type="checkbox" value="Liste des clients" id="listClient" onChange={handleChange} />
            <label htmlFor='listClient'>Liste des clients</label><br />
            <input type="checkbox" value="Ajouter un client" id="Client" onChange={handleChange} />
            <label htmlFor='Client'>Ajouter client</label><br />
            <input type="checkbox" value="Liste des projets" id="listProjet" onChange={handleChange} />
            <label htmlFor='listProjet'>Liste des projets</label><br />
            <input type="checkbox" value="Ajouter un projet" id="projet" onChange={handleChange} />
            <label htmlFor='projet'>Ajouter projet</label><br />
            <p name="response"  onChange={handleChange}>{quickaccess}<br /><br/></p>
            <button>Ajouter</button>
        </form>
    </>
  )
}

export default QuickAccess;
