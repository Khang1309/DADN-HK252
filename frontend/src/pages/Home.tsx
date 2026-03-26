import TotalCard from "../components/totalCard"
import OveralTypeCard from "../components/overalTypeCard"
import s from './Home.module.css'
import { useState, useEffect } from "react"
import AddRoomButton from "../components/addRoomButton"
import { useRoomInfo } from "../store/useRoomInfo"
import RoomCard from "../components/roomCard"

export default function Home() {

    const rooms = useRoomInfo((state) => state.rooms)
    const fetch = useRoomInfo((state) => state.fetchRooms)
    const [place, setPlace] = useState()

    const handlePlace = (event: any) => {
        setPlace(event.target.value)
    }

    useEffect(() => {
        fetch()
    }, [fetch])

    return <div className={s.container}>
        <div>
            <p className={s.title}>Dashboard</p>
            <p className={s.subTitle}>Tổng quan hệ thống nhà thông minh</p>
            <div className={s.listDevices}>
                <TotalCard name="Tong thiet bi" total={16} icon="fa-brands fa-chromecast" colorName="black" />
                <TotalCard name="Dang hoat dong" total={15} icon="fa-solid fa-signal" colorName="green" />
                <TotalCard name="Ngoai tuyen" total={16} icon="fa-solid fa-eye-low-vision" colorName="red" />
            </div>

        </div>
        <div className={s.roomContainer}>
            <div className={s.yourRoom}>
                <div> Các phòng của bạn</div>
                <div style={{ marginLeft: 'auto', }}>
                    <AddRoomButton />
                </div>
            </div>


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