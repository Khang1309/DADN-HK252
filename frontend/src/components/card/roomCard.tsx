import { theme } from "../../utils/theme"
import { type RoomType } from "../../schema/room"
import { GoPencil, GoPlus } from "react-icons/go";
import { MdOutlineDelete } from "react-icons/md";
import DeviceInfoCard from "./deviceInfoCard";
import SensorInfoCard from "./sensorInfoCard";
import { useRoomInfo } from "../../store/useRoomInfo";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import axiosClient from "../../apis/api";
import { type DeviceDataType } from "../../schema/device";
import { type SensorType } from "../../schema/sensor";

export default function RoomCard({ roomData }: { roomData: RoomType }) {

    const roomId = roomData.roomId

    const [currentRoomName, setCurrentRoomName] = useState(roomData.roomName)

    const [listDevices, setListDevices] = useState<DeviceDataType[]>([]);
    const [listSensor, setListSensor] = useState<SensorType[]>([]);

    // 2. Fetch the data when the component mounts
    useEffect(() => {
        const fetchDevices = async () => {
            try {
                // Note: Since your axios interceptor returns response.data, we just await it directly
                const allDevices: any[] = await axiosClient.get(`/api/rooms/${roomId}/devices`);
                console.log(allDevices)
                // 3. The "Mail Sorter": Split them by type
                const outputs = allDevices.filter((device) => device.type === 'OUTPUT');
                const sensors = allDevices.filter((device) => device.type === 'SENSOR');

                setListDevices(outputs);
                setListSensor(sensors);

            } catch (error) {
                console.error(`Failed to fetch devices for room ${roomId}`, error);
            }
        };

        fetchDevices();
    }, [roomId]);

    const [isEdit, setIsEdit] = useState(false)
    const handleEditName = useRoomInfo((s) => s.changeRoomName)
    const submitNameChange = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const newName = formData.get("roomName") as string;


        const success = await handleEditName(roomId, newName)
        if (success) {
            setCurrentRoomName(newName)
            setIsEdit(false);
            toast.success("Changed name successfully!")
        }

        else {
            setIsEdit(false);
            toast.error("Changed name failed!")
        }
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
        <div style={styles.header}>
            <div style={styles.nameContainer}>
                {isEdit ? <>
                    <div style={styles.editNameBox}>
                        <form style={{ display: 'flex', alignItems: 'center', }} onSubmit={submitNameChange}>
                            <input style={styles.editName} type="text" name="roomName" defaultValue={roomData.roomName} />
                            <button style={submitButton} type="submit" >Save</button >
                            <button style={cancelButton} type="button" onClick={() => setIsEdit(false)}>Cancel</button>
                        </form>
                    </div>
                </>

                    :
                    <>
                        <div style={styles.roomName}>{currentRoomName}</div>
                        <div style={{ cursor: 'pointer', }} onClick={() => setIsEdit(true)}>
                            <GoPencil />
                        </div>
                    </>
                }
            </div>
            <div style={{ marginLeft: 'auto', fontSize: '1.5em', cursor: 'pointer', color: theme.dashboardTheme.roomCardDelete }}>
                <MdOutlineDelete />
            </div>
        </div>

        <div style={styles.listDevicesAndSensors}>
            {listDevices.length > 0 &&
                <div style={styles.outputDevices}>
                    <div>
                        Output Devices
                    </div>
                    <div style={styles.listDevices}>
                        {listDevices.map(item =>
                            <DeviceInfoCard
                                key={item.deviceId}
                                device={item}
                                roomId={roomId}
                            />
                        )}
                    </div>
                </div>
            }

            {listSensor.length > 0 &&
                <div style={styles.sensors}>
                    <div>Sensors</div>
                    <div style={styles.listSensors}>
                        {listSensor.map(item =>
                            <SensorInfoCard
                                key={item.deviceId}
                                sensorInfo={item}
                            />
                        )}

                    </div>
                </div>
            }
        </div>

        <div style={styles.addDevices}>
            <div><GoPlus /></div>
            <div>Add devices/sensors</div>
        </div>

    </div>
}

const styles = {
    container: {
        background: theme.dashboardTheme.roomCardBackground,
        padding: '10px',
        borderRadius: '5px',
        margin: '7px 0px',
        boxShadow: '2px 2px #e5e7eb'
    },

    header: {
        display: 'flex',
        alignItems: 'center',
    },

    nameContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    editNameBox: {
        position: 'relative' as const,
        display: 'flex',

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
        height: 'auto',
        width: '70%',
        borderRadius: '10px',
        margin: '0 3px',

    },
    editName: {
        fontSize: '1.3em',
        marginRight: '10px',
        fontWeight: '500',
        background: 'rgba(0,0,0,0.2)',
        padding: '3px 10px',
        appearance: 'none' as const,
        border: 'none',
        borderRadius: '5px',
    },

    roomName: {
        fontSize: '1.4em',
        marginRight: '10px',
        fontWeight: '500',
    },

    outputDevices: {
        marginTop: '10px',
    },

    sensors: {
        marginTop: '10px',

    },

    listDevicesAndSensors: {
        display: 'grid',
        width: '100%',
        padding: '10px',
        gridTemplateColumns: 'repeat(2, 1fr)',
        justifyContent: 'center',
        alignItems: 'start',
        gap: '20px',
        flexDirection: 'row' as const,
    },

    listDevices: {
        marginTop: '10px',
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: '10px',
    },

    listSensors: {
        marginTop: '10px',
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gap: '10px',

    },


    addDevices: {
        color: theme.dashboardTheme.addDevicesButton,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        marginTop: '10px',
        borderRadius: '15px',
        border: `1px dashed ${theme.dashboardTheme.addDevicesButton}`,
        cursor: 'pointer',
    }
}