import React,{useEffect,useState} from 'react'
import { API,config } from '../config/api'
import "./Tagihan.css"
const Tagihan = () => {
    const [data,setData] = useState([])
    const [image,setImage] = useState("")
    const [imagepreview,setImagePreview] = useState(null)
    const [idimage,setIdImage]= useState("")
    const [triger,setTriger] = useState(false)
    useEffect(()=>{
        API.get("/tagihan",config)
        .then((res)=>{
            setData(res.data.data)
        })
        .catch((err)=>{
            alert(err.response)
        })
    },[triger])
    const Hitung=(data)=>{
        let bayar = 0
        for(let i = 0 ;i < data.length;i++){
            bayar += parseInt(data[i].harga.harga) 
        }
        return bayar
    }
    const imageUpload=(e,id)=>{
        const file = e.target.files[0]
        setImage(file)
        setImagePreview(URL.createObjectURL(file))
        setIdImage(id)
      }
    const onSubmit=(id)=>{
        const data = new FormData()
        data.append("id",id)
        data.append("file",image)
        API.patch("/tagihan",data,config)
        .then((res)=>{
            alert(res.data.message)
        })
        .catch((err)=>{
            alert(err.response)
        })

        API.get("/tagihan",config)
        .then((res)=>{
            setData(res.data.data)
            setTriger(!triger)
        })
        .catch((err)=>{
            alert(err.response)
        })
    }
    return (
        <div>
            <div style={{padding:10,borderRadius:"0px 5px 5px 0px",height:40,backgroundColor:"#adad85",minWidth:200,display:"table-cell",verticalAlign:"middle",
        boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.1)"}}>
                <p>Total Tagihan : <strong>{Hitung(data)}</strong></p>
            </div>
            <div className="container-grid">
                
                {data.length > 0 ?
                data.map((data)=>(
                    <div style={{backgroundColor:"#adad85",borderRadius:5,margin:10,boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.1)"}}>
                        <div>
                            <p>Name : <strong>{data.User.name}</strong></p>
                        </div>
                        <div>
                            <p>Nama Rekening : <strong>{data.User.noRek.nameRek}</strong></p>
                        </div>
                        <div>
                            <p>Nama Bank : <strong>{data.User.noRek.bankName}</strong></p>
                        </div>
                        <div>
                            <p>Nama Bank : <strong>{data.User.noRek.noRek}</strong></p>
                        </div>
                        <div>
                        <p>Name : <strong>{data.harga.harga}</strong></p>
                        </div>
                        {data._id == idimage && 
                        <div>
                            <img src={imagepreview} style={{width:300,borderRadius:20}}/>
                        </div>}
                        <div>
                            <input
                            type="file"
                            onChange={(e)=>imageUpload(e,data._id)}
                            />
                        </div>
                        <div style={{margin:20}}>
                            {data._id == idimage && 
                            <button
                            style={{width:100,height:30,borderRadius:5,border:"None",boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.1)"}}
                            onClick={()=>onSubmit(data._id)}
                            >Upload</button>}
                        </div>
                    </div>
                )):null}
            </div>
        </div>
    )
}

export default Tagihan
