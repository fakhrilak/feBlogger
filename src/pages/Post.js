import React, { useEffect,useState } from 'react'
import logo from "../img/logo.png"
import {API,config,APIimage} from "../config/api"
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
            setContent(res.data.content)
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
    return (
        <div className="container-post">
            {Content.length > 0?(Content.map((data)=>(
                <div className="card" onClick={()=>history.push(`/content/${data._id}`)}>
                    <img src={APIimage+data.tumbname} style={{width:200}}/>
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
