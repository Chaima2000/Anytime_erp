import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../Css/Users.module.css";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
/************************************************************************* */
function Users() {
  const [usersList, setUsersList] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [userId, setUserId] = useState("");
  const [action, setAction] = useState("");
  const [msg, setMsg] = useState("");
  const [role, setRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allPages, setAllPages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [waiting, setWaiting] = useState(true);

/************************************************************************* */
  function toggleAlert() {
    setAlertVisible(!alertVisible);
  }
/************************************************************************* */
  function toggleActivateUser() {
    axios.post("/toggleactivateUser", { id: userId }).then((res) => {
      if (res.data === "ERROR") {
        alert("An error occured");
      } else {
        axios.post("/getusers").then((res) => {
          setUsersList(res.data.users);
        });
      }
    });
  }
/************************************************************************* */
  function deleteUser() {
    axios.delete(`/deleteuser/${userId}`).then((res) => {
      if (res.data === "ERROR") {
        alert("An error occured");
      } else {
        axios.post("/getusers").then((res) => {
          setUsersList(res.data.users);
        });
      }
    });
  }
/************************************************************************* */
  function getUsers(page) {
    axios
      .post("/getusers", { currentPage: page, searchTerm: searchTerm })
      .then((res) => {
        if (res.data === "ERROR") {
          alert("error !");
        } else {
          setWaiting(false);
          setUsersList(res.data.users);
          setAllPages(res.data.allPages);
        }
      });
  }
/************************************************************************* */
  function resetSearch() {
    document.getElementById("searchField").value = "";
    axios.post("/getusers").then((res) => {
      if (res.data === "ERROR") {
        alert("error !");
      } else {
        setUsersList(res.data.users);
        setAllPages(res.data.allPages);
      }
    });
  }
/************************************************************************* */
  function changeRole() {
    axios.post("/changerole", { id: userId, role: role }).then((res) => {
      if (res.data === "ERROR") {
        alert("An error occured");
      } else {
        getUsers();
      }
    });
  }
/************************************************************************* */
  useEffect(() => {
    getUsers(currentPage);
  }, []);
/************************************************************************* */
  return (
    <>
      {alertVisible ? (
        <div
          onClick={() => {
            toggleAlert();
          }}
          className="blur"
        >
          <div className="alertBox">
            <h4>{msg}</h4>
            <hr />
            <div className="buttonContainer">
              <Button
                onClick={() => {
                  toggleAlert();
                }}
                variant="text"
                size="small"
              >
                Annuler
              </Button>
              &nbsp;
              <Button
                onClick={() => {
                  if (action === "activation") {
                    toggleActivateUser();
                  } else if (action === "roleChange") {
                    changeRole();
                  } else if (action === "deleteUser") {
                    deleteUser();
                  }
                }}
                variant="contained"
                size="small"
              >
                Confirmer
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <section className={styles.container}>
        <h2>Gestion des utilisateurs</h2>
        <h3 className={styles.searchField}>
          <form
            onSubmit={(e) => {
              document.getElementById("searchField").disabled = true;
              document.getElementById("resetBtn").hidden = false;
              document.getElementById("searchBtn").hidden = true;
              e.preventDefault();
              getUsers();
              setCurrentPage(1);
            }}
          >
            <input
              id="searchField"
              required
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className={styles.formInput}
              type="text"
              placeholder="Nom de l'utilisateur ..."
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
        </h3>
        <hr />

        {waiting ? (
          <div className={styles.spinner}>
            <FontAwesomeIcon icon={solid("spinner")} spin size="3x" />
          </div>
        ) : (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Rôle</th>
                  <th>Activation</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>{user.firstName} {user.lastName}</td>
                      <td>
                        <select
                          className="select"
                          defaultValue={user.role}
                          onChange={(e) => {
                            setUserId(user._id);
                            setAction("roleChange");
                            setRole(e.target.value);
                            setMsg(
                              "Voulez-vous vraiment changer le rôle de " +
                                user.firstName + 
                                " vers " + 
                                e.target.value +
                                "?"
                            );
                            toggleAlert();
                          }}
                        >
                          <option value="USER">UTILISATEUR</option>
                          <option value="SUPER-ADMIN">SUPER-ADMIN</option>
                          <option value="ADMIN">ADMIN</option>
                          <option value="DEVELOPER">DEVELOPPEUR</option>
                          <option value="DESIGNER">DESIGNER</option>
                          <option value="MARKETING">MARKETING</option>
                        </select>
                      </td>
                      <td>
                        <Switch
                          checked={user.active}
                          onChange={() => {
                            setUserId(user._id);
                            if (user.active) {
                              setMsg(
                                "Voulez-vous vraiment désactiver le compte de  " +
                                  user.firstName + 
                                  "?"
                              );
                            } else {
                              setMsg(
                                "Voulez-vous vraiment activer le compte de  " +
                                  user.firstName + 
                                  "?"
                              );
                            }
                            setAction("activation");
                            toggleAlert();
                          }}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </td>
                      <td>
                      <Tippy content='voir'>
                        <Link
                          to={`/users/profile/${user._id}`}
                          className="primaryBtn"
                        >
                        
                          <FontAwesomeIcon icon={solid("file")} />
                        </Link>
                      </Tippy>
                        &nbsp;
                      <Tippy content='supprimer'>
                        <span
                          onClick={() => {
                            setUserId(user._id);
                            setAction("deleteUser");
                            setMsg(
                              "Voulez-vous vraiment supprimer le compte de  " +
                                user.firstName + "?"+
                                ". Cette action ne peut pas être annulée!"
                            );
                            toggleAlert();
                          }}
                          className="dangerBtn"
                        >
                          <FontAwesomeIcon icon={solid("trash")} />
                        </span>
                      </Tippy>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="paginationContainer">
              {allPages.map((page) => {
                if (page === currentPage) {
                  return (
                    <div
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        getUsers(page);
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
                        getUsers(page);
                      }}
                      className="pagination"
                    >
                     {page}
                    </div>
                  );
                }
              })}
            </div>
          </>
        )}
      </section>
    </>
  );
}
export default Users;