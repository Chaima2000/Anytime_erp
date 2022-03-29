import React from 'react';
import { Dialog, DialogTitle , DialogContent } from "@material-ui/core";


function Popup(props) {
    const { title , children , isOpen , setIsOpen} = props;
    // const [isSubmit, setSubmit] = useState(false);

    // const toggleSubmit = () => {
    //   setSubmit(!isSubmit);
    // }
    // const Task = props => {
    //   return ( 
    //     <div className={Styles.taskbox}>
    //       {props.taskContent}
    //     </div>
    //   )
    // }
  return (
    <Dialog open={isOpen}>
    <DialogTitle>
        {title}
    </DialogTitle>
    <DialogContent>
        <h5>Name of project : {props.name}</h5>
        <h5>Assigned by : {props.assignedBy}</h5>
        <h5>Assigned to : {props.assignedTo} </h5>
        <h5>description : {props.description}</h5>
        <h5> Start at : {props.start} </h5>
        <h5> End at :{props.end} </h5>
        <h5> State : {props.state} </h5>
        <h5> List of tasks : </h5>
        <input type="button" value =" addTask" /> <br/><br/>
        {/* {isSubmit 
        return(
          <> 
          <input type="text" placeholder='Name of Task' />
          <input type="text" placeholder=' Description' />
          <input type="button" value ="Save" />
          </>
        })
       */}

   </DialogContent>
    </Dialog>
  )
}

export default Popup