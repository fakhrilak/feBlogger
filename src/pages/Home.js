import React,{useEffect,useState} from 'react'
import Card from '../components/Card/Card'
import { API,config } from '../config/api'

const Home = () => {
    const [page,setPage] = useState(0)
    const [data,setData] = useState([])
    useEffect(()=>{
        API.get("/accepted-post")
        .then((res)=>{
            setData(res.data.data)
        })
        .catch((err)=>{
            alert(err.response.message)
        })
    },[])
    return (
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr"}}>
            <div>
                {data.length > 0? data.map((data)=>(
                    <Card
                    id={data._id}
                    gambar={data.tumbname}
                    waktu={data.createAt}
                    judul={data.judul}
                    content={data.kontent}
                    />
                )):<h1>Loading...</h1>}
                
            </div>
        </div>
    )
}

export default Home
