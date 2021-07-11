import React,{useState} from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { useMediaQuery } from 'react-responsive'
const SidebarIndex = ({register,login}) => {
    const [show,setShow] = useState(false)
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    return (
        <div>
            {isPortrait ? <Sidebar
            register={register}
            login={login}
            />: <Navbar
            register={register}
            login={login}
            />}
        </div>
    )
}

export default SidebarIndex
