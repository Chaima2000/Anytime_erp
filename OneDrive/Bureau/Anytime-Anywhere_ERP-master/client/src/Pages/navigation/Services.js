import React, {useEffect} from 'react';
import  Slider from 'react-slick';
import AOS from 'aos';
import styles from './../../Css/Services.module.css';
import styled from "styled-components";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Slide} from 'react-slideshow-image';
import {BsHexagon} from "react-icons/bs";
import frame from "../../Css/Frame 19.PNG";
import { BiBarChartAlt } from "react-icons/bi";
import {BiGroup} from "react-icons/bi";
import {BiCoinStack} from "react-icons/bi";
import download from '../../uploads/download.png';


function Services() {
  const settings = {
    dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide:1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
  useEffect(() => {
    AOS.init({
      duration:1000,
    });
  }, [])
  const SliderArrow = styled.div `
  .slick-arrow{
    background-color: #cf3476;
    height: 40px;
    width: 40px;
    border-radius: 100px;
  }`
  return (
    <>
    <section className={styles.services} id="services" >
         <FontAwesomeIcon icon={solid("bookmark")} color="#682860" className={styles.bookMark} />
         <h2>Our Services</h2>
         
         <SliderArrow>
         <Slider {...settings} className={styles.slider}>
          <div className={styles.card}>
            <h3> Suivi de projet</h3>
            <p className={styles.p}> Avoir toute l'information pour piloter ses projets et améliorer la rentabilité: 
                  <ul><li>-Suivi des temps passés sur le projet</li></ul>
                  <ul><li>-Suivi des coûts du projet et rentabilité</li></ul>
                  <ul><li>-Etat d'avancement de facturation</li></ul>
                  <ul><li>-Suivi des tâches du projet</li></ul>
                  <ul><li>-Diagrammes de Gantt</li></ul>
            </p>
          </div>
       
       <div className={styles.card}>
         <h3> Gestion des clients</h3>
          <p className={styles.p}> Avoir toute l'information pour piloter ses projets et améliorer la rentabilité: 
                <ul><li>Suivi des temps passés sur le projet</li></ul>
                <ul><li>Suivi des coûts du projet et rentabilité</li></ul>
                <ul><li>Etat d'avancement de facturation</li></ul>
                <ul><li>Suivi des tâches du projet</li></ul>
                <ul><li>Diagrammes de Gantt</li></ul>
          </p>
       </div>
       <div className={styles.card}>
         <h3> Gestion des clients</h3>
          <p className={styles.p}> Avoir toute l'information pour piloter ses projets et améliorer la rentabilité: 
                <ul><li>Suivi des temps passés sur le projet</li></ul>
                <ul><li>Suivi des coûts du projet et rentabilité</li></ul>
                <ul><li>Etat d'avancement de facturation</li></ul>
                <ul><li>Suivi des tâches du projet</li></ul>
                <ul><li>Diagrammes de Gantt</li></ul>
          </p>
       </div>
       
       </Slider>
       </SliderArrow>
      
        {/* <div className={styles.title}>
          <FontAwesomeIcon icon={solid("bookmark")} color="#682860" className={styles.bookMark} />
          <h2>Our Services</h2> */}
          {/* <p className={styles.p}>
            gfvbhklmlmù
          </p> */}
        {/* </div> */}
      {/* <div className={styles.content}>
        <div className={styles.left} data-aos="zoom-in-up">
            <img src={frame} />
        </div>
        <div className={styles.right} data-aos="zoom-in-up" >
          <div className={styles.floatting_icon}>
          <div className={styles.right}>
          <div className={styles.floatting_icon}>
            <div className={styles.service}>
              <div className={styles.service_icon}>
                <BsHexagon color="#915c83" size={55} />
                <div className={styles.inner_icons}>
                  <BiBarChartAlt size={25} color="#6495ed" />
                </div>
              </div>
              <div className= {styles.service_text}>
                <h3> Suivi de projet</h3>
                <p className={styles.p}> Avoir toute l'information pour piloter ses projets et améliorer la rentabilité: 
                <ul><li>Suivi des temps passés sur le projet</li></ul>
                <ul><li>Suivi des coûts du projet et rentabilité</li></ul>
                <ul><li>Etat d'avancement de facturation</li></ul>
                <ul><li>Suivi des tâches du projet</li></ul>
                <ul><li>Diagrammes de Gantt</li></ul></p>
              </div> 
            </div>
            <div className={styles.service}>
              <div className={styles.service_icon}>
                <BsHexagon color="#915c83" size={55} />
                <div className={styles.inner_icons}>
                <BiGroup color="#6495ed" size={25}/>
                </div>
              </div>
              <div className= {styles.service_text}>
                <h3> Gestion des clients</h3>
                <p className={styles.p}> hello and welcome</p>
              </div> 
            </div>
            <div className={styles.service}>
              <div className={styles.service_icon}>
                <BsHexagon color="#915c83" size={55} />
                <div className={styles.inner_icons}>
                  <BiCoinStack size={25} color="#6495ed" />
                </div>
              </div>
              <div className= {styles.service_text}>
                <h3> Gestion des finances</h3>
                <p className={styles.p}> hello and welcome</p>
              </div> 
            </div>
            <div className={styles.service}>
              <div className={styles.service_icon}>
                <BsHexagon color="#915c83" size={55} />
                <div className={styles.inner_icons}>
                  <BiGroup size={25} color="#6495ed" />
                </div>
              </div>
              <div className= {styles.service_text}>
                <h3> Gestion des RH</h3>
                <p className={styles.p}> hello and welcome</p>
              </div> 
            </div>
          </div>
         </div>




            
              
            
          </div>
        </div>
      </div> */}
   </section>
    
    </>
  )
}

export default Services