import { API,setAuthToken } from "../../config/api";
import { types } from "./type";

export const handleLogin=(email,password,loginacsen)=>async(dispatch)=>{
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await API.post("/login", body, config);
    dispatch({
      type: types.login_success,
      payload: res.data,
    });
    loginacsen()
    dispatch(loadUser())
  } catch (error) {
    dispatch({
      type: types.login_fail,
      payload: error.response
    });
  }
}

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await API.get("/auth");
    dispatch({
      type: types.load_user_success,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.load_user_fail,
    });
  }
};

export const handleRegister=(
  email,
  password,
  name,
  phone,
  gendre,
  addres,
  HandleRegister
  )=>async(dispatch)=>{
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body={
    name:name,
    password:password,
    email:email,
    phone:phone,
    gendre:gendre,
    addres:addres
  }
  console.log(body)
  try{
    const res = await API.post("/register", body, config);
    dispatch({
      type: types.register_success,
      payload: res.data,
    });
    HandleRegister()
    dispatch(loadUser())
  }catch(err){
    dispatch({
      type: types.register_fail,
      payload: err.response,
    });
  }
}
