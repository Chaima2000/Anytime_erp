import React , {useState} from 'react';
import styles from "../../Css/Contact.module.css";
import emailjs from 'emailjs-com';
const Result = () => {
  return ( 
    <p className={styles.showMsg}>Your message has been successfully sent. <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; We will contact you soon.</p>
  )
}
function Contact() {
  const [result, showResult] = useState(false);
  const contactForm = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_xtc8ywt', 'template_4rs1ggn', e.target, "bRBjGAR1Tjp0ZQSZO")
  .then ( (result) => {
    console.log(result.text);
  } , (error) => {
    console.log(error.text);
  });
  e.target.reset();
  showResult(true);
  };
  //Hide showMsg
  setTimeout( ()=> {
    showResult(false);
  }, 5000);
  
  return (
    <form className={styles.form} onSubmit={contactForm}>
      <h2 align="center">Contact Us</h2>
      <div className={styles.input_section}>
        <input  type="text" placeholder='Enter your full name' name="fullName" className={styles.input} /> <br /> <br />
        <input type="email" placeholder='Enter your Email' name="email" className={styles.input} /> <br /> <br />
        <input  type="number" placeholder='Enter your phone' name="phone" className={styles.input} /> <br /> <br />
        <textarea placeholder ='Enter your message' name="message" className={styles.textarea} /> <br /> <br />
      </div>
      <button className={styles.btn}> Send </button>
      <div>
        {result ? <Result/> : null}
      </div>
    </form>
  )
}

export default Contact


