import Home from "../Pages/navigation/Home";
import Navbar from "../components/Navbar";
import About from "../Pages/navigation/About";
import Services from "../Pages/navigation/Services";
import Contact from "../Pages/navigation/Contact";
import Login from "../Pages/authentication/Login";
import Signup from "../Pages/authentication/Signup";
import ForgotPassword from "../Pages/authentication/ForgotPassword";
import ResetPassword from "../Pages/authentication/ResetPassword";
import ActivateAccount from "../Pages/authentication/ActivateAccount";
import Users from "../Pages/admin/users";
import Dashboard from "../Pages/admin/dashboard/Dashboard";
import UserProfile from "../Pages/admin/users/UserProfile";
import Notfound from "../Pages/404";
import Welcome from "../Pages/freshuser/Welcome";
import TeamDashboard from "../Pages/team/TeamDashboard";
import TeamProjects from "../Pages/team/projects/Projects";
import Bank from "../Pages/admin/finance/bank/Bank";
import AddBank from "../Pages/admin/finance/bank/AddBank";
import EditBank from '../Pages/admin/finance/bank/EditBank';
import Checks from "../Pages/admin/finance/checks/AddCheck";
import Addreceipts from "../Pages/admin/finance/receipts/Addreceipts";
import Receipts from "../Pages/admin/finance/receipts/Receipts";
import AddClients from "../Pages/admin/clients/AddClients";
import Clients from "../Pages/admin/clients/Clients";
import EditClient from '../Pages/admin/clients/EditClient';
import AddProject from "../Pages/admin/projets/AddProject";
import Projects from "../Pages/admin/projets/Projects";
import ProjectProfile from "../Pages/admin/projets/ProjectProfile";
import EditTask from '../Pages/admin/projets/EditTask';
import  EditExpenses from '../Pages/admin/projets/EditExpenses';
import Messenger from "../Pages/Messenger/Messenger";
import UpdateUserProfile from "../components/UpdateUserProfile";
import QuickAccess from '../Pages/navigation/QuickAccess';
import { Switch, Route } from "react-router-dom";

export const userRoutes = (
  <>
    <Switch>
      <Route path="/">
        <Welcome />
      </Route>
      <Route>
        <Notfound />
      </Route>
    </Switch>
  </>
);

export const teamRoutes = (
  <>
    <Switch>
      <Route path="/" exact>
        <TeamDashboard />
      </Route>
      {/* <Route path="/quickaccess" exact>
        <Listquickaccess />
      </Route> */}
      <Route path="/stats" exact>
        <div align="center">Stats</div>
      </Route>
      <Route path="/team/projects" exact>
        <TeamProjects />
      </Route>
      <Route path="/stats" exact>
        <div align="center">Stats</div>
      </Route>
      <Route>
        <Notfound />
      </Route>
    </Switch>
  </>
);

export const adminRoutes = (
  <>
    <Switch>
      <Route path="/" exact>
        <div align="center">Dashboard</div>
      </Route>
      {/* <Route path="/quickaccess" exact>
        <Listquickaccess />
      </Route> */}
      <Route path="/stats" exact>
        <div align="center">Stats</div>
      </Route>
      <Route>
        <Notfound />
      </Route>
    </Switch>
  </>
);

export const superAdminRoutes = (
  <>
  <Switch>
    <Route path="/" exact>
        <Home />
    </Route>
      <Route path="/dashboard" exact>
        <Dashboard />
      </Route>
      <Route path="/quickaccess" exact>
        <QuickAccess/>
      </Route>
      <Route path="/stats" exact>
        <div align="center">Stats</div>
      </Route>
      <Route path="/banks" exact>
        <Bank />
      </Route>
      <Route path="/banks/add" exact>
        <AddBank />
      </Route>
      <Route path="/editbank/:id" exact>
        <EditBank />
      </Route>
      <Route path="/receipts/add" exact>
        <Addreceipts />
      </Route>
      <Route path="/receipts/list" exact>
        <Receipts />
      </Route>
      <Route path="/checks" exact>
        <Checks />
      </Route>
      <Route path="/users" exact>
        <Users />
      </Route>
      <Route path="/users/profile/:id">
        <UserProfile />
      </Route>
      <Route path="/settingProfile" exact>
        <UpdateUserProfile />
      </Route>
      <Route path="/clients/add" exact>
        <AddClients />
      </Route>
      <Route path="/clients" exact>
        <Clients />
      </Route>
      <Route path="/EditClient/:id" exact>
        <EditClient />
      </Route>
       <Route path="/projects/add" exact>
        <AddProject />
      </Route>
      <Route path="/projectList" exact>
        <Projects />
      </Route>
      <Route path="/project/details/:id" exact>
        <ProjectProfile />
      </Route>
      <Route path="/editTask/:id" exact>
      <EditTask />
      </Route>
      <Route path="/editExpense/:id" exact>
      <EditExpenses />
      </Route>
      <Route path="/discussion" exact>
        <Messenger />
      </Route>
      <Route>
        <Notfound />
      </Route>
      
    </Switch>
  </>
);

export const visitorRoutes = (
  <>
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/services" exact>
        <Services />
      </Route>
      <Route path="/about" exact>
        <About />
      </Route>
      <Route path="/contact" exact>
        <Contact />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/signup" exact>
        <Signup />
      </Route>
      <Route path="/forgotpassword" exact>
        <ForgotPassword />
      </Route>
      <Route path="/resetpassword">
        <ResetPassword />
      </Route>
      <Route path="/activateaccount">
        <ActivateAccount />
      </Route>
      <Route>
        <Notfound />
      </Route>
    </Switch>
  </>
);
