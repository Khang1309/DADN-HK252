import TripleToggle from "../button/toggleButton";
import { type DeviceDataType } from '../../schema/device';
import { GoPencil } from "react-icons/go";
import { MdOutlineDelete } from "react-icons/md";
import { theme } from "../../utils/theme";
import { useState } from "react";
import { useDeviceStore } from "../../store/useDeviceInfo";
import toast from "react-hot-toast";
export default function DeviceInfoCard({ device, roomId }: { device: DeviceDataType, roomId: string }) {
    const editName = useDeviceStore((s) => s.changeDeviceName)
    const [deviceNameState, setDeviceName] = useState(device.deviceName)
    const [isEdit, setIsEdit] = useState(false);

    const statusColor = {
        ...styles.status, background: device.state === 'CONNECTED' ? '#86f9a8' : '#ff6666'
    }

    const handleSubmitNameChange = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newName = formData.get("deviceName") as string;

        const success = await editName(device.deviceId, newName, roomId)
        if (success) {
            setDeviceName(newName)
            toast.success("Changed name successfully!")
        }

        else {
            toast.error("Changed name failed!")
        }
        setIsEdit(false);
    }

    const submitButton = {
        ...styles.button,
        color: 'white',
        background: theme.dashboardTheme.buttonColor,
    }
    const cancelButton = {
        ...styles.button,
        background: 'rgba(0,0,0,0.2)',
    }

    return <div style={styles.container}>
        <div style={styles.title}>
            <div style={styles.name}>
                {isEdit ? (
                    <form style={{ display: 'flex', alignItems: 'center', gap: '5px' }} onSubmit={handleSubmitNameChange}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', maxWidth: '70%', }}>
                            <input style={styles.editInput} type="text" name="deviceName" defaultValue={device.deviceName} />
                        </div>
                        <button style={submitButton} type="submit">Save</button>
                        <button style={cancelButton} type="button" onClick={() => setIsEdit(false)}>Cancel</button>
                    </form>
                ) : (
                    <div style={styles.deviceName}>Name: {deviceNameState} <span style={{ cursor: 'pointer' }} onClick={() => setIsEdit(true)}><GoPencil /></span></div>
                )}

            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', justifyContent: "space-around" }}>

                <div style={statusColor}>{device.state}</div>
                <div style={{ marginLeft: 'auto', cursor: 'pointer', color: theme.dashboardTheme.roomCardDelete, background: "white", border: '1px solid red', borderRadius: '10px', padding: '0px 5px', fontSize: '20px' }}><MdOutlineDelete /></div>
            </div>
        </div>
        <div style={styles.action}>

            <div style={styles.value}>
                <div >Giá trị hiện tại </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginLeft: 'auto' }}>{device.value} {device.unit}</div>
            </div>

            <TripleToggle id={device.deviceId} state={device.onOffState != null ? device.onOffState : 'OFF'} />
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
        border: 'solid #886f61 1px'
    },
    icon: {
        display: 'flex',
        alignItems: 'center',
        width: '20%',
        justifyContent: 'center',
    },
    title: {
        display: 'flex',
        background: theme.dashboardTheme.titleInfoCardBg,
        padding: '5px 10px',

    },
    name: {
        display: 'flex',
        flexDirection: 'column' as const,
        width: '80%',
    },
    status: {

        borderRadius: '8px',
        height: '24px',
        padding: '3px 6px',
        display: 'flex',

        fontSize: '0.8em',
        marginBottom: '5px'

    },
    deviceName: {
        fontSize: '1.1em',
        fontWeight: '600',
    },
    devicePlace: {
        fontSize: '0.8em',
        color: 'gray',
    },
    action: {
        margin: '10px',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',

    },
    value: {
        display: 'flex',
        width: '100%',
        background: theme.dashboardTheme.valueInfoCardBg,
        borderRadius: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        margin: '10px',
    },
    button: {
        all: 'unset' as const,
        padding: '5px 10px',
        background: 'none',
        color: 'inherit',
        border: 'none',
        font: 'inherit' as const,
        cursor: 'pointer',
        outline: 'inherit' as const,
        borderRadius: '10px',
    },
    editInput: {
        fontSize: '1.3em',
        fontWeight: '500',
        background: 'rgba(0,0,0,0.2)',
        padding: '3px 10px',
        appearance: 'none' as const,
        color: 'black',
        border: 'none',
        borderRadius: '5px',
        width: '100%',
    }
}