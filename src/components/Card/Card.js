import React from 'react'
import ReactQuill from 'react-quill'
import { useHistory } from 'react-router-dom'
import { APIimage } from '../../config/api'
import "./Card.css"
const Card = (props) => {
    const {judul,gambar,waktu,id,content}=props
    const history =useHistory()
    return (
        <div onClick={()=>history.push(`/content/${id}`)}>
        <div className="container-card">
            <div>
                <img src={APIimage+gambar}/>
            </div>
            <div>
                <div
                style={{marginTop:20
                }}
                >{waktu}</div>
                <p
                style={{overflow:"hidden",textOverflow:"ellipsis",height:50,maxWidth:200
                ,whiteSpace:"nowrap"
                }}
                ><ReactQuill
                value={content}
                readOnly={true}
                theme={"bubble"}
                /></p>
            </div>
        </div>
        <div className="container-judul">
            <h1>{judul}</h1>
        </div>
        </div>
    )
}

export default Card
