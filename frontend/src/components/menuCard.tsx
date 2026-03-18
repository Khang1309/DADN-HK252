import '../index.css'
import { useState } from 'react'
import useMenuState from '../store/useMenuState'
import { useNavigate } from 'react-router';

type menuType = "Dashboard" | "OutputDevices" | "Sensor" | "History";


export default function MenuCard({ icon, name }: { icon: string, name: menuType }) {
    const handleClick = useMenuState((state) => state.setTab)
    const currentTab = useMenuState((state) => state.currentTab)
    const navigate = useNavigate()

    const [isHover, setIsHover] = useState(false)

    const isActive = currentTab === name;


    const dynamicStyle = {
        ...styles.container,
        // Logic: if active -> blue, else if hover -> lightgray, else -> white
        background: isActive ? '#67fcff' : (isHover ? '#f0f0f0' : '#fff'),
        transition: '0.2s all ease',
    };

    return <div style={dynamicStyle} onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)} onClick={() => { handleClick(name); navigate('/' + name.toLowerCase(), { replace: true }) }}>
        <div style={{ marginRight: '10px' }}>
            <i className={icon}></i>
        </div>
        <div>{name}</div>
    </div>
}

const styles = {
    container: {
        display: 'flex',
        padding: '15px',
        cursor: 'pointer',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        margin: '5px 0px',
        borderRadius: '10px',
    },
}