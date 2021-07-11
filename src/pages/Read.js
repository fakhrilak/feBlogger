import React, { useEffect, useState } from 'react'
import { API,APIimage,config } from '../config/api'
import renderHTML from 'react-render-html'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactQuill from 'react-quill';
import { NavItem } from 'react-bootstrap'

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
        let userId = ""
        if(user==null){
            userId=""
        }else{
            userId=user._id
        }
        console.log(user)
        API.get(`/content/${id}/?id_req=${userId}`,config)
        .then((res)=>{
            if(res.data.value == false){
                history.push("/404")
            }else{
              setData(res.data.value)
              setNote("")  
            }
            
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
    return (
        <div>
            {data == ""?<h1>Loading....</h1>:
                    <div>
                        <div>
                            <h1>{data.judul}</h1>
                        </div>
                        <div>
                            <img src={APIimage + data.tumbname} style={{width:400,height:350}}/>
                        </div>
                        <div style={{marginLeft:200,marginRight:200}}>
                            <ReactQuill
                            value={data.kontent}
                            readOnly={true}
                            theme={"bubble"}
                            />
                        </div>               
                    </div>
                }
            {user == null ? 
            null:
            <>
                <div>
                    <div>
                        {(user.role == 1 || data.User == user._id) &&
                                <div>
                                    <div
                                    style={{textAlign:"left",marginLeft:"11%"}}
                                    >
                                        <button
                                        onClick={()=>setShowComand(!showComen)}
                                        style={{width:100,height:40,margin:4}}
                                        >Command</button>
                                        {data.status !== "true" && <button
                                        style={{width:100,height:40,margin:4}}
                                        onClick={()=>history.push(`/edit/${id}`)}
                                        >EDIT</button>}
                                    </div>
                                    {showComen ? <div style={{textAlign:'left',marginLeft:"20%"}}>
                                        {data.history.map((data)=>(
                                        <div>
                                            <h5>Command Admin</h5>
                                            <p>{data.note}</p>
                                        </div>
                                    ))}
                                    </div>:null}
                                    {data == ""?null:
                                    <div>
                                        {data.harga.buktiTf ? 
                                            <>
                                            <h5
                                            style={{textAlign:"left",marginLeft:150}}
                                            >Transaction Done</h5>
                                            <img src={APIimage+data.harga.buktiTf}
                                                style={{width:200,float:"left",marginLeft:150}}
                                            />
                                            </>
                                        :null}
                                    </div>
                                    }
                                </div>
                            }
                    </div>
                </div>
                {user.role == 1 && data.status == "false" ?
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
                    </div>:null
                }
            </>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user
  });
  
  export default connect(mapStateToProps, {})(Read)
