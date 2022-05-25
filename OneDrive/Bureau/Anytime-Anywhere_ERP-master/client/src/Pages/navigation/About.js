import React from 'react'
import styles from "../../Css/About.module.css";
function About() {
  return (
    <>
    <section className={styles.about} id="About">
        <div className={styles.left} data-aos="fade-up-right"></div>
        <div className={styles.right} data-aos="fade-up-left">
          <div className={styles.content}>
            <h1>chaima</h1>
            <p>sassi</p>
          </div>
        </div>
    </section>
    </>
  )
}

export default About