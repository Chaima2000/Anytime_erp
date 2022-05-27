import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Css/Navbar.module.css";
import Sidebar from "./Sidebar";
import ProfileDropdown from "./ProfileDropdown";
import { AppContext } from "../Context/AppContext";
import { useHistory } from "react-router-dom";
import { logout } from "./functions/logout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useEffect } from "react";
import axios from "axios";

function Navbar(props) {
  const [table , setOption] = useState([]);
  const { user, closeSidebar } = useContext(AppContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfileMobileMenu, setShowProfileMobileMenu] = useState(false);
  const history = useHistory();
  const clicked = (data) =>{
    var string=``;
    if(data === "liste des utilisateurs"){
      return(
      string=`users`
      )
    }else if (data === "liste des banques"){
       return(
         string=`banks`
       )
    }else if (data === "Ajouter un banque"){
      return(
        string=`banks/add`
      )
    }else if (data === "Ajouter un frais"){
      return(
        string=`receipts/add`
      )
    }else if ( data === "Ajouter un chèque"){
      return (
        string=`checks`
      )
    }else if (data === "Liste des clients"){
      return (
        string= `clients`
      )
    }else if (data === "Ajouter un client"){
      string = `clients/add`
    }else if (data === "Liste des projets"){
      string=`projectList`
    }else if (data === "Ajouter un projet" ){
     string = `projects/add`
    }
  }
  function closeMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.remove(styles.openMobileMenu);
  }
  useEffect (() =>{
      axios.post("/getElements").then( (res) => {
        if(res.data){
          setOption(res.data);
        }
      })
  },[])

  function toggleMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    if (menu.classList.contains(styles.openMobileMenu)) {
      menu.classList.remove(styles.openMobileMenu);
    } else {
      menu.classList.add(styles.openMobileMenu);
    }
  }

  function closeProfileMenu() {
    setShowProfileMenu(false);
  }

  function toggleProfileMenu() {
    setShowProfileMenu(!showProfileMenu);
  }

  function toggleProfileMobileMenu() {
    setShowProfileMobileMenu(!showProfileMobileMenu);
  }

  const [state, setState] = useState(false);
  const showDropdown=()=>{
        setState(true);
  }
  const hideDropdown = () =>{
        setState(false);
  }

  let userConnectedMobileRoutes = (
    <>
      <div className={styles.mobileNavItem}>
        <ul>
          <li className={styles.li}>
            <img
              onClick={() => {
                toggleProfileMobileMenu();
              }}
              className={styles.profile}
              src={user.image}
              alt="logo"
            />
          </li>
        </ul>
        <ul
          onClick={() => {
            closeMobileMenu();
          }}
        >
          {showProfileMobileMenu ? (
            <>
              <li className={styles.li}>Gestion du profile</li>
              <li className={styles.li}>
                <form
                  onSubmit={() => {
                    logout();
                    history.push("/");
                  }}
                >
                  <button className="actionBtn">Logout</button>
                </form>
              </li>
            </>
          ) : (
            <></>
          )}
          <li className={styles.li}>
            <Link className={styles.mobileLink} to="/">
              Bienvenue !
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
  let teamConnectedMobileRoutes = (
    <>
      <div
        onClick={() => {
          closeSidebar();
        }}
        className={styles.mobileNavItem}
      >
        <ul>
          <li className={styles.li}>
            <img
              onClick={() => {
                toggleProfileMobileMenu();
              }}
              className={styles.profile}
              src={user.image}
              alt="logo"
            />
          </li>
        </ul>
        <ul
          onClick={() => {
            closeMobileMenu();
          }}
        >
          {showProfileMobileMenu ? (
            <>
              <li className={styles.li}>Gestion du profile</li>
              <li className={styles.li}>
                <form
                  onSubmit={() => {
                    logout();
                    history.push("/");
                  }}
                >
                  <button className="actionBtn">Logout</button>
                </form>
              </li>
            </>
          ) : (
            <></>
          )}
          <li className={styles.li}>
            <Link className={styles.mobileLink} to="/">
              Tableau du bord
            </Link>
          </li>
          <li className={styles.li}>
          
            <Link className={styles.mobileLink} to="/quickaccess">
              Accés rapide
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
  let adminConnectedMobileRoutes = (
    <>
      <div
        onClick={() => {
          closeSidebar();
        }}
        className={styles.mobileNavItem}
      >
        <ul>
          <li className={styles.li}>
          <img
              onClick={() => {
                toggleProfileMobileMenu();
              }}
              className={styles.profile}
              src={user.image}
              alt="logo"
            />
          </li>
        </ul>
        <ul
          onClick={() => {
            closeMobileMenu();
          }}
        >
          {showProfileMobileMenu ? (
            <>
              <li className={styles.li}>Gestion du profile</li>
              <li className={styles.li}>
                <form
                  onSubmit={() => {
                    logout();
                    history.push("/");
                  }}
                >
                  <button className="actionBtn">Logout</button>
                </form>
              </li>
            </>
          ) : (
            <></>
          )}
          <li className={styles.li}>
            <Link className={styles.mobileLink} to="/">
              Tableau du bord
            </Link>
          </li>
          <li className={styles.li}>
            <Link className={styles.mobileLink} to="/quickaccess" onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
                Accés rapide
                { state ? ( <ul className="dropdown-list" onMouseEnter={showDropdown}>
                            <li>value2</li>
                          </ul> ): 
                null}
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
  let superAdminConnectedMobileRoutes = (
    <>
      <div
        onClick={() => {
          closeSidebar();
        }}
        className={styles.mobileNavItem}
      >
        <ul>
          <li className={styles.li}>
            <img
              onClick={() => {
                toggleProfileMobileMenu();
              }}
              className={styles.profile}
              src={user.image}
              alt="logo"
            />
          </li>
        </ul>
        <ul
          onClick={() => {
            closeMobileMenu();
          }}
        >
          {showProfileMobileMenu ? (
            <>
              <li className={styles.li}>Gestion du profile</li>
              <li className={styles.li}>
                <form
                  onSubmit={() => {
                    logout();
                    history.push("/");
                  }}
                >
                  <button className="actionBtn">Se déconnecter</button>
                </form>
              </li>
            </>
          ) : (
            <></>
          )}
          <li className={styles.li}>
            <Link className={styles.mobileLink} to="/">
              Tableau du bord
            </Link>
          </li>
          <li className={styles.li}>
            <Link className={styles.mobileLink} to="/quickaccess" onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
                Accés rapide
            </Link>
            { state ? ( <ul className="dropdown-list" onMouseEnter={showDropdown}>
                            {table.map( (item) => {
                              return(
                                <>
                              hkbjlk
                                </>
                              )
                            })}
                          </ul> ): 
                null}
          </li>
        </ul>
      </div>
    </>
  );
  let disconnectedMobileRoutes = (
    <>
      <div className={styles.mobileNavItem}>
        <ul>
          <li className={styles.li}>
            <Link className={styles.mobileLink} to="/">
              Accueil
            </Link>
          </li>
          <li className={styles.li}>
            <Link className={styles.mobileLink} to="/services">
              Services
            </Link>
          </li>
          <li className={styles.li}>
            <Link className={styles.mobileLink} to="/about">
              À propos
            </Link>
          </li>
          <li className={styles.li}>
            <Link className={styles.mobileLink} to="/contact">
              Contactez-nous
            </Link>
          </li>
        </ul>
      </div>
    </>
  );

  let userConnectedDesktopRoutes = (
    <>
      <div className={styles.navItems}>
        <ul
          onClick={() => {
            closeMobileMenu();
            closeProfileMenu();
          }}
        >
          <li className={styles.li}>
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              Bienvenue !
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.mobileInvisible}>
        <img
          onClick={() => {
            toggleProfileMenu();
          }}
          className={styles.profile}
          src={user.image}
          alt="logo"
        />
        {showProfileMenu ? <ProfileDropdown /> : ""}
      </div>
    </>
  );
  let teamConnectedDesktopRoutes = (
    <>
      <div
        onClick={() => {
          closeSidebar();
        }}
        className={styles.navItems}
      >
        <ul
          onClick={() => {
            closeMobileMenu();
            closeProfileMenu();
          }}
        >
          <li className={styles.li}>
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              Tableau du bord
            </Link>
          </li>
          <li className={styles.li}>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/quickaccess"
            >
              Accés rapide
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.mobileInvisible}>
        <img
          onClick={() => {
            toggleProfileMenu();
          }}
          className={styles.profile}
          src={user.image}
          alt="logo"
        />
        {showProfileMenu ? <ProfileDropdown /> : ""}
      </div>
      <Sidebar />
    </>
  );
  let adminConnectedDesktopRoutes = (
    <>
      <div
        onClick={() => {
          closeSidebar();
        }}
        className={styles.navItems}
      >
        <ul
          onClick={() => {
            closeMobileMenu();
            closeProfileMenu();
          }}
        >
          <li className={styles.li}>
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              Tableau du bord
            </Link>
          </li>
          <li className={styles.li}>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/quickaccess"
            >
              Accés rapide
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.mobileInvisible}>
        <img
          onClick={() => {
            toggleProfileMenu();
          }}
          className={styles.profile}
          src={user.image}
          alt="logo"
        />
        {showProfileMenu ? <ProfileDropdown /> : ""}
      </div>
      <Sidebar />
    </>
  );
  let superAdminConnectedDesktopRoutes = (
    <>
      <div
        onClick={() => {
          closeSidebar();
        }}
        className={styles.navItems}
      >
        <ul
          onClick={() => {
            closeMobileMenu();
            closeProfileMenu();
          }}
        >
          <li className={styles.li}>
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              Tableau du bord
            </Link>
          </li>
          
          
          <div className={styles.dropdown}>
             <button className={styles.btnAccess}>
          <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/quickaccess"
              >
              Accés rapide
          </Link>
            
            </button>
            <div className={styles.dropdown_content}>
                     {table.map( (item)=>{
                       
                       return (
                         <>
                           <Link className={styles.links} to={clicked(item)}>{item}</Link>
                         </>
                       )
                     })} 

              <p style={ {background:"#dcdcdc"}}><Link className={styles.links} to={`/quickaccess`} onClick={clicked()}> Voir toute la liste</Link></p>
            
            </div>
            </div>

            
          
          
          
        </ul>
      </div>
      <div className={styles.mobileInvisible}>
        <img
          onClick={() => {
            toggleProfileMenu();
          }}
          className={styles.profile}
          src={user.image}
          alt="logo"
        />
        {showProfileMenu ? <ProfileDropdown /> : ""}
      </div>
      <Sidebar />
    </>
  );
  let disconnectedDesktopRoutes = (
    <>
      <div className={styles.navItems}>
        <ul>
          <li className={styles.li}>
            {/* <Link style={{ textDecoration: "none", color: "white" }} to="/"> */}
              Accueil
            {/* </Link> */}
          </li>
          <li className={styles.li}>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/services"
            >
              Services
            </Link>
          </li>
          <li className={styles.li}>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/about"
            >
              À propos
            </Link>
          </li>
          <li className={styles.li}>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/contact"
            >
              Contactez-nous
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.navItemsLeft}>
        <ul>
          <li className={styles.li}>
            <Link className={styles.link} to="/login">
              Connexion
            </Link>
          </li>
          <li className={styles.li}>
            <Link className={styles.link} to="/signup">
              <button className="defaultBtn">S'inscrire</button>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );

  return (
    <>
      {/* mobile menu */}
      <section id="mobileMenu" className={styles.mobileMenu}>
        {user.role === "USER"
          ? userConnectedMobileRoutes
          : user.role === "DEVELOPER" ||
            user.role === "DESIGNER" ||
            user.role === "MARKETING"
          ? teamConnectedMobileRoutes
          : user.role === "ADMIN"
          ? adminConnectedMobileRoutes
          : user.role === "SUPER-ADMIN"
          ? superAdminConnectedMobileRoutes
          : disconnectedMobileRoutes}
      </section>

      {/* desktop menu */}
      <section className={styles.container}>
        <Link to="/">
          <img
            className={styles.logo}
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="logo"
          />
        </Link>
        {user.role === "USER"
          ? userConnectedDesktopRoutes
          : user.role === "DEVELOPER" ||
            user.role === "DESIGNER" ||
            user.role === "MARKETING"
          ? teamConnectedDesktopRoutes
          : user.role === "ADMIN"
          ? adminConnectedDesktopRoutes
          : user.role === "SUPER-ADMIN"
          ? superAdminConnectedDesktopRoutes
          : disconnectedDesktopRoutes}
        <div
          onClick={() => {
            toggleMobileMenu();
            closeSidebar();
          }}
          className={styles.mobileVisible}
        >
          <FontAwesomeIcon icon={solid("bars")} size="2x" />
        </div>
      </section>
      <section
        onClick={() => {
          closeMobileMenu();
          closeProfileMenu();
          if (user.connected && user.role !== "USER") {
            closeSidebar();
          }
        }}
        className={styles.childrenContainer}
      >
        {props.children}
      </section>
    </>
  );
}

export default Navbar;