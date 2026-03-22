import TripleToggle from "./toggleButton";
import { type DeviceDataType } from '../schema/device';

export default function DeviceInfoCard({ device, haveValue }: { device: DeviceDataType, haveValue: boolean }) {

    const typeOfIcon = {
        fan: "fa-solid fa-fan",
        light: "fa-solid fa-lightbulb"
    };

    const statusColor = {
        ...styles.status, background: device.state ? '#86f9a8' : '#ff6666'
    }

    return <div style={styles.container}>
        <div style={styles.title}>
            <div style={styles.icon}>
                <i className={typeOfIcon[device.type as keyof typeof typeOfIcon]}></i>
            </div>
            <div style={styles.name}>
                <div style={styles.deviceName}>{device.name}</div>
                <div style={styles.devicePlace}>{device.place}</div>
            </div>

            <div style={statusColor}>{device.state ? 'Online' : 'Offline'}</div>

        </div>
        <div style={styles.action}><TripleToggle /></div>
        {haveValue ?
            <div style={styles.value}>
                <div style={{ flex: '2' }}>Giá trị hiện tại </div>
                <div style={{ flex: '1', fontSize: '1.2rem', fontWeight: 'bold', left: 'auto' }}>{device.value} {device.unit}</div>
            </div> : <div>

            </div>
        }

    </div>
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        background: '#fff',
        width: '25%',
        borderRadius: '10px',
        overflow: 'hidden',
        border: 'solid black 1px'
    },
    icon: {
        display: 'flex',
        alignItems: 'center',
        width: '20%',
        justifyContent: 'center',
    },
    title: {
        display: 'flex',
        background: 'rgba(0,0,0,0.1)',
        padding: '5px 0px',

    },
    name: {
        display: 'flex',
        flexDirection: 'column' as const,
        width: '60%',
    },
    status: {
        color: '#fff',
        borderRadius: '8px',
        height: '24px',
        padding: '3px 6px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.8em',
        margin: '5px',

    },
    deviceName: {
        fontSize: '1.3em',
        fontWeight: '600',
    },
    devicePlace: {
        fontSize: '1em',
        color: 'gray',
    },
    action: {
        margin: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    value: {
        display: 'flex',
        width: '80%',
        background: 'rgba(0,0,0,0.1)',
        borderRadius: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        margin: '8px auto',
    },
}