import React, { useState ,  useEffect , useContext } from 'react';
import axios from 'axios';
import Select  from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useParams } from "react-router-dom";
import styles from "../../../Css/Project.module.css";
import { AppContext } from "../../../Context/AppContext";
import Modal from 'react-modal';
import Pagination from './../../../components/Pagination';
import {toast} from 'react-toastify';
import { Link , withRouter } from "react-router-dom";

function ProjectList() {
    const [members , setMembers] = useState([]);
    const [membersList , setMembersList] = useState([]);
    const [projectList , setprojectList] = useState([]);
    useEffect(() => {
        axios.get("getprojects").then((res) => {
          if (res.data) {
            setprojectList(res.data);
          }})
    },[]);
    useEffect(() => {
        axios.get("/getmembers").then((res) => {
          if (res.data){
            var options = []
            res.data.map((element) => {
                options.push({value: element.firstName, label: element.firstName} );
            })
            setMembersList(options);
          }
        });
      }, []);

  return (
    <>
       
    </>
  )
}

export default ProjectList