import React , {useState} from 'react';
import {Link} from "react-router-dom";

const QuickAccess = ()  => {
    const [quickaccess, setQuickAccess] = useState({
        elements: [],
        response: [],
      });
      const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        const { elements } = quickaccess;
        console.log(quickaccess)
        // Case 1 : The user checks the box
        if (checked) {
          setQuickAccess({
            elements: [...elements, value],
            response: [...elements, value],
          });
        }
        // Case 2  : The user unchecks the box
    else {
        setQuickAccess({
          elements: elements.filter((e) => e !== value),
          response: elements.filter((e) => e !== value),
        });
      }
    };
  return (
    <>
        <form>
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
            <textarea name="response" value={quickaccess.response} onChange={handleChange}></textarea><br />
            <Listquickaccess value={quickaccess.response} />
        </form>

    </>
  )
}
function Listquickaccess(props){
    const [state, setState] = useState(false);
    const showDropdown=()=>{
        setState(true);
    }
    const hideDropdown = () =>{
        setState(false);
    }
  return (
      <Link className="dropdown-menu" onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
         dropdown
        { state ? ( <ul className="dropdown-list" onMouseEnter={showDropdown}>
            <li>{props.value}</li>
        </ul> ): 
        null}
      </Link>

  )
}
export default Listquickaccess;