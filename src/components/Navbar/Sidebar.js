import React from 'react'
import {slide as Menu} from "react-burger-menu"
import logo from "../../img/logo.png"
import {Link} from "react-router-dom"
import { useDispatch } from 'react-redux'
import {connect} from "react-redux"
import "./Sidebar.css"
const Sidebar = ({auth,register,login}) => {
    const{isAuthenticated,user}= auth
    const dispatch = useDispatch()
    const handleLogOut=()=>{
        dispatch({
            type:"LOGOUT"
        })
    }
    return (
        <div className="Container-Navbar" >
            <Menu>
            {isAuthenticated && user ?
            (
                <>
                    {user.role == "1" ? (
                        <>
                            <Link to="/">
                                <img src={logo}
                                style={{width:50,marginTop:10}}
                                />
                            </Link>
                            <Link
                            onClick={()=>handleLogOut()}
                            >
                                <p>Logout</p>
                            </Link>
                            <Link to="/report">
                                <p>Report</p>
                            </Link>
                            <Link to="/tagihan">
                                <p>Tagihan</p>
                            </Link>
                        </>
                    ):(
                        <>
                            <Link to="/">
                                <img src={logo}
                                style={{width:50,marginTop:10}}
                                />
                            </Link>
                            <Link to="/profile">
                                <p>Profile</p>
                            </Link>
                            <Link
                            onClick={()=>handleLogOut()}
                            >
                                <p>Logout</p>
                            </Link>
                            <Link to="/write">
                                <p>Write</p>
                            </Link>
                            <Link to="/post">
                                <p>Post</p>
                            </Link>
                        </>
                    )}
                </>
            ):(
                <>
                    <Link to="/">
                        <img src={logo}
                        style={{width:50,marginTop:10}}
                        />
                    </Link>
                    <div>
                        <button
                        onClick={login}
                        >Login</button>
                    </div>
                    <div>
                        <button
                        onClick={register}
                        >Register</button>
                    </div>
                </>
            )}
                
            </Menu>
        </div>
    )
}
const mapStateToProps = (state)=>({
    auth: state.auth
})

export default connect(mapStateToProps, {})(Sidebar)
