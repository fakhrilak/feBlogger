import React, { useState } from "react";
import "./Profile.css";
import avatar from "../img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faTransgender,
  faPhone,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { connect, useDispatch } from "react-redux";
import { API,config } from "../config/api";
import { loadUser } from "../redux/actions/auth";


const Profile = ({auth:{user,isAuthenticated},loadUser}) => {
    const [profile,setProfile] = useState(false)
    const [Image,setImage] = useState(null)
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [gendre,setGendre] = useState("")
    const [phone,setPhone] = useState("")
    const [addres,setAddres] =useState("")

    const dispatch = useDispatch()
    const onEditImage=()=>{
      const data = new FormData()
        data.append("addres",addres)
        data.append("phone",phone)
        data.append("gendre",gendre)
        data.append("name",name)
        data.append("email",email)
        data.append("file",Image)
        API.post("/edit-profile",data,config)
        .then((res)=>{
            alert(res.data.message)
            dispatch(loadUser())
            setProfile(false)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    const onEdit=()=>{
      setProfile(!profile)
      setName(user.name)
      setEmail(user.email)
      setAddres(user.addres)
      setGendre(user.gendre)
      setPhone(user.phone)
    }
  return isAuthenticated ? (
     <div className="profile-container">
     {user ? <div className="profile-card">
        <div className="profile-desc">
          <div className="profile-data">
            <h2>Profile</h2>
          </div>
          <div className="profile-data">
            <div className="profile-icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="profile-details">
              <span>Fullname</span>
              {!profile ? <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {user.name}
              </span>:
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
               <input
                  value= {name}
                  onChange = {(e)=>setName(e.target.value)}
               />
              </span>}
            </div>
          </div>
          <div className="profile-data">
            <div className="profile-icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div className="profile-details">
              <span style={{textAlign:"left"}}>Email</span>
              {!profile ?<span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {user.email}
              </span>:
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
               <input
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
               />
              </span>}
            </div>
          </div>
          <div className="profile-data">
            <div className="profile-icon">
              <FontAwesomeIcon icon={faTransgender} />
            </div>
            <div className="profile-details">
              <span>Gender</span>
              {!profile ? <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {user.gendre}
              </span> :
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
               <input
                  value={gendre}
                  onChange={(e)=>setGendre(e.target.value)}
               />
              </span>}
            </div>
          </div>
          <div className="profile-data">
            <div className="profile-icon">
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <div className="profile-details">
              <span style={{textAlign:"left"}}>Phone</span>
              {!profile ? <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {user.phone}
              </span>:
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
               <input
                  value={phone}
                  onChange={(e)=>setPhone(e.target.value)}
               />
              </span>}
            </div>
          </div>
          <div className="profile-data">
            <div className="profile-icon">
              <FontAwesomeIcon icon={faLocationArrow} />
            </div>
            <div className="profile-details">
              <span style={{textAlign:"left"}}>Address</span>
              {!profile ?<span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {user.addres}
              </span>:
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
               <input
                  value={addres}
                  onChange={(e)=>setAddres(e.target.value)}
               />
              </span>}
            </div>
          </div>
        </div>
        <div className="profile-img">
          {user.image == "" ?
          <img src={avatar} 
          alt="avatar" 
          className="profile-avatar" 
          onDoubleClick={()=>onEdit()}
          />:
          <img src={user.image} 
          alt="avatar" 
          className="profile-avatar" 
          onDoubleClick={()=>onEdit()}
          />
          }
          {profile ? 
          <input
          type="file"
          onChange={(e)=>setImage(e.target.files[0])}
          />:null}
          {profile ?
          <button
          onClick={()=>onEditImage()}
          >
            Edit
          </button>:null}
        </div>
      </div>:null}
    </div>
  ):null;
};

const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
  export default connect(mapStateToProps, {loadUser})(Profile);