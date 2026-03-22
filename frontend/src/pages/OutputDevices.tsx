import s from './OutputDevices.module.css'
import AddDeviceButton from '../components/addDeviceButton'
import { useEffect, useState } from 'react'
import DeviceInfoCard from '../components/deviceInfoCard'
import { useDeviceStore } from '../store/useDeviceInfo'

export default function OutputDevices() {
    //Lay danh sach device 
    const { devices, fetchDevices } = useDeviceStore()

    const [inputText, setInputText] = useState("")
    const [stateDevice, setStateDevice] = useState("")
    const [placeDevice, setPlaceDevice] = useState("")

    const handleSearch = () => {
        // goi api search
    }

    const handleInput = (e: any) => {
        setInputText(e.target.value.toLowerCase());
    }
    const handleStateDevice = (e: any) => {
        setStateDevice(e.target.value.toLowerCase());
    }
    const handlePlaceDevice = (e: any) => {
        setPlaceDevice(e.target.value.toLowerCase());
    }

    useEffect(() => {
        fetchDevices()
    }, [fetchDevices])

    return <div className={s.container}>
        <div className={s.title}>
            <div className={s.left}>
                <h1>Quản lý thiết bị </h1>
                <p>Điều khiển và theo dõi các thiết bị của bạn</p>
            </div >
            <div className={s.right}>
                <AddDeviceButton />
            </div>
        </div>
        <div className={s.searchBar}>
            <input type="text" placeholder='Tìm kiếm...' onChange={handleInput} />
            <div>
                <select value={stateDevice} onChange={handleStateDevice}>
                    <option value="All">Tất cả trạng thái</option>
                    <option value="On">Đang bật</option>
                    <option value="Off">Đang tắt</option>
                    <option value="Auto">Tự động</option>
                </select>
            </div>
            <div>
                <select value={placeDevice} onChange={handlePlaceDevice}>
                    <option value="All">Tất cả địa điểm</option>
                    <option value="Livingroom">Phòng khách</option>
                    <option value="Bedroom">Phòng ngủ</option>
                </select>
            </div>

        </div>
        <div className={s.content}>
            <div className={s.numberDevices}>
                Số lượng thiết bị là
            </div>
            <div className={s.listOfCard}>
                {devices.map(item =>
                    <DeviceInfoCard
                        key={item.id}
                        device={item}
                        haveValue={true}
                    />
                )}

            </div>
        </div>
    </div>
}