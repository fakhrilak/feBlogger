import React from 'react'
import "./Navbar.css"
import logo from "../../img/logo.png"
import {Link} from "react-router-dom"
import { useDispatch } from 'react-redux'
import {connect} from "react-redux"
const Navbar = ({auth,register,login}) => {
    const{isAuthenticated,user}= auth
    const dispatch = useDispatch()
    const handleLogOut=()=>{
        dispatch({
            type:"LOGOUT"
        })
    }
    console.log(user)
    return (
        <div className="Container-Navbar">
            <ul>               
                {isAuthenticated && user ?
                    <>
                        {user.role == "1" ? 
                        <>
                            <li style={{float:'left',color:"white"}}>
                                <Link to="/">
                                    <img src={logo}
                                    style={{width:50,marginTop:10}}
                                    />
                                </Link>
                            </li>
                            <li style={{float:'right',color:"white"}}
                            onClick={()=>handleLogOut()}
                            >
                                <Link>
                                    <p>Logout</p>
                                </Link>
                            </li>
                            <li style={{float:'right',color:"white"}}>
                                <Link to="/report">
                                    <p>Report</p>
                                </Link>
                            </li>
                            <li style={{float:'right',color:"white"}}>
                                <Link to="/tagihan">
                                    <p>Tagihan</p>
                                </Link>
                            </li>
                        </>:
                        <>
                            <li style={{float:'left',color:"white"}}>
                                <Link to="/">
                                    <img src={logo}
                                    style={{width:50,marginTop:10}}
                                    />
                                </Link>
                            </li>
                            <li style={{float:'right',color:"white"}}>
                                <Link to="/profile">
                                    <p>Profile</p>
                                </Link>
                            </li>
                            <li style={{float:'right',color:"white"}}
                            onClick={()=>handleLogOut()}
                            >
                                <Link>
                                    <p>Logout</p>
                                </Link>
                            </li>
                            <li style={{float:'right',color:"white"}}
                            >
                                <Link to="/write">
                                    <p>Write</p>
                                </Link>
                            </li>
                            <li style={{float:'right',color:"white"}}>
                                <Link to="/post">
                                    <p>Post</p>
                                </Link>
                            </li>
                        </>}
                    </>:
                    <>
                    <li style={{float:'left',color:"white"}}>
                        <Link to="/">
                            <img src={logo}
                            style={{width:50,marginTop:10}}
                            />
                        </Link>
                    </li>
                    <li style={{float:'right',color:"white"}}
                    onClick={login}
                    >
                        <button>Login</button>
                    </li>
                    <li style={{float:'right',color:"white"}}
                    >
                    <button
                        onClick={register}
                        >Register</button>
                    </li>
                    </>
                }
            </ul>
        </div>
    )
}


const mapStateToProps = (state)=>({
    auth: state.auth
})

export default connect(mapStateToProps, {})(Navbar);