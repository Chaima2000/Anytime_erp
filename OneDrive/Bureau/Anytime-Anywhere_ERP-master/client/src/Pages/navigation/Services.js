import React, {useEffect} from 'react';
import  Slider from 'react-slick';
import AOS from 'aos';
import styles from './../../Css/Services.module.css';
import styled from "styled-components";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
    <section className={styles.services} id="services"  >
         <FontAwesomeIcon icon={solid("bookmark")} color="#682860" className={styles.bookMark} />
         <h2>Notre Services</h2>
        <div id="body" >
         <div id="scene" data-aos="flip-right">
        <div id="left-zone">
            <ul className="list">
                <li className="item"><input type="radio" id="radio_The garden strawberry" name="basic_carousel"/><label className="label_strawberry" for="radio_The garden strawberry"><FontAwesomeIcon icon={solid("project-diagram")} size="lg" /> Service n°1:</label>
                    <div className="content content_strawberry"><span className="picto"></span>
                        <h1>Suivi du projet</h1>
                        <p>Avoir toute l'information pour piloter ses projets et améliorer la rentabilité: <br/><br/>
                        -Suivi des temps passés sur le projet <br/><br/>
                        -Suivi des tâches du projet<br/><br/>
                        -Diagrammes de Gantt</p>
                    </div>
                </li>
                
                <li className="item"><input type="radio" id="radio_The apple" name="basic_carousel"/><label className="label_apple" for="radio_The apple"> <FontAwesomeIcon icon={solid("users")} size="lg" />  Service n°2:</label>
                    <div className="content content_apple"><span className="picto"></span>
                        <h1>Gestion de la clientèle</h1>
                        <p>Erp permet d'enregistrer et de suivre l'ensemble des échanges commerciaux avec les clients.Il enregistrent tous les contacts et demandes entrants et sortants(emails,sms..)</p>
                    </div>
                </li>
                <li className="item"><input type="radio" id="radio_The banana" name="basic_carousel" /><label className="label_banana" for="radio_The banana"> <FontAwesomeIcon icon={solid("chart-line")} size="lg" /> Service n°3:</label>
                    <div className="content content_banana"><span className="picto"></span>
                        <h1>Pilotage de la performance</h1>
                        <p>L'erp donne l'accès à des indicateurs de gestion et de performance qui permet d'améliorer la gouvernance des activité (Tableaux de bord intégrés qui contient les avancements réalisés par les employés de l'entreprise, les nombre des projets terminés etc ...).</p>
                    </div>
                </li>
                <li className="item"><input type="radio" id="radio_The orange" name="basic_carousel" /><label className="label_orange" for="radio_The orange">Service n°4:</label>
                    <div className="content content_orange"><span className="picto"></span>
                        <h1>Gestion financière</h1>
                        <p>La conformité financière est indispensable pour toutes les entreprises.C'est là où les logiciels ERP interviennent, ils garantissent que les entreprises disposent de capacités de suivi avec des pistes d'audit, de sorte qu'elles ne se retrouvent jamais dans une mauvaise posture. </p>
                    </div>
                </li>
            </ul>
        </div>
        <div id="middle-border"></div>
        <div id="right-zone"></div>
    </div>
    </div> 
   </section>
    </>
  )
  }

export default Services