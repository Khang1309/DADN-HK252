import s from './Sensor.module.css'
import AddDeviceButton from '../components/addDeviceButton'
import SensorInfoCard from '../components/sensorInfoCard'
import { useSensorInfo } from '../store/useSensorInfo'
import { useEffect } from 'react'

export default function Sensor() {

    const { sensors, fetchSensors } = useSensorInfo()

    useEffect(() => {
        fetchSensors()
    }, [fetchSensors])

    return <div className={s.container}>
        <div className={s.title}>
            <div>
                <h1>Quản lý cảm biến </h1>
                <p>Xem thông số và điều chỉnh cảm biến của bạn</p>
            </div>
            <div className={s.add}>

                <AddDeviceButton />
            </div>
        </div>
        <div className={s.content}>
            <div>Danh sách cảm biến</div>
            <div className={s.listSensor}>
                {sensors.length > 0 ? (
                    sensors.map(item => (
                        <SensorInfoCard
                            key={item.id}
                            sensorInfo={item}
                        />
                    ))
                ) : (
                    <p>Chưa có cảm biến nào được kết nối.</p>
                )}
            </div>
        </div>
    </div>
}