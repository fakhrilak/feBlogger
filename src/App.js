import './App.css';
import React,{useEffect,useState} from "react"
import { setAuthToken } from "./config/api";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import  ModalLogin from "./components/Login/Login"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import ModalRegister from './components/Register/Register';
import Write from './pages/Write';
import UserRoute from './components/Route/User';
import Read from './pages/Read';
import Post from './pages/Post';
import { loadUser } from './redux/actions/auth';
import Notif from './pages/Notif';
import Edit from './pages/Edit';
import Profile from './pages/Profile';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
console.log(localStorage)
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    }, []);

    const [HandleLogin,setHandleLogin]=useState(false)
    const [HandleRegister,setHandleRegister]=useState(false)
  
    const Register = () =>{
      setHandleRegister(!HandleRegister)
      setHandleLogin(false)
    }
  
    const Login = () =>{
      console.log(HandleLogin)
      setHandleLogin(!HandleLogin)
      setHandleRegister(false)
    }
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
              <Navbar register={Register} login={Login}/>
            <Switch>
            <div style={{paddingTop:100}}>
                <UserRoute exact path="/">
                    <Write/>
                </UserRoute>
                <UserRoute exact path="/content/:id">
                    <Read/>
                </UserRoute>
                <UserRoute exact path="/post">
                  <Post/>
                </UserRoute>    
                <UserRoute exact path="/notif">
                  <Notif/>
                </UserRoute>     
                <UserRoute exact path="/edit/:id">
                  <Edit/>
                </UserRoute>
                <UserRoute exact path="/profile">
                  <Profile/>
                </UserRoute>             
            </div>
            </Switch>
            {HandleLogin && (<ModalLogin
            HandleLogin={HandleLogin} 
            setHandleLogin={setHandleLogin}
            Loginaksen={Login}
            Register={Register}
            />)}
            {HandleRegister && <ModalRegister
              HandleRegister={HandleRegister} 
              setHandleRegister={setHandleRegister}
              Register={Register}
              Login={Login}
            />}
        </Router>
        
      </div>
    </Provider>
  );
}

export default App;
