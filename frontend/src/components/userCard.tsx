import '../index.css'
import { useState } from 'react'


export default function UserCard({ UserInfo }: { UserInfo: any }) {
    const [isHover, setIsHover] = useState(false)
    const profileStyle = {
        ...styles.profile, cursor: 'pointer',
        background: isHover ? 'blue' : 'lightblue',
    }
    return (
        <div style={styles.container} >
            <div style={styles.nameContainer}>
                <div style={styles.userName}> {UserInfo.name} </div>
                <div style={styles.userRole}> {UserInfo.role} </div>
            </div>
            <div style={profileStyle} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>{UserInfo.profile}</div>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',

    },
    nameContainer: {
        display: 'flex',
        flexDirection: 'column',

        alignItems: 'flex-end',
        flex: 1,
    },
    userName: {
        fontSize: '1.2em',
        fontWeight: 'bold',
        color: 'black',
    },
    userRole: {
        fontSize: '1em',
        color: 'gray',

    },
    profile: {
        margin: '5px 5px 5px 10px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
    }
}