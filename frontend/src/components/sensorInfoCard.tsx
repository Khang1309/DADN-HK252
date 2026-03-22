import { type SensorType } from "../schema/sensor"
import { useState } from "react"



export default function SensorInfoCard({ sensorInfo }: { sensorInfo: SensorType }) {

    const [isAdjust, setIsAdjust] = useState(false)


    const statusColor = {
        ...styles.status, background: sensorInfo.state ? '#86f9a8' : '#ff6666'
    }

    return <div style={styles.container}>
        <div style={styles.title}>
            <div style={styles.nameAndPlace}>
                <div style={styles.name}>{sensorInfo.name}</div>
                <div style={styles.place}>{sensorInfo.place}</div>
            </div>
            <div style={statusColor}>{sensorInfo.state ? 'Online' : 'Offline'}</div>
        </div>
        <div style={styles.value}>
            {(sensorInfo.sensor_data != null) ? sensorInfo.sensor_data.value + sensorInfo.unit : "No value"}
        </div>
        <div style={styles.content}>
            <div style={styles.minThres}>
                <div>Min</div>
                <form action=""></form>
                <input style={styles.thresValue} defaultValue={sensorInfo.threshold_min}></input>
            </div>
            <div>-</div>
            <div style={styles.maxThres}>
                <input style={styles.thresValue} defaultValue={sensorInfo.threshold_max}></input>
                <div>Max</div>
            </div>
        </div>
    </div>
}

const styles = {
    container: {
        width: '100%',
        padding: '10px',
        background: 'white',
        border: 'solid gray 1px',
        borderRadius: '10px',
    },
    title: {
        display: 'flex',
    },
    nameAndPlace: {
        width: '70%',
    },

    value: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: '1.8rem',
        fontWeight: '700',
        background: 'rgba(0,0,0,0.2)',
        border: '2px gray solid',
        borderRadius: '10px',
        margin: '5px 10px',
    },
    name: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    place: {

    },
    status: {
        marginLeft: 'auto',
        color: '#fff',
        borderRadius: '8px',
        height: '24px',
        padding: '3px 6px',
        display: 'flex',

        fontSize: '0.8em',


    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    minThres: {
        display: 'flex',
        margin: '10px',
        alignItems: 'center',
        justifyContent: 'right'
    },
    maxThres: {
        display: 'flex',
        margin: '10px',
        alignItems: 'center',
    },
    thresValue: {
        padding: '10px',
        border: '1px gray solid',
        background: 'rgba(0,0,0,0.1)',
        borderRadius: '10px',
        margin: '0 10px',
        width: '20%',
        color: '#000'
    }
}