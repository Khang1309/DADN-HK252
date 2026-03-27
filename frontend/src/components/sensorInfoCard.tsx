import { type SensorType } from "../schema/sensor"
import { GoPencil } from "react-icons/go";
import { MdOutlineDelete } from "react-icons/md";
import { theme } from "../utils/theme";
import { useState } from "react";
import { useSensorInfo } from "../store/useSensorInfo";
import toast from "react-hot-toast";


export default function SensorInfoCard({ sensorInfo }: { sensorInfo: SensorType }) {
    const editName = useSensorInfo((s) => s.changeSensorName)
    const [isEdit, setIsEdit] = useState(false);

    const statusColor = {
        ...styles.status, background: sensorInfo.state ? '#86f9a8' : '#ff6666'
    }

    const handleSubmitNameChange = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newName = formData.get("sensorName") as string;


        const success = await editName(sensorInfo.id, newName)
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <input style={styles.editInput} type="text" name="sensorName" defaultValue={sensorInfo.name} />
                        </div>
                        <button style={submitButton} type="submit">Save</button>
                        <button style={cancelButton} type="button" onClick={() => setIsEdit(false)}>Cancel</button>
                    </form>
                ) : (
                    <div style={styles.deviceName}>Name: {sensorInfo.name} <span style={{ cursor: 'pointer' }} onClick={() => setIsEdit(true)}><GoPencil /></span></div>
                )}
                <div style={styles.devicePlace}>Place: {sensorInfo.place}</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column' }}>
                <div style={statusColor}>{sensorInfo.state ? 'Online' : 'Offline'}</div>
                <div style={{ marginLeft: 'auto', cursor: 'pointer', color: theme.dashboardTheme.roomCardDelete }}><MdOutlineDelete /></div>
            </div>
        </div>
        <div style={styles.action}>
            <div style={styles.value}>
                <div style={{ flex: '2' }}>Giá trị hiện tại </div>
                <div style={{ flex: '1', fontSize: '1.2rem', fontWeight: 'bold', left: 'auto' }}>
                    {(sensorInfo.sensor_data != null) ? sensorInfo.sensor_data.value + sensorInfo.unit : "No value"}
                </div>
            </div>
            <div style={styles.thresholds}>
                <div style={styles.minThres}>
                    <div>Min</div>
                    <input style={styles.thresValue} defaultValue={sensorInfo.threshold_min}></input>
                </div>
                <div>-</div>
                <div style={styles.maxThres}>
                    <input style={styles.thresValue} defaultValue={sensorInfo.threshold_max}></input>
                    <div>Max</div>
                </div>
            </div>
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
        width: '60%',
        background: 'rgba(0,0,0,0.1)',
        borderRadius: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        marginRight: '10px',
    },
    thresholds: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
    },
    minThres: {
        display: 'flex',
        margin: '0 5px',
        alignItems: 'center',
        justifyContent: 'right'
    },
    maxThres: {
        display: 'flex',
        margin: '0 5px',
        alignItems: 'center',
    },
    thresValue: {
        padding: '5px',
        border: '1px gray solid',
        background: 'rgba(0,0,0,0.1)',
        borderRadius: '5px',
        margin: '0 5px',
        width: '40px',
        color: '#000',
        textAlign: 'center' as const,
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
    }
}