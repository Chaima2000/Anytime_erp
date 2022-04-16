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

function Navbar(props) {
  const { user, closeSidebar } = useContext(AppContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfileMobileMenu, setShowProfileMobileMenu] = useState(false);
  const history = useHistory();

  function closeMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.remove(styles.openMobileMenu);
  }

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

  let userConnectedMobileRoutes = (
    <>
      <div className={styles.mobileNavItem}>
        <ul>
          <li>
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
              <li>Profile settings</li>
              <li>
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
          <li>
            <Link className={styles.mobileLink} to="/">
              Welcome !
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
          <li>
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
              <li>Profile settings</li>
              <li>
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
          <li>
            <Link className={styles.mobileLink} to="/">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className={styles.mobileLink} to="/quickaccess">
              Quick access
            </Link>
          </li>
          <li>
            <Link className={styles.mobileLink} to="/stats">
              Stats
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
          <li>
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
              <li>Profile settings</li>
              <li>
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
          <li>
            <Link className={styles.mobileLink} to="/">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className={styles.mobileLink} to="/quickaccess">
              Quick access
            </Link>
          </li>
          <li>
            <Link className={styles.mobileLink} to="/stats">
              Stats
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
          <li>
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
              <li>Profile settings</li>
              <li>
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
          <li>
            <Link className={styles.mobileLink} to="/">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className={styles.mobileLink} to="/quickaccess">
              Quick access
            </Link>
          </li>
          <li>
            <Link className={styles.mobileLink} to="/stats">
              Stats
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
  let disconnectedMobileRoutes = (
    <>
      <div className={styles.mobileNavItem}>
        <ul>
          <li>
            <Link className={styles.mobileLink} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={styles.mobileLink} to="/services">
              Services
            </Link>
          </li>
          <li>
            <Link className={styles.mobileLink} to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className={styles.mobileLink} to="/contact">
              Contact
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
          <li>
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              Welcome !
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
          <li>
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              Dashbord
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/quickaccess"
            >
              Quick access
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/stats"
            >
              Stats
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
          <li>
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              Dashbord
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/quickaccess"
            >
              Quick access
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/stats"
            >
              Stats
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
          <li>
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              Dashbord
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/quickaccess"
            >
              Quick access
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/stats"
            >
              Stats
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
  let disconnectedDesktopRoutes = (
    <>
      <div className={styles.navItems}>
        <ul>
          <li>
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/services"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/contact"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.navItemsLeft}>
        <ul>
          <li>
            <Link className={styles.link} to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link className={styles.link} to="/signup">
              <button className="defaultBtn">signUp</button>
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