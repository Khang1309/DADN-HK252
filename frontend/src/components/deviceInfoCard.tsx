import TripleToggle from "./toggleButton";
import { type DeviceDataType } from '../schema/device';
import { GoPencil } from "react-icons/go";
import { MdOutlineDelete } from "react-icons/md";
import { theme } from "../utils/theme";
export default function DeviceInfoCard({ device, haveValue }: { device: DeviceDataType, haveValue: boolean }) {

    const statusColor = {
        ...styles.status, background: device.state ? '#86f9a8' : '#ff6666'
    }

    return <div style={styles.container}>
        <div style={styles.title}>
            <div style={styles.name}>
                <div style={styles.deviceName}>Name: {device.name} <span style={{ cursor: 'pointer' }}><GoPencil /></span></div>
                <div style={styles.devicePlace}>Place: {device.place}</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column' }}>

                <div style={statusColor}>{device.state ? 'Online' : 'Offline'}</div>
                <div style={{ marginLeft: 'auto', cursor: 'pointer', color: theme.dashboardTheme.roomCardDelete }}><MdOutlineDelete /></div>
            </div>
        </div>
        <div style={styles.action}>
            {haveValue &&
                <div style={styles.value}>
                    <div style={{ flex: '2' }}>Giá trị hiện tại </div>
                    <div style={{ flex: '1', fontSize: '1.2rem', fontWeight: 'bold', left: 'auto' }}>{device.value} {device.unit}</div>
                </div>
            }
            <TripleToggle />
        </div>
    </div>
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        background: '#fff',
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
        padding: '5px 10px',

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

        fontSize: '0.8em',
        marginBottom: '5px'

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
        marginRight: '10px',
    },
}