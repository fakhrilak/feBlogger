import React,{useEffect, useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./Write.css"
import dayjs from "dayjs"
import {formats,modules} from "./data"
import {API,config} from "../config/api"
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Write = ({auth:{user}}) => {
    const [editor,setEditor] =useState("")
    const [judul,setJudul] = useState("")
    const [image,setImage] = useState("")
    const [imagepreview,setImagePreview] = useState(null)
    const history = useHistory()
    var now = dayjs(new Date()).format("dddd, MMMM D, YYYY h:mm A")
    var bulan = dayjs(new Date()).format("MM")

    const onClick = ()=>{
        const data = new FormData()
        data.append("judul",judul)
        data.append("status",false)
        data.append("kontent",editor)
        data.append("createAt",now)
        data.append("bulan",bulan)
        data.append("idUser",user._id)
        data.append("file",image)
        API.post("/content",data,config)
        .then((res)=>{
            alert(res.data.message)
            history.push(`/content/${res.data.data._id}`)
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }

    const imageUpload=(e)=>{
        const file = e.target.files[0]
        setImage(file)
        setImagePreview(URL.createObjectURL(file))
      }
    return (
        <div className="Container-write">
            <div className="Container-judul">
                <input
                value={judul}
                placeholder="Judul"
                onChange={(e)=>setJudul(e.target.value)}
                />
            </div>
            <div>
                <img src={imagepreview} style={{width:400}}/>
            </div>
            <div>
                <input
                type="file"
                onChange={(e)=>imageUpload(e)}
                style={{paddingBottom:20,paddingRight:350}}
                />
            </div>
            <div className="write">
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    placeholder='Write your story here'
                    onChange={(e) => setEditor(e)}
                    style={{height:400}}
                  />              
              </div>
            <div className="button">
                <button
                onClick={()=>onClick()}
                >
                    Post
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
  export default connect(mapStateToProps, {})(Write);