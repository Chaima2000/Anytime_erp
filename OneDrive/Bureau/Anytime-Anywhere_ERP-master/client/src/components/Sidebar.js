import styles from "../Css/Sidebar.module.css";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

function Sidebar() {
  const { user, arrow, setArrow, closeMobileMenu } = useContext(AppContext);

  function toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    if (sidebar.style.left === "0px") {
      document.getElementById("sidebar").style.left = "-205px";
      setArrow("right");
    } else {
      document.getElementById("sidebar").style.left = "0px";
      setArrow("left");
    }
  }

  let superAdminSidebar = (
    <>
      <div
        className={styles.icon}
        onClick={() => {
          toggleSidebar();
        }}
      >
        {arrow === "right" ? (
          <FontAwesomeIcon icon={solid("angle-double-right")} />
        ) : (
          <FontAwesomeIcon icon={solid("angle-double-left")} />
        )}
      </div>
      <hr />
      <div className={styles.list}>
      <li className={styles.dropdown}>
          <FontAwesomeIcon icon={solid("id-card")} size="lg" />
          &nbsp; RH
          <Link
            onClick={() => {
              toggleSidebar();
            }}
            className={styles.link}
            to="/add/congé"
          >
            <div className={styles.submenu}>
              <FontAwesomeIcon icon={solid("users")} size="lg" />
              &nbsp; Congés
            </div>
          </Link>
          <Link
            onClick={() => {
              toggleSidebar();
            }}
            className={styles.link}
            to="/add/plainte"
          >
            <div className={styles.submenu}>
              <FontAwesomeIcon icon={solid("users")} size="lg" />
              &nbsp; Plaintes
            </div>
          </Link>
        </li>
        <li className={styles.dropdown}>
          <FontAwesomeIcon icon={solid("id-card")} size="lg" />
          &nbsp; Utilisateurs
          <Link
            onClick={() => {
              toggleSidebar();
            }}
            className={styles.link}
            to="/users"
          >
            <div className={styles.submenu}>
              <FontAwesomeIcon icon={solid("users")} size="lg" />
              &nbsp; Liste 1
            </div>
          </Link>
        </li>
        <li className={styles.dropdown}>
          <FontAwesomeIcon icon={solid("coins")} size="lg" />
          &nbsp; Finances
          <Link
            onClick={() => {
              toggleSidebar();
            }}
            className={styles.link}
            to="/banks"
          >
            <div className={styles.submenu}>
              <FontAwesomeIcon icon={solid("bank")} /> &nbsp; Banques
            </div>
          </Link>
          <Link
            onClick={() => {
              toggleSidebar();
            }}
            className={styles.link}
            to="/receipts/add"
          >
            <div className={styles.submenu}>
              <FontAwesomeIcon icon={solid("receipt")} /> &nbsp; Frais
            </div>
          </Link>
          <Link
            onClick={() => {
              toggleSidebar();
            }}
            className={styles.link}
            to="/checks"
          >
            <div className={styles.submenu}>
              <FontAwesomeIcon icon={solid("check")} /> &nbsp; Chèques
            </div>
          </Link>
        </li>
        <li className={styles.dropdown}>
          <FontAwesomeIcon icon={solid("users")} size="lg" />
          &nbsp; Clients
          <Link
            onClick={() => {
              toggleSidebar();
            }}
            className={styles.link}
            to="/clients"
          >
            <div className={styles.submenu}>
              <FontAwesomeIcon icon={solid("list")} size="lg" />
              &nbsp; Liste
            </div>
          </Link>
          <Link
            onClick={() => {
              toggleSidebar();
            }}
            className={styles.link}
            to="/clients/add"
          >
            <div className={styles.submenu}>
              <FontAwesomeIcon icon={solid("plus")} size="lg" />
              &nbsp; Ajouter 
            </div>
          </Link>
        </li>
        <li className={styles.dropdown}>
          <FontAwesomeIcon icon={solid("project-diagram")} size="lg" />
          &nbsp; Projects
          <Link
            onClick={() => {
              toggleSidebar();
            }}
            className={styles.link}
            to="/projectList"
          >
            <div className={styles.submenu}>
              <FontAwesomeIcon icon={solid("list")} size="lg" />
              &nbsp; Liste
            </div>
          </Link>
          <Link
            onClick={() => {
              toggleSidebar();
            }}
            className={styles.link}
            to="/projects/add"
          >
            <div className={styles.submenu}>
              <FontAwesomeIcon icon={solid("plus")} size="lg" />
              &nbsp; nouveau projet
            </div>
          </Link>
        </li>
        <li >
        <Link
            onClick={() => {
              toggleSidebar();
            }}
            className={styles.link}
            to="/discussion"
          >
          <FontAwesomeIcon icon={solid("comment")}  />
          &nbsp; Discussion
         
          </Link>
        </li>
       
      </div>
    </>
  );

  let adminSidebar = (
    <>
      <div
        className={styles.icon}
        onClick={() => {
          toggleSidebar();
        }}
      >
        {arrow === "right" ? (
          <FontAwesomeIcon icon={solid("angle-double-right")} />
        ) : (
          <FontAwesomeIcon icon={solid("angle-double-left")} />
        )}
      </div>
      <hr />
      <div className={styles.list}>
        <Link
          onClick={() => {
            toggleSidebar();
          }}
          className={styles.link}
          to="/admin/users"
        >
          <li>
            <FontAwesomeIcon icon={solid("users")} size="lg" />
            &nbsp; Users
          </li>
        </Link>
        <Link
          onClick={() => {
            toggleSidebar();
          }}
          className={styles.link}
          to="/admin/banks"
        >
          <li>
            <FontAwesomeIcon icon={solid("bank")} /> &nbsp; Banks
          </li>
        </Link>
        <Link
          onClick={() => {
            toggleSidebar();
          }}
          className={styles.link}
          to="/admin/receipts"
        >
          <li>
            <FontAwesomeIcon icon={solid("receipt")} /> &nbsp; Receipts
          </li>
        </Link>
        <Link
          onClick={() => {
            toggleSidebar();
          }}
          className={styles.link}
          to="/admin/checks"
        >
          <li>
            <FontAwesomeIcon icon={solid("check")} /> &nbsp; Checks
          </li>
        </Link>
      </div>
    </>
  );

  let teamSidebar = (
    <>
      <div
        className={styles.icon}
        onClick={() => {
          toggleSidebar();
        }}
      >
        {arrow === "right" ? (
          <FontAwesomeIcon icon={solid("angle-double-right")} />
        ) : (
          <FontAwesomeIcon icon={solid("angle-double-left")} />
        )}
      </div>
      <hr />
      <div className={styles.list}>
        <Link
          onClick={() => {
            toggleSidebar();
          }}
          className={styles.link}
          to="/team/projects"
        >
          <li>
            <FontAwesomeIcon icon={solid("project-diagram")} size="lg" />
            &nbsp; Projects
          </li>
        </Link>
        <Link
          onClick={() => {
            toggleSidebar();
          }}
          className={styles.link}
          to="/team/projects"
        >
          <li className={styles.dropdown}>
          <FontAwesomeIcon icon={solid("coins")} size="lg" />
          &nbsp; Finance
          <Link
            onClick={() => {
              toggleSidebar();
            }}
            className={styles.link}
            to="/receipts/add"
          >
            <div className={styles.submenu}>
              <FontAwesomeIcon icon={solid("receipt")} /> &nbsp; Receipts
            </div>
          </Link>
          <Link
            onClick={() => {
              toggleSidebar();
            }}
            className={styles.link}
            to="/checks"
          >
            <div className={styles.submenu}>
              <FontAwesomeIcon icon={solid("check")} /> &nbsp; Checks
            </div>
          </Link>
        </li>
        </Link>
      </div>
    </>
  );

  return (
    <>
      <section
        onClick={() => {
          closeMobileMenu();
        }}
        id="sidebar"
        className={styles.container}
      >
        {user.role === "DEVELOPER" ||
        user.role === "DESIGNER" ||
        user.role === "MARKETING" ? (
          teamSidebar
        ) : user.role === "ADMIN" ? (
          adminSidebar
        ) : user.role === "SUPER-ADMIN" ? (
          superAdminSidebar
        ) : (
          <></>
        )}
      </section>
    </>
  );
}
export default Sidebar;