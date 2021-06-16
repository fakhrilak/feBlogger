import React, { useEffect,useState } from 'react'
import logo from "../img/logo.png"
import {API,config} from "../config/api"
import {connect} from "react-redux"
import "./Post.css"
import { useHistory } from 'react-router-dom'
import renderHTML from 'react-render-html'

const Post = ({auth}) => {
    const [Content, setContent] = useState([])
    const history = useHistory()
    useEffect(()=>{
        API.get("/content",config)
        .then((res)=>{
            setContent(res.data.data)
            console.log(res.data.data[0]._id)
        })
        .catch((err)=>{
            console.log(err.response)
        })
    },[])
    return (
        <div className="container-post">
            {Content.length > 0?(Content.map((data)=>(
                <div className="card" onClick={()=>history.push(`/content/${data._id}`)}>
                    <img src={"http://localhost:5000/ta/thumbnil/"+data.tumbname} style={{width:100}}/>
                    <div className="container">
                        <h4>{data.judul}</h4>
                        <p className="hide-text">{renderHTML(data.kontent)}</p>
                    </div>
                </div>
            ))):null}
        </div>
    )
}

const mapStateToProps = (state)=>({
    auth: state.auth
})

export default connect(mapStateToProps, {})(Post);
