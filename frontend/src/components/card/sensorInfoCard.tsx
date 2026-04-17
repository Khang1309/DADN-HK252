import { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
import toast from "react-hot-toast";


import { type SensorType } from "../../schema/sensor"
import { MdOutlineDelete } from "react-icons/md";
import { theme } from "../../utils/theme";
import { useDevicesStore } from "../../store/useDevicesStore";
import Modal from "../Modal";
import InputNumber from "../InputNumber";

export default function SensorInfoCard({ sensorInfo, roomId }: { sensorInfo: SensorType, roomId: string }) {
    const sensor = useDevicesStore((s) => (s.listOfSensor[roomId].find(sens => sens.deviceId == sensorInfo.deviceId)))
    const editName = useDevicesStore(s => s.updateNameSensor)
    const deleteSensor = useDevicesStore(s => s.deleteSensor)
    const changeSensorValue = useDevicesStore(s => s.updateValueSensor)

    const [isEdit, setIsEdit] = useState(false);
    const latestData = sensor ? sensor.data[sensor.data.length - 1] : null;
    const statusColor = {
        ...styles.status, background: sensorInfo.state ? '#86f9a8' : '#ff6666'
    }

    const [isDelete, setIsDelete] = useState(false)
    const handleDelete = async () => {
        deleteSensor(sensorInfo.deviceId, roomId)
    }

    const handleSubmitNameChange = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newName = formData.get("sensorName") as string;

        try {
            await editName(roomId, newName, sensorInfo.deviceId)
            toast.success("Changed name successfully!")
            setIsEdit(false);

        } catch (error) {
            toast.error("Changed name failed!")

            setIsEdit(false);
        }

    }

    const [isEditValue, setIsEditValue] = useState(false);
    const [valueMin, setValueMin] = useState(sensorInfo.thresholdMin || 0)

    const [valueMax, setValueMax] = useState(sensorInfo.thresholdMax || 100)

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
        <Modal isOpen={isDelete} setIsOpen={setIsDelete} onConfirm={handleDelete} >
            {
                <div>
                    <div style={{ fontSize: '1.3em', fontWeight: '600' }}>Delete Sensor</div>
                    <div>
                        Do you want to delete {sensorInfo.deviceName}
                    </div>
                </div>
            }
        </Modal>
        <div style={styles.title}>
            <div style={styles.name}>
                {isEdit ? (
                    <form style={{ display: 'flex', alignItems: 'center', gap: '5px' }} onSubmit={handleSubmitNameChange}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', maxWidth: '70%', }}>
                            <input style={styles.editInput} type="text" name="sensorName" defaultValue={sensorInfo.deviceName} />
                        </div>
                        <button style={submitButton} type="submit">Save</button>
                        <button style={cancelButton} type="button" onClick={() => setIsEdit(false)}>Cancel</button>
                    </form>
                ) : (
                    <div style={styles.deviceName}>Name: {sensorInfo.deviceName} <span style={{ cursor: 'pointer' }} onClick={() => setIsEdit(true)}><GoPencil /></span></div>
                )}
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                <div style={statusColor}>{sensorInfo.state}</div>
                <div style={{ marginLeft: 'auto', cursor: 'pointer', color: theme.dashboardTheme.roomCardDelete, background: "white", border: '1px solid red', borderRadius: '10px', padding: '0px 5px', fontSize: '20px' }}>
                    <MdOutlineDelete onClick={() => setIsDelete(true)} /></div>
            </div>
        </div>
        <div style={styles.action}>
            <div style={styles.value}>
                <div>Giá trị hiện tại </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginLeft: 'auto' }}>
                    {latestData?.value !== undefined ? (latestData.value * 0.1).toFixed(1) + "C" : "Loading..."}
                </div>
            </div>
            <div style={styles.thresholds}>
                <div style={styles.minThres}>
                    <div>Min</div>
                    <InputNumber initValue={valueMin} isEdit={isEditValue} setValue={setValueMin} />
                </div>
                <div>-</div>
                <div style={styles.maxThres}>
                    <InputNumber initValue={valueMax} isEdit={isEditValue} setValue={setValueMax} />
                    <div>Max</div>
                </div>
                {isEditValue ?
                    <div style={{ display: 'flex' }}>
                        <button style={submitButton} type="button" onClick={async () => {
                            try {
                                await changeSensorValue(roomId, sensorInfo.deviceId, valueMin, valueMax)
                                toast.success("Threshold updated successfully!")
                                setIsEditValue(false);
                            } catch (error) {
                                toast.error("Failed to update threshold!")
                            }
                        }}>Save</button>
                        <button style={cancelButton} type="button" onClick={() => {
                            setValueMin(sensorInfo.thresholdMin || 0)
                            setValueMax(sensorInfo.thresholdMax || 100)
                            setIsEditValue(false)
                        }}>Cancel</button>
                    </div>
                    :
                    <span style={{ cursor: 'pointer' }} onClick={() => setIsEditValue(true)}><GoPencil /></span>

                }

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
        border: 'solid #886f61 1px'
    },
    title: {
        display: 'flex',
        background: theme.dashboardTheme.titleInfoCardBg,
        padding: '5px 10px',
    },
    name: {
        display: 'flex',
        flexDirection: 'column' as const,
        width: '70%',
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
    thresholds: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

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
        background: theme.dashboardTheme.buttonBackgroundColor,
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
        margin: '3px',
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