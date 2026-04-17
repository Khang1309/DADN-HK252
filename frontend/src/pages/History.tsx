import { useMemo, useState, useEffect } from "react"
import { IoMdArrowDropleft } from "react-icons/io"
import Dropdown from "../components/Dropdown"
import { useHistoryStore } from "../store/useHistoryStore"
import { useRoomInfo } from "../store/useRoomInfo"
import { useDevicesStore } from "../store/useDevicesStore"
import axiosClient from "../apis/api"

interface LogEntry {
    id: string
    deviceId: string
    deviceName: string
    action: string
    timestamp: string
    status: string
}

export default function History() {
    const rooms = useRoomInfo(s => s.rooms)
    const sensors = useDevicesStore(s => s.listOfSensor)
    const outputs = useDevicesStore(s => s.listOfOutput)
    const { currentRoom, currentDevice, setCurrentRoom, setCurrentDevice } = useHistoryStore()


    const [logs, setLogs] = useState<LogEntry[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const itemsPerPage = 10

    // Combined devices array from sensors + outputs for the selected room
    const devices = useMemo(() => {
        if (!currentRoom) return []
        const roomSensors = sensors[currentRoom.roomId] || []
        const roomOutputs = outputs[currentRoom.roomId] || []
        return [...roomSensors, ...roomOutputs]
    }, [currentRoom, sensors, outputs])

    const handleSelectRoom = (room: any) => {
        setCurrentRoom(room)
        setCurrentDevice(devices[0] || null)
        setCurrentPage(1)
    }

    const handleSelectDevice = (device: any) => {
        setCurrentDevice(device)
        setCurrentPage(1)
    }

    // Fetch logs with pagination
    useEffect(() => {
        const fetchLogs = async () => {
            setIsLoading(true)
            try {
                const response = await axiosClient.get('/api/logs', {
                    params: {
                        page: currentPage,
                        limit: itemsPerPage
                    }
                })
                console.log(response)

                setLogs(response || [])
                setTotalPages(response.data.totalPages || 1)
            } catch (error) {
                console.error('Failed to fetch logs:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchLogs()
    }, [currentPage])

    return <div className="p-4 font-[600]">
        <div className="text-black text-[3em] mb-4">View your history</div>

        <div style={{ background: '#fff', boxShadow: '2px 2px #e5e7eb' }} className='rounded-[10px] p-4 mb-4'>
            <div className="text-black text-lg mb-3">Filter by device</div>
            <div className="flex gap-4">
                {/* Room Dropdown */}
                <div className="">
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

                {/* Device Dropdown */}
                {currentRoom && (
                    <div className="">
                        <Dropdown
                            element1={
                                <span className='flex justify-center items-center gap-2'>
                                    {currentDevice?.deviceName || "Select Device"}

                                </span>
                            }
                            element2={
                                devices.map(device => (
                                    <div
                                        key={device.deviceId}
                                        onClick={() => handleSelectDevice(device)}
                                        className="cursor-pointer p-2 w-full"
                                    >
                                        {device.deviceName}
                                    </div>
                                ))
                            }
                        />
                    </div>
                )}
            </div>
        </div>

        {/* History Cards */}
        <div style={{ background: '#fff', boxShadow: '2px 2px #e5e7eb' }} className='rounded-[10px] p-4'>
            <div className="text-black text-lg mb-4">Activity Logs</div>

            {isLoading ? (
                <div className="text-center text-gray-500 py-8">Loading logs...</div>
            ) : logs.length === 0 ? (
                <div className="text-center text-gray-500 py-8">No logs available</div>
            ) : (
                <>
                    <div className="space-y-3">
                        {logs.map((log) => (
                            <div key={log.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-black font-semibold">{log.deviceName}</h3>
                                        <p className="text-gray-600 text-sm">{log.action}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${log.status === 'ON' || log.status === 'Success'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {log.status}
                                    </span>
                                </div>
                                <p className="text-gray-500 text-xs">
                                    {new Date(log.timestamp).toLocaleString('vi-VN')}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-2 mt-6">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:bg-gray-400 hover:bg-gray-700"
                        >
                            Previous
                        </button>

                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-2 rounded-md ${currentPage === page
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-black hover:bg-gray-300'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:bg-gray-400 hover:bg-gray-700"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    </div>
}