import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { logout } from "./functions/logout";
import styles from "../Css/ProfileDropdown.module.css";

function ProfileDropdown() {
  const { user } = useContext(AppContext);
  const history = useHistory();
  return (
    <>
      <div className={styles.dropdown}>
        <h3>{user.firstName}</h3>
        <hr />
        <h5>Profile settings</h5>
        <hr />
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
    </>
  );
}
export default ProfileDropdown;