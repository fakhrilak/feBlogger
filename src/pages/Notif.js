import React,{useState,useEffect} from 'react'
import renderHTML from 'react-render-html'
import { useHistory } from 'react-router-dom'
import {API ,config } from '../config/api'

const Notif = () => {
    const [select,setSelect] = useState("")
    const [content,setConetent] = useState([])
    const history = useHistory()
    useEffect(()=>{
        API.get(`/content?status=${select}`,config)
        .then((res)=>{
            console.log(res.data)
            setConetent(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[select])
    
    return (
        <div>
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
            <div className="container-post" style={{paddingTop:40,margin:20}}>
            {content.length > 0?(content.map((data)=>(
                <div className="card" onClick={()=>history.push(`/content/${data._id}`)}>
                    <img src={"http://localhost:5000/ta/thumbnil/"+data.tumbname} style={{width:100}}/>
                    <div className="container">
                        <h4>{data.judul}</h4>
                        <p className="hide-text">{renderHTML(data.kontent)}</p>
                    </div>
                </div>
            ))):null}
        </div>
        </div>
    )
}

export default Notif
