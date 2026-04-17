import React, { useState, useEffect } from 'react';

import MyLineChart from '../components/LineChart';
import { useDevicesStore } from '../store/useDevicesStore';
import Dropdown from '../components/Dropdown';
import { useRoomInfo } from '../store/useRoomInfo';
import { useChartStore } from '../store/useChartStore';
import { theme } from '../utils/theme';

function Chart() {
    const rooms = useRoomInfo(s => s.rooms)
    const sensorData = useDevicesStore(s => s.listOfSensor)
    const fetchDevices = useDevicesStore(s => s.fetchDevices);

    // Use store for persistent state
    const currentRoom = useChartStore(s => s.currentRoom)
    const currentSensor = useChartStore(s => s.currentSensor)
    const setCurrentRoom = useChartStore(s => s.setCurrentRoom)
    const setCurrentSensor = useChartStore(s => s.setCurrentSensor)

    const [isLoading, setIsLoading] = useState(true);

    const handleSelectRoom = (room: any) => {
        setCurrentRoom(room);
        setCurrentSensor(sensorData[room.roomId]?.[0] || null);
    }

    // Initialize data on mount
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            await fetchDevices();
            setIsLoading(false);
        };

        if (Object.keys(sensorData).length === 0) {
            loadData();
        } else {
            setIsLoading(false);
        }
    }, []);

    // Initialize room and sensor selection only on first load
    useEffect(() => {
        if (rooms.length > 0 && !currentRoom) {
            const firstRoom = rooms[0];
            setCurrentRoom(firstRoom);
            setCurrentSensor(sensorData[firstRoom.roomId]?.[0] || null);
        }
    }, [rooms, currentRoom, currentSensor, sensorData, setCurrentRoom, setCurrentSensor]);

    if (isLoading) {
        return <div className="p-4">Loading your smart home data...</div>;
    }

    return <div className="p-4 font-[600] h-[85vh]" >
        <div className='text-[3em] text-black'>View your statistic</div>
        <div style={{ background: '#fff', boxShadow: '2px 2px #e5e7eb' }} className='rounded-[10px] p-4'>
            <div className='flex' >
                <div className='text-black flex-3'>Choose your sensor</div>
                <div className='flex-1'>
                    <Dropdown
                        element1={
                            <span className='flex justify-center items-center gap-2'>
                                {currentRoom?.roomName || "Select Room"}

                            </span>
                        }
                        element2={
                            rooms.map(room => (
                                <div
                                    key={room.roomId}
                                    onClick={() => handleSelectRoom(room)}
                                    className="cursor-pointer p-2 w-full"
                                >
                                    {room.roomName}
                                </div>
                            ))
                        }

                    />

                </div>
                <div className='flex-1'>
                    <Dropdown
                        element1={
                            <span className='flex justify-center items-center gap-2'>
                                {currentSensor?.deviceName || "Select Sensor"}

                            </span>
                        }
                        element2={
                            currentRoom && sensorData[currentRoom.roomId]
                                ? sensorData[currentRoom.roomId].map(device => (
                                    <div
                                        key={device.deviceId}
                                        onClick={() => setCurrentSensor(device)}
                                        className="cursor-pointer p-2 w-full"
                                    >
                                        {device.deviceName}
                                    </div>
                                ))
                                : []
                        }

                    />
                </div>
            </div>

            {
                currentSensor ?

                    <MyLineChart
                        option={{
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                // prettier-ignore
                                data: currentSensor.data.map((sensorData) => {
                                    const date = new Date(sensorData.time)
                                    return date.toLocaleTimeString('vi-VN', { hour12: false });

                                }
                                )
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [
                                {
                                    data: currentSensor.data.map((sensorData) =>
                                        sensorData.value
                                    ),
                                    type: 'line'
                                }
                            ]
                        }}
                        width="100%"
                        height="500px"
                    />
                    : <div className='text-black'>No data</div>
            }

        </div>
    </div>
}

export default Chart;