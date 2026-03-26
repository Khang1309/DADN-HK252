import '../index.css'
import { useState, useEffect } from 'react'
import { useUserInfoStore } from '../store/useUserStore'

export default function UserCard() {

    const { info, isLoading, err, fetchUserInfo } = useUserInfoStore()
    const [isHover, setIsHover] = useState(false)

    useEffect(() => {
        fetchUserInfo()
    }, [fetchUserInfo])

    if (isLoading) return <div>Loading user info...</div>;
    if (err) return <div className="text-red-500">{err}</div>;
    if (!info) return <div>No data found</div>

    const profileStyle = {
        ...styles.profile, cursor: 'pointer',
        background: isHover ? 'blue' : 'lightblue',
    }
    return (
        <div style={styles.container} >
            <div style={styles.nameContainer}>
                <div style={styles.userName}> {info.name} </div>
            </div>
            <div style={profileStyle} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>{info.name[0].toUpperCase()}</div>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',

    },
    nameContainer: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
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