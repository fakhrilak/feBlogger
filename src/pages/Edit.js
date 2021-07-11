import React,{useEffect, useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./Write.css"
import {formats,modules} from "./data"
import {API,config} from "../config/api"
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'
const Edit = ({auth:{user}}) => {
    const [editor,setEditor] =useState("")
    const [judul,setJudul] = useState("")
    const [triger,setTriger] = useState(false)
    const {id} = useParams()
    console.log(id)
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
            setEditor(res.data.value.kontent)
            setJudul(res.data.value.judul)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[triger])
    const Edit=()=>{
        const body={
            _id : id,
            body : editor,
            judul:judul
        }
        API.patch("/content",body,config)
        .then((res)=>{
            alert(res.data.message)
            setTriger(!triger)
        })
        .catch((err)=>{
            alert(err)
        })
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
            {/* <div>
                <input
                type="file"
                onChange={(e)=>imageUpload(e)}
                style={{paddingBottom:20,paddingRight:350}}
                />
            </div> */}
            <div className="write">
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={editor}
                    placeholder='Write your story here'
                    onChange={(e) => setEditor(e)}
                    style={{height:400}}
                  />              
              </div>
            <div className="button">
                <button
                onClick={()=>Edit()}
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
  
  export default connect(mapStateToProps, {})(Edit);