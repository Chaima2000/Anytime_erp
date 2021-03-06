import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "./components/Navbar";
import "./Css/App.css";
import { AppContext } from "./Context/AppContext";
import axios from "axios";
import { getUrl } from "./config";
import mobileMenuStyles from "./Css/Navbar.module.css";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = getUrl();

function App() {
  const [user, setUser] = useState({});
  const [arrow, setArrow] = useState("right");
  const routes = require("./routes/routes");

  function closeSidebar() {
    document.getElementById("sidebar").style.left = "-205px";
    setArrow("right");
  }

  function closeMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.remove(mobileMenuStyles.openMobileMenu);
  }

  useEffect(() => {
    axios.get("/getlogin").then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <>
      <AppContext.Provider
        value={{
          user,
          setUser,
          closeSidebar,
          closeMobileMenu,
          arrow,
          setArrow,
        }}
      >
        <BrowserRouter>
          {/* <Navbar> */}
            {user.role === "SUPER-ADMIN"
              ? routes.superAdminRoutes
              : user.role === "USER"
              ? routes.userRoutes
              : user.role === "RH"
              ? routes.RHRoutes
              : user.role === "DEVELOPER" ||
                user.role === "DESIGNER" ||
                user.role === "MARKETING"
              ? routes.teamRoutes
              : routes.visitorRoutes}
          {/* </Navbar> */}
        </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}

export default App;
