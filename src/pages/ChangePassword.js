import React from 'react'
import { useState } from 'react'
import {connect} from "react-redux"
import { API,config } from '../config/api'
const ChangePassword = ({auth}) => {
    const {user} =auth
    const [status,setStatus] = useState(false)
    const [oldpassword,setOldpassword] = useState("")
    const [newpassword,setNewpassword] = useState("")
    const [validatingNewpassword,setValidatingNewpasswod] = useState("")
    const Cekpassword=()=>{
        const body={
            email: user.email,
            password : oldpassword
        }
        API.post("/change-passwors",body,config)
        .then((res)=>{
            alert(res.data.message)
            setStatus(res.data.data)
        })
        .catch((err)=>{
            console.log(err.response.data.message)
        })
    }

    const PostNewPasswords=()=>{
        const body={
            email:user.email,
            password:newpassword,
            old:oldpassword
        }
        if(newpassword == validatingNewpassword){
            console.log("post")
            API.patch("/newPasswords",body,config)
            .then((res)=>{
                console.log(res.data)
                if(res.data.data == true){
                    alert(res.data.message)
                }
            })
            .catch((err)=>{
                console.log(err.response)
            })
        }else{
            alert("Invalid new password")
            setNewpassword("")
            setValidatingNewpasswod("")
        }
        
    }
    return (
        <div>
            {!status && <div>
                <input
                type="password"
                placeholder="Input OLD PASSWROD"
                value={oldpassword}
                onChange={(e)=>setOldpassword(e.target.value)}
                />
                <div>
                    <button
                    onClick={()=>Cekpassword()}
                    >
                        SUBMIT
                    </button>
                </div>
                
            </div>}
            {status && 
            <div>
                <input
                type="password"
                placeholder="Input NEW PASSWORD"
                value={newpassword}
                onChange={(e)=>setNewpassword(e.target.value)}
                />
                <input
                type="password"
                placeholder="validatting New Password"
                value={validatingNewpassword}
                onChange={(e)=>setValidatingNewpasswod(e.target.value)}
                />
                <div 
                >              
                    <button
                     onClick={()=>PostNewPasswords()}
                    >
                        SUBMIT
                    </button>
                </div>
            </div>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
  export default connect(mapStateToProps, {})(ChangePassword);
