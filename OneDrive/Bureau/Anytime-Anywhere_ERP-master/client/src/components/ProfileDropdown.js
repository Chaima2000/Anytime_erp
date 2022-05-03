import React , { useContext} from "react";
import { useHistory } from "react-router-dom";
import { Link} from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { logout } from "./functions/logout";
import styles from "../Css/ProfileDropdown.module.css";

function ProfileDropdown() {
  const { user } = useContext(AppContext);
  const history = useHistory();

  return (
    <>
      <div className={styles.dropdown}>
        <Link to="/settingProfile" className={styles.setting}>
          <FontAwesomeIcon icon={solid("gear")} color="white" />
        </Link>
        <img src={user.image}  className={styles.container}/>
        <div className={styles.dropdown_content}>
        <h3 align="center">{user.firstName} {user.lastName}</h3>
        <p>{user.role}</p>
        <h5>
          <form
            onSubmit={() => {
              logout();
              history.push("/");
            }}
          >
            <button className="defaultBtn">Logout</button>
          </form>
        </h5>
        </div>
      </div>
    </>
  );
}
export default ProfileDropdown;