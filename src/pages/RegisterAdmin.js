import React,{useState} from 'react'
import { API, config } from '../config/api';
import './RegisterAdmin.css';
const RegisterAdmin = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        addres:"",
        gendre:"",
        phone:"",
        role:""
      });
    
      const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const { email, password, name,phone,gendre,addres,role} = formData;
    const onsubmit=()=>{
       API.post("/register-admin",formData,config)
       .then((res)=>{
           alert(res.data.message)
       })
       .catch((err)=>{
           alert(err.response.message)
       })
    }
      return (
        <div>
            <h1>CREATE NEW USER</h1>
            <div className='form-group1'>
                  <input
                    type="text"
                    placeholder='Full Name'
                    className='custom-input1'
                    value={name}
                    name="name"
                    onChange={(e) => onChange(e)}
                    />
              </div>
              <div className='form-group1'>
                  <input
                    type="email"
                    placeholder='Email'
                    className='custom-input1'
                    value={email}
                    name="email"
                    onChange={(e) => onChange(e)}
                    />
              </div>
              
                    <div className='form-group1'>
                        <div
                            style={{display:"grid",gridTemplateColumns:"1fr 1fr",
                            width:400,marginLeft:480}}
                        >
                            <select
                            value={gendre}
                            name="gendre"
                            onChange={(e) => onChange(e)}
                            className='custom-input1'
                            style={{width:200,height:25}}
                            >
                                <option value={"male"}>MALE</option>
                                <option value={"female"}>FEMALE</option>
                            </select>
                            <select
                            value={role}
                            name="role"
                            onChange={(e) => onChange(e)}
                            className='custom-input1'
                            style={{width:200,height:25}}
                            >
                                <option value={"1"}>Admin</option>
                                <option value={"2"}>User</option>
                            </select>
                        </div>
                    </div>
              <div className='form-group1'>
                  <input
                    type="text"
                    placeholder='Phone'
                    className='custom-input1'
                    value={phone}
                    name="phone"
                    onChange={(e) => onChange(e)}
                    />
              </div>
              <div className='form-group1'>
                  <input
                    type="text"
                    placeholder='Addres'
                    className='custom-input1'
                    value={addres}
                    name="addres"
                    onChange={(e) => onChange(e)}
                    />
              </div>
              <div className='form-group1'>
                  <input
                    type="password"
                    placeholder='Password'
                    className='custom-input1'
                    value={password}
                    name="password"
                    onChange={(e) => onChange(e)}
                    />
              </div>
              <div>
                  <button
                  onClick={()=>onsubmit()}
                  style={{width:100,height:40,fontSize:20,}}
                  >Submit</button>
              </div>
        </div>
    )
}

export default RegisterAdmin
