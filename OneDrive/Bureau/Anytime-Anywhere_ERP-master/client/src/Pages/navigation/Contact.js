import React , {useState} from 'react';
import axios from 'axios';
import styles from "../../Css/Contact.module.css";
import emailjs from 'emailjs-com';
const Result = () => {
  return ( 
    <p className={styles.showMsg}>Your message has been successfully sent. We will contact you soon.</p>
  )
}
function Contact() {
  const [result, showResult] = useState(false);
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [message , setmessage] = useState("");
  const success = () => {
    document.getElementById("fullName").value="";
    document.getElementById("email").value="";
    document.getElementById("phone").value="";
    document.getElementById("message").value=""
  }
  const contactForm = (e) => {
    e.preventDefault();
    axios.post("/contact", {
      fullName: fullName,
      email: email,
      phone:phone ,
      message: message, 
    }).then((res)=>{
      if(res.data === "ERROR"){
       alert("an error occured")
        }
      else{
        success();
      }
    });
    emailjs.sendForm('service_xtc8ywt', 'template_4rs1ggn', e.target, "bRBjGAR1Tjp0ZQSZO")
  .then ( (result) => {
    console.log(result.text);
  } , (error) => {
    console.log(error.text);
  });
  e.target.reset();
  showResult(true);
  };
  return (
    <>
    <form className={styles.form} onSubmit={contactForm}>
      <h2 align="center">Contact Us</h2>
      <div className={styles.input_section}>
        <input  type="text" id="fullName" placeholder='Enter your full name' name="fullName" onChange={(event) => {setfullName(event.target.value)}} className={styles.input} required /> <br /> <br />
        <input  type="email" id="email" placeholder='Enter your email' name="email" onChange={(event) => {setemail(event.target.value)}} className={styles.input} required /> <br /> <br />
        <input  type="number" id="phone" placeholder='Enter your phone' name="phone" onChange={(event) => {setphone(event.target.value)}} className={styles.input} required /> <br /> <br />
        <textarea id="message" placeholder ='Enter your message' name="message" onChange={(event) => {setmessage(event.target.value)}} className={styles.textarea} required /> <br /> <br />
      </div>
      <button className={styles.btn}> Send </button>
      <div>
        {result ? <Result/> : null}
      </div>
    </form>
    <div className={styles.one}></div>
    <div className={styles.two}></div>
    <div className={styles.three}></div>
    <div className={styles.four}></div>
    <div className={styles.five}></div>
    <div className={styles.six}></div>
    </>
  )
}

export default Contact


