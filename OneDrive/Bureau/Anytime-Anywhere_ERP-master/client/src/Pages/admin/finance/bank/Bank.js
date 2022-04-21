import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../../../Css/Bank.module.css";
import Modal from 'react-modal';
import axios from "axios";

function Bank() {
  const [banksList, setBanksList] = useState([]);
  const [waiting, setWaiting] = useState(true);
  const [DeleteBank  , setDeleteBank] = useState({});
  const [deleteItem,setDeleteItem] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm , setSearchTerm]= useState("");
  const [allPages, setAllPages] = useState([]);

  const Delete = () => {
    setDeleteItem(true);
}
  function deleteBank(id) {
    axios.delete(`/deletebank/${id}`).then((res) => {
      if (res.data === "ERROR") {
        alert("An error occured");
      } else {
            axios.post("/getbanks").then((res) => {
              setBanksList(res.data.banks);
            });  
          }
        })
      }
      function resetSearch() {
        document.getElementById("searchField").value = "";
        axios.post("/getbanks").then((res) => {
          if (res.data === "ERROR") {
            alert("error !");
          } else {
            setBanksList(res.data.banks);
            setAllPages(res.data.allPages);
          }
        });
  }
      function getBanks(page) {
        axios
          .post("/getbanks", { currentPage: page, searchTerm: searchTerm })
          .then((res) => {
            if (res.data === "ERROR") {
              alert("error !");
            } else {
              setWaiting(false);
              setBanksList(res.data.banks);
              setAllPages(res.data.allPages);
            }
          });
      }
      useEffect(() => {
        getBanks(currentPage);
      }, []);
  // function commafy(num) {
  //   var str = num.toString().split(".");
  //   if (str[0].length >= 5) {
  //     str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  //   }
  //   if (str[1] && str[1].length >= 5) {
  //     str[1] = str[1].replace(/(\d{3})/g, "$1 ");
  //   }
  //   return str.join(".");
  // }
  return (
    <>
        <form 
        onSubmit={(e) => {
              document.getElementById("searchField").disabled = true;
              document.getElementById("resetBtn").hidden = false;
              document.getElementById("searchBtn").hidden = true;
              e.preventDefault();
              getBanks();
              setCurrentPage(1);
            }}
        className={styles.search_form}
        >
        <input
                  id="searchField"
                  required
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  className={styles.formInput}
                  type="text"
                  placeholder="Project Name ..."
                />
                <button id="searchBtn" className="transparentBtn">
                          <FontAwesomeIcon icon={solid("search")} size="lg" />
                </button>
                <button
                          type="button"
                          onClick={() => {
                            resetSearch();
                            document.getElementById("searchField").disabled = false;
                            document.getElementById("resetBtn").hidden = true;
                            document.getElementById("searchBtn").hidden = false;
                          }}
                          hidden
                          id="resetBtn"
                          className="transparentBtn"
                >
                          <FontAwesomeIcon icon={solid("undo")} size="lg" />
                </button>
    </form>
    <br />
    <br />
      <section className="container">
        {waiting ? (
          <div className="row">
            <FontAwesomeIcon icon={solid("spinner")} size={"2x"} spin />
          </div>
        ) : (
          <div className="row">
          <div align="center" className="col3">
              <Link to="/banks/add">
                <FontAwesomeIcon
                  className="addBtn"
                  icon={solid("plus-circle")}
                  size={"2x"}
                />
              </Link>
            </div>
            {banksList.map((bank) => {
              return (
                <>
                <div key={bank._id} className="col3">
                  <p>Name: <span className={styles.span}>{bank.name}</span></p>
                  <p>Balance: <span className={styles.span}>{bank.balance}</span></p>
                  <p>Description: <span className={styles.span}>{bank.description}</span></p>
                  <Link to={`/bank/details/${bank._id}`}><span className={styles.icons}><FontAwesomeIcon icon={solid("file")} color = "#663399" /></span></Link>
                  <span onClick = {() => {setDeleteBank(bank) ; Delete()}} className={styles.icons}> <FontAwesomeIcon icon={solid("trash")} color = "#9f4576" /> </span>
                </div>
                <Modal isOpen={deleteItem} onRequestClose = {() => setDeleteItem(false)} 
                                              shouldCloseOnOverlayClick={true} style = {
                                                {  
                                                  overlay : {
                                                    backgroundColor : '#00000020'
                                                  },
                                                  content : {
                                                      color : 'black' , 
                                                      outline: 'none',
                                                      backgroundColor : 'white',
                                                      width: '400px',
                                                      height: '195px',
                                                      padding : '5px',
                                                      position : 'relative',
                                                      top:'25%',
                                                      left: '35%',
                                                      borderRadius: '15px'
                                                      },
                                              }
                                              }>
                    <h5  className={styles.ModalParagraph}>Do you want to delete {DeleteBank.name} ? <br/></h5>
                    <div className={styles.btn_section}>
                      <input type="button"  value="CANCEL"  className= {styles.white_btn}   onClick= {() => setDeleteItem(false)} />
                      <input type="button"  value="CONFIRM" className= {styles.confirm_btn}  onClick={()=> {setDeleteItem(false) ; deleteBank(DeleteBank._id)}}/>
                    </div>
              </Modal>
                </>
              );
            })}
            
          </div>
        )}
        <br/>
      </section>
      <div className="paginationContainer">
      {allPages.map((page) => {
        if (page === currentPage) {
          return (
            <div
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        getBanks(page);
                      }}
                      className="activePagination"
            >
              {page}
            </div>
                  );
        } else {
                  return (
                    <div
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        getBanks(page);
                      }}
                      className="pagination"
                    >
                      {page}
                    </div>
                  )}
      })}
    </div>
    </>
  );
}

export default Bank;