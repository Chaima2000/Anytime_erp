import React ,  {useState, useEffect} from 'react';
import axios from 'axios';
import styles from '../../Css/QuickAccess.module.css';
import AOS from 'aos';
import Navbar from '../../components/Navbar';



function QuickAccess(){
  const [quickaccess, setQuickacess] = useState([]);
  useEffect(() => {
    AOS.init({
      duration:1000,
    });
  }, [])
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
    <Navbar>
       <form onSubmit={addelement}>
        <div className={styles.wrapper}>
          <div className={styles.contain} >
            <input type="checkbox" className={styles.input} value="liste des utilisateurs" id="listUser" onChange={handleChange} /><br/><br/>
            <div className={styles.label} data-aos="zoom-in">
             <label htmlFor='listUser'>Liste des utilisateurs</label><br />
            </div>
          </div>
          <div className={styles.contain} >
          <input type="checkbox" className={styles.input} value="liste des banques" id="listBank" onChange={handleChange} /><br/><br/>
            <div className={styles.label} data-aos="zoom-in">
            <label htmlFor='listBank'>Liste des banques</label><br />
            </div>
          </div>
          <div className={styles.contain} >
          <input type="checkbox" className={styles.input} value="Ajouter un banque" id="Bank" onChange={handleChange} /><br/><br/>
            <div className={styles.label} data-aos="zoom-in">
            <label htmlFor='Bank'>Ajouter <br/> banque</label><br />
            </div>
          </div>
          <div className={styles.contain} >
          <input type="checkbox"  className={styles.input} value="liste des frais" id="listReceipts" onChange={handleChange} /><br/><br/>
            <div className={styles.label} data-aos="zoom-in">
            <label htmlFor='listReceipts'>Liste des <br/> frais</label><br />
            </div>
          </div>
          <div className={styles.contain} >
          <input type="checkbox" className={styles.input} value="Ajouter un frais" id="Receipt" onChange={handleChange} /><br/><br/>
            <div className={styles.label} data-aos="zoom-in">
            <label htmlFor='Receipt'>Ajouter <br/>frais</label><br />
            </div>
          </div>
          <div className={styles.contain} >
          <input type="checkbox" className={styles.input} value="Liste des chèques" id="listCheck" onChange={handleChange} /><br/><br/>
            <div className={styles.label} data-aos="zoom-in">
            <label htmlFor='listCheck'>Liste des <br />chèques</label><br />
            </div>
          </div>
          <div className={styles.contain} >
          <input type="checkbox" className={styles.input} value="Ajouter un chèque" id="Check" onChange={handleChange} /><br/><br/>
            <div className={styles.label} data-aos="zoom-in">
            <label htmlFor='Check'>Ajouter <br/>chèque</label><br />
            </div>
          </div>
          <div className={styles.contain} >
          <input type="checkbox" className={styles.input} value="Liste des clients" id="listClient" onChange={handleChange} /><br/><br/>
            <div className={styles.label} data-aos="zoom-in">
            <label htmlFor='listClient'>Liste des <br/> clients</label><br />
            </div>
          </div>
          <div className={styles.contain} >
          <input type="checkbox" className={styles.input} value="Ajouter un client" id="Client" onChange={handleChange} /><br/><br/>
            <div className={styles.label} data-aos="zoom-in">
            <label htmlFor='Client'>Ajouter <br/> client</label><br />
            </div>
          </div>
          <div className={styles.contain} >
          <input type="checkbox" className={styles.input} value="Liste des projets" id="listProjet" onChange={handleChange} /><br/><br/>
            <div className={styles.label} data-aos="zoom-in">
            <label htmlFor='listProjet'>Liste des <br/> projets</label><br />
            </div>
          </div>
          <div className={styles.contain} >
          <input type="checkbox" className={styles.input} value="Ajouter un projet" id="projet" onChange={handleChange} /><br/><br/>
            <div className={styles.label} data-aos="zoom-in">
            <label htmlFor='projet'>Ajouter <br/> projet</label><br />
            </div>
          </div>
        </div>
        <button className="btn1 btn2">Ajouter à l'accés rapide</button>
        </form>
        </Navbar>
    </>
  )
}

export default QuickAccess;
