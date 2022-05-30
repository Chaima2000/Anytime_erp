import './App.css';
import {BrowserRouter as Routes,Route} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Messenger from './components/Messenger';
function App() {
  return (
    <Routes>
        <Route path='/messenger/login' component={Login} exact >
        </Route>
        <Route path="/messenger/register" component={Register} exact>
        </Route>
        <Route path='/' component={Messenger} exact></Route>
    </Routes>
  );
}

export default App;
