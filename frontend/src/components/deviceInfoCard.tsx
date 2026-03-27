import TripleToggle from "./toggleButton";
import { type DeviceDataType } from '../schema/device';
import { GoPencil } from "react-icons/go";
import { MdOutlineDelete } from "react-icons/md";
import { theme } from "../utils/theme";
import { useState } from "react";
import { useDeviceStore } from "../store/useDeviceInfo";
import toast from "react-hot-toast";
export default function DeviceInfoCard({ device, haveValue }: { device: DeviceDataType, haveValue: boolean }) {
    const editName = useDeviceStore((s) => s.changeDeviceName)
    const [isEdit, setIsEdit] = useState(false);

    const statusColor = {
        ...styles.status, background: device.state ? '#86f9a8' : '#ff6666'
    }

    const handleSubmitNameChange = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newName = formData.get("deviceName") as string;

        const success = await editName(device.id, newName)
        if (success) {

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
                            <input style={styles.editInput} type="text" name="deviceName" defaultValue={device.name} />
                        </div>
                        <button style={submitButton} type="submit">Save</button>
                        <button style={cancelButton} type="button" onClick={() => setIsEdit(false)}>Cancel</button>
                    </form>
                ) : (
                    <div style={styles.deviceName}>Name: {device.name} <span style={{ cursor: 'pointer' }} onClick={() => setIsEdit(true)}><GoPencil /></span></div>
                )}
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
        width: '80%',
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
        alignItems: 'center',
        justifyContent: 'center',

    },
    value: {
        display: 'flex',
        width: '70%',
        background: 'rgba(0,0,0,0.1)',
        borderRadius: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        marginRight: '10px',
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
        border: 'none',
        borderRadius: '5px',
        width: '100%',
    }
}