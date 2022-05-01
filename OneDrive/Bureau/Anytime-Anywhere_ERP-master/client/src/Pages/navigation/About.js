import React from 'react'
import styles from "../../Css/About.module.css";
function About() {
  return (
    <>
    <section className={styles.download} id="About">
        <div className={styles.container}>
            <h2>About Us</h2>
            <p className={styles.p}>Our apps are available for download on all stores</p>
            <div className={styles.icons}>
              <div className={styles.icon}>
              <p>paragh </p>
              </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default About