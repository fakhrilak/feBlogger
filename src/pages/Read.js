import React, { useEffect, useState } from 'react'
import { API,config } from '../config/api'
import renderHTML from 'react-render-html'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'

const Read = ({user}) => {
    const [data,setData] = useState("")
    const [status,setStatus] = useState("false")
    const [note,setNote] = useState("")
    const [harga,setHarga] = useState(0)
    const [showComen,setShowComand] = useState(false)
    const [triger,setTriger] = useState(false)
    const {id} = useParams()
    const history = useHistory()
    useEffect(()=>{
        API.get(`/content/${id}`,config)
        .then((res)=>{
            setData(res.data.value)
            setNote("")
        })
        .catch((err)=>{
            console.log(err)
        })
    },[showComen,triger])
    const onSubmit=()=>{
        const data = { 
            "data":{
                "note": note,
                "status" : status,
                "userId" : 1
            },
            idContent:id,
            status:status,
            harga : harga
        }
        API.post("/command",data,config)
        .then((res)=>{
            alert(res.data.message)
        })
        .catch((err)=>{
            console.log(err.response)
        })
        setTriger(!triger)
    }
    console.log(status)
    return user == null?<h1>Loading</h1>:(
        <div>
            <div>
            {data !== "" &&
            <div>
                <div>
                    <h1>{data.judul}</h1>
                </div>
                <div>
                    <img src={"http://localhost:5000/ta/thumbnil/"+data.tumbname} style={{width:400,height:350}}/>
                </div>
                <div>
                    {renderHTML(data.kontent)}
                </div>
            </div>
            }
            
            <div>
                {(user.role == 1 || data.idUser == user._id) &&
                    <div>
                    <div
                    style={{textAlign:"left",marginLeft:"11%"}}
                    >
                        <button
                        onClick={()=>setShowComand(!showComen)}
                        style={{width:100,height:40,margin:4}}
                        >Command</button>
                        <button
                        style={{width:100,height:40,margin:4}}
                        onClick={()=>history.push(`/edit/${id}`)}
                        >EDIT</button>
                    </div>
                    {showComen ? <div style={{textAlign:'left',marginLeft:"20%"}}>
                        {data.history.map((data)=>(
                        <div>
                            <h5>Command Admin</h5>
                            <p>{data.note}</p>
                        </div>
                    ))}
                    </div>:null}
                    </div>
                }
            </div>
            </div>
                {user.role == 1 && data.status == "false" &&
                <div style={{margin:20}}>
                    <div>
                        <input
                        type="text-area"
                        placeholder="Note"
                        value={note}
                        onChange={(e)=>setNote(e.target.value)}
                        style={{width:"80%",height:50}}
                        />
                    </div>
                    <div>
                        <select
                        value={status}
                        onChange={(e)=>setStatus(e.target.value)}
                        style={{width:200,height:40,marginTop:10,float:'right',marginRight:"10%"}}
                        >
                            <option value="">Select Status</option>
                            <option value={true}>Accept</option>
                            <option value={false}>Pending</option>
                        </select>
                    </div>
                    {status == "true" ?<div>
                         <input
                        placeholder="Harga"
                        value = {harga}
                        style={{margin:10,float:"right",width:100,height:35}}
                        onChange={(e)=>setHarga(e.target.value)}
                        />
                    </div>:null}
                    <div>
                        <button
                        style={{margin:10,float:"right",width:100,height:40}}
                        onClick={()=>onSubmit()}
                        >Submit</button>
                    </div>
                </div>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user
  });
  
  export default connect(mapStateToProps, {})(Read)
