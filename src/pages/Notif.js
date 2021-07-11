import React,{useState,useEffect} from 'react'
import renderHTML from 'react-render-html'
import { useHistory } from 'react-router-dom'
import {API ,APIimage,config } from '../config/api'

const Notif = () => {
    const [select,setSelect] = useState("")
    const [content,setConetent] = useState([])
    const [User,setUser] = useState([])
    const [controller,setController] =useState(false)
    const history = useHistory()
    useEffect(()=>{
        API.get(`/content?status=${select}`,config)
        .then(async(res)=>{
            // console.log(res.data)
            setConetent(res.data.content)
            setUser(res.data.users)

        })
        .catch((err)=>{
            console.log(err)
        })
    },[select])
    

    
    
    return (
        <div>
            <div className="controller">
               <p onClick={()=>setController(false)}>POST</p>
               <p onClick={()=>setController(true)}>USER</p>
            </div>
            <div>
            <select
            value={select}
            onChange={(e)=>setSelect(e.target.value)}
            style={{marginBottom:20,height:30,width:100,fontSize:15,fontWeight:"bold",float:"right"}}
            >
                <option value="">All</option>
                <option value={false}>Reject</option>
                <option value={true}>Posted</option>
            </select>
            </div>
            <div className="container-post" style={{paddingTop:40,margin:10}}>
            {content.length > 0 && controller == false?(content.map((data)=>(
                <div className="card" onClick={()=>history.push(`/content/${data._id}`)}>
                   
                    <img src={APIimage+data.tumbname}/>
                    <div className="container">
                        <h4>{data.judul}</h4>
                        <p className="hide-text">{renderHTML(data.kontent)}</p>
                    </div>
                </div>
            ))):null}
            </div>
            <div className="container-post" style={{paddingTop:40,margin:20}}>
            {User.length > 0 && controller == true?(User.map((data)=>(
                <div className="card" onClick={()=>history.push(`/content/${data._id}`)}>
                     <div className="container" style={{textAlign:"left"}}>
                        <p>Nama : {data.user.name}</p>
                        <p>Email : {data.user.email}</p>
                        { select == ""?
                        <p>Total Post : {data.qty}</p> :
                        <p>Jumlah Post Bulan Ini : {data.qty}</p>
                        }
                    </div>
                </div>
            ))):null}
            </div>
        </div>
    )
}

export default Notif
