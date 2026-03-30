import TotalCard from "../components/card/totalCard"
import OveralTypeCard from "../components/card/overalTypeCard"
import s from './Home.module.css'
import { useState, useEffect } from "react"
import AddRoomButton from "../components/button/addRoomButton"
import { useRoomInfo } from "../store/useRoomInfo"
import RoomCard from "../components/card/roomCard"
import toast from "react-hot-toast"
import { theme } from "../utils/theme"
export default function Home() {

    const rooms = useRoomInfo((state) => state.rooms)
    const fetch = useRoomInfo((state) => state.fetchRooms)
    const [place, setPlace] = useState()

    const handlePlace = (event: any) => {
        setPlace(event.target.value)
    }

    const [isAddRoom, setIsAddRoom] = useState(false)
    const handleAddRoom = useRoomInfo((state) => state.addRoom)

    const submitNameChange = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const newName = formData.get("roomName") as string;


        const success = await handleAddRoom(newName)
        if (success) {
            setIsAddRoom(false);
            toast.success("Changed name successfully!")
            fetch()
        }

        else {
            setIsAddRoom(false);
            toast.error("Changed name failed!")
        }
    }

    useEffect(() => {
        fetch()
    }, [fetch])

    return <div className={s.container}>
        <div>
            <p className={s.title}>Dashboard</p>
            <p className={s.subTitle}>Tổng quan hệ thống nhà thông minh</p>
            <div className={s.listDevices}>
                <TotalCard name="Tổng thiết bị" total={16} icon="fa-brands fa-chromecast" colorName="black" />
                <TotalCard name="Đang hoạt động" total={15} icon="fa-solid fa-signal" colorName="green" />
                <TotalCard name="Ngoại tuyến" total={16} icon="fa-solid fa-eye-low-vision" colorName="red" />
            </div>

        </div>
        <div className={s.roomContainer}>
            <div className={s.yourRoom}>
                <div> Các phòng của bạn</div>
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
        {/* <div className={s.chooseSensor}>
            <div className={s.overall}>
                <p className={s.secondTitle}>Your room</p>
                <div>
                    <form>
                        <select value={place} onChange={handlePlace}>
                            <option value="Livingroom">Phòng khách</option>
                            <option value="Bedroom">Phòng ngủ</option>
                        </select>
                    </form>
                </div>
            </div>
            <div className={s.valueCard}>
                <OveralTypeCard iconName="fa-solid fa-temperature-full" value={10} type="Nhiệt độ" place="Phòng khách" color="#fbc7a7" />
                <OveralTypeCard iconName="fa-solid fa-droplet" value={10} type="Độ ẩm" place="Phòng khách" color="#d5e9f1" />
            </div>
        </div>
        <div className={s.chart}>

        </div> */}
    </div>
}