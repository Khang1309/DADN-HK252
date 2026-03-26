import { theme } from "../utils/theme"
import { type RoomType } from "../schema/room"
import { GoPencil, GoPlus } from "react-icons/go";
import { MdOutlineDelete } from "react-icons/md";
import DeviceInfoCard from "./deviceInfoCard";
import SensorInfoCard from "./sensorInfoCard";

export default function RoomCard({ roomData }: { roomData: RoomType }) {

    const listDevices = roomData.listOfOutputDevices
    const listSensor = roomData.listOfSensors

    return <div style={styles.container}>
        <div style={styles.header}>
            <div style={styles.nameContainer}>
                <div style={styles.roomName}>{roomData.roomName}</div>
                <div style={{ cursor: 'pointer', }}>
                    <GoPencil />
                </div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: '1.5em', cursor: 'pointer', color: theme.dashboardTheme.roomCardDelete }}>
                <MdOutlineDelete />
            </div>
        </div>

        {listDevices.length > 0 &&
            <div style={styles.outputDevices}>
                <div>
                    Output Devices
                </div>
                <div style={styles.listDevices}>
                    {listDevices.map(item =>
                        <DeviceInfoCard
                            key={item.id}
                            device={item}
                            haveValue={true}
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
                            key={item.id}
                            sensorInfo={item}
                        />
                    )}

                </div>
            </div>
        }

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
    },

    header: {
        display: 'flex',
        alignItems: 'center',
    },

    nameContainer: {
        display: 'flex',
        alignItems: 'center',
    },

    roomName: {
        fontSize: '1.3em',
        marginRight: '10px',
        fontWeight: '500',
    },

    outputDevices: {
        marginTop: '0px',
    },

    sensors: {
        marginTop: '10px',

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