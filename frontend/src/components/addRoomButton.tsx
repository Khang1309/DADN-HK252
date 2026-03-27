import '../index.css'
import { useState } from 'react'
import { theme } from '../utils/theme'
export default function AddRoomButton() {

    const [isHover, setIsHover] = useState(false)

    const buttonStyle = {
        ...styles.container, background: isHover ? theme.dashboardTheme.addDevicesButton : theme.dashboardTheme.buttonColor
    }

    return <div style={buttonStyle} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <div>
            <i className="fa-solid fa-plus"></i>
        </div>
        <div style={{ marginLeft: '5px' }}>
            Thêm phòng
        </div>
    </div>
}

const styles = {
    container: {
        display: 'flex',
        color: 'white',
        padding: '10px',
        borderRadius: '10px',
    }
}