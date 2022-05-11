import React , {useState ,  useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import styles from '../../../Css/Task.module.css';
function EditExpenses() {
    const [expenses, setExpenses]= useState([]);
    const [expenseValue,setExpenseValue]= useState("");

    let { id } = useParams();
    const customStyles = {
        control: (provided , state) => ({
          ...provided,
          border: state.isFocused ? 0 : 0,
          paddingLeft:'4px',
          border: ' 1px solid rgb(212, 211, 211) ',
          fontSize: '10',
          background: 'rgba(224, 222, 222, 0.2)',
          opacity:1,
          outline: 'none',
          width: '82%',
          borderRadius: '35px',
          height: '48px',
          boxShadow: state.isFocused ? null : null,
        })
      }
    useEffect(() => {
        axios.post("/getExpense",{ id: id }).then((res) => {
          if (res.data) {
            setExpenses(res.data);
          }
        });
      },[]);
      //State options //
  const options = [
    { value: 'planning', label: 'planning' },
    { value: 'in_progress', label: 'in progress' },
    { value: 'closed', label: 'closed' }
  ]
 
  const updateExpense = (id) => {
    axios.put(`/editExpense/${id}`, {expenseValue:expenseValue, id:id })
    .then((res) => {
      if (res.data === "ERROR") {
        alert("An error occured");
      } else {
        setExpenses(res.data);
    } 
    })
    }
  return (
    <>
    <form className={styles.bloc}>
    <h3>Nom :  {expenses.expenseName} </h3>
    <h3>Description :  {expenses.expenseDescription} </h3>
    <h3>Valeur: {expenses.expenseValue} DT</h3>
    <input placeholder='Modifier la valeur' type="number" className={styles.formInput} name="expenseValue" onChange= {(e)=>{setExpenseValue(e.target.value)}} />
    <br />
    <br />
    <button onClick={()=>{updateExpense(expenses._id)}} className="defaultBtn">Enregistrer</button>
    </form>
    </>
  )
}



export default EditExpenses