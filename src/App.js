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
import Navbar from './components/Navbar';
import ModalRegister from './components/Register/Register';
import Write from './pages/Write';
import UserRoute from './components/Route/UserRoute';
import Read from './pages/Read';
import Post from './pages/Post';
import { loadUser } from './redux/actions/auth';
import Notif from './pages/Notif';
import Edit from './pages/Edit';
import Profile from './pages/Profile';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Tagihan from './pages/Tagihan';
import RegisterAdmin from './pages/RegisterAdmin';
import AdminRoute from './components/Route/AdminRoute';
import ChangePassword from './pages/ChangePassword';

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
            <div>
              <Navbar register={Register} login={Login}/>
            </div>
            <div style={{paddingTop:100}}>
            <Switch>
                <Route exact path="/" >
                    <Home/>
                </Route>
                <Route exact path="/content/:id" component={Read}/>
                <Route exact path="/404" component={NotFound}/>
                <AdminRoute exact path="/report" component={Notif}/> 
                <AdminRoute exact path="/tagihan" component={Tagihan}/>
                <AdminRoute exact path="/register-admin" component={RegisterAdmin}/>
                
                <UserRoute exact path="/post" component={Post}/> 
                <UserRoute exact path="/edit/:id" component={Edit}/>                
                <UserRoute exact path="/profile" component={Profile}/>
                <UserRoute exact path="/write" component={Write}/>
                <UserRoute exact path="/change-password" component={ChangePassword}/>
                             
            </Switch>
            </div> 
            <div>
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
            </div>
            
        </Router>
        
      </div>
    </Provider>
  );
}

export default App;
