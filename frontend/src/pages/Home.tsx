import { useState, useEffect } from "react"
import toast from "react-hot-toast"

import TotalCard from "../components/card/totalCard"
import OveralTypeCard from "../components/card/overalTypeCard"
import s from './Home.module.css'
import AddRoomButton from "../components/button/addRoomButton"
import { useRoomInfo } from "../store/useRoomInfo"
import { useDevicesStore } from "../store/useDevicesStore"
import RoomCard from "../components/card/roomCard"
import { theme } from "../utils/theme"
export default function Home() {

    const rooms = useRoomInfo((state) => state.rooms)
    const fetch = useRoomInfo((state) => state.fetchRooms)


    const [isAddRoom, setIsAddRoom] = useState(false)
    const handleAddRoom = useRoomInfo((state) => state.addRoom)

    const listOfOutput = useDevicesStore(state => state.listOfOutput);
    const listOfSensor = useDevicesStore(state => state.listOfSensor);

    const numberOfDevices = Object.values(listOfOutput).reduce((total, list) => total + list.length, 0);
    const numberOfSensors = Object.values(listOfSensor).reduce((total, list) => total + list.length, 0);

    const submitNameChange = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const newName = formData.get("roomName") as string;

        const success = await handleAddRoom(newName)
        if (success) {
            setIsAddRoom(false);
            toast.success("Add room successfully!")
            fetch()
        }

        else {
            setIsAddRoom(false);
            toast.error("Add room failed!")
        }
    }



    return <div className={s.container}>
        <div>
            <p className={s.title}>Dashboard</p>
            <p className={s.subTitle}>Tổng quan hệ thống nhà thông minh</p>
            <div className={s.listDevices}>
                <TotalCard name="Number of devices" total={numberOfDevices} icon="fa-brands fa-chromecast" colorName="black" />
                <TotalCard name="Number of sensor" total={numberOfSensors} icon="fa-solid fa-signal" colorName="green" />
            </div>

        </div>
        <div className={s.roomContainer}>
            <div className={s.yourRoom}>
                <div> Displaying {rooms.length} rooms</div>
                <div style={{ marginLeft: 'auto', }} onClick={() => setIsAddRoom(true)}>
                    <AddRoomButton />
                </div>
            </div>

            {isAddRoom &&
                <div className={s.editNameBox}>
                    <form style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} onSubmit={submitNameChange}>
                        <input className={s.editName} type="text" name="roomName" placeholder="Name your room" />

                        <button className={s.button} style={{ color: 'white', background: theme.dashboardTheme.buttonColor, }} type="submit" >Save</button >
                        <button className={s.button} style={{ background: 'rgba(0,0,0,0.2)', }} type="button" onClick={() => setIsAddRoom(false)}>Cancel</button>

                    </form>
                </div>
            }

            <div className={s.listOfRooms}>
                {rooms.map((item) => (
                    <RoomCard
                        key={item.roomId}
                        roomData={item}
                    />
                ))}
            </div>

        </div>

    </div>
}