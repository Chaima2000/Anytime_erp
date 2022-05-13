import React , {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import styles from '../../../../Css/Bank.module.css';


function EditBank() {
    const [bank, setbank] = useState([]);
    let { id } = useParams();
    useEffect(() => {
        axios.post("/getbank",{ id: id }).then((res) => {
          if (res.data) {
            setbank(res.data);
          }
        });
      },[]);
  return (
    <div className={styles.bloc}>
        Name: <b>{bank.name}</b><br />
        Balance: <b>{bank.balance}</b> <br />
        Description: <b>{bank.description}</b><br />
    </div>
  )
}

export default EditBank