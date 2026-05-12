import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import EChartsWrapper from '@/components/EChartsWrapper'
import { useDevicesStore } from '@/store/useDevicesStore'
import { useRoomInfo } from '@/store/useRoomInfo'
import { useChartStore } from '@/store/useChartStore'

export default function Chart() {
  const rooms = useRoomInfo((s) => s.rooms)
  const sensorData = useDevicesStore((s) => s.listOfSensor)
  const fetchDevices = useDevicesStore((s) => s.fetchDevices)

  const currentRoom = useChartStore((s) => s.currentRoom)
  const currentSensor = useChartStore((s) => s.currentSensor)
  const setCurrentRoom = useChartStore((s) => s.setCurrentRoom)
  const setCurrentSensor = useChartStore((s) => s.setCurrentSensor)

  const [isLoading, setIsLoading] = useState(true)

  const handleSelectRoom = (roomId: string) => {
    const room = rooms.find((r) => r.roomId === roomId)
    if (room) {
      setCurrentRoom(room)
      setCurrentSensor(sensorData[room.roomId]?.[0] || null)
    }
  }

  const handleSelectSensor = (sensorId: string) => {
    if (!currentRoom) return
    const sensor = sensorData[currentRoom.roomId]?.find((s) => s.deviceId === sensorId)
    if (sensor) setCurrentSensor(sensor)
  }

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      await fetchDevices()
      setIsLoading(false)
    }

    if (Object.keys(sensorData).length === 0) {
      loadData()
    } else {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (rooms.length > 0 && !currentRoom) {
      const firstRoom = rooms[0]
      setCurrentRoom(firstRoom)
      setCurrentSensor(sensorData[firstRoom.roomId]?.[0] || null)
    }
  }, [rooms, currentRoom, sensorData, setCurrentRoom, setCurrentSensor])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-muted-foreground">Loading your smart home data...</div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Chart</h1>
        <p className="text-muted-foreground mt-1">View your sensor statistics</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle>Sensor Data</CardTitle>
              <div className="flex gap-3">
                <Select
                  value={currentRoom?.roomId || ''}
                  onValueChange={handleSelectRoom}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Room" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem key={room.roomId} value={room.roomId}>
                        {room.roomName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={currentSensor?.deviceId || ''}
                  onValueChange={handleSelectSensor}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Sensor" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentRoom && sensorData[currentRoom.roomId]
                      ? sensorData[currentRoom.roomId].map((device) => (
                          <SelectItem key={device.deviceId} value={device.deviceId}>
                            {device.deviceName}
                          </SelectItem>
                        ))
                      : null}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {currentSensor ? (
              <EChartsWrapper
                option={{
                  tooltip: {
                    trigger: 'axis',
                  },
                  grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true,
                  },
                  xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [...currentSensor.data].reverse().map((d) => {
                      const date = new Date(d.time || d.timestamp || '')
                      return date.toLocaleTimeString('vi-VN', { hour12: false })
                    }),
                  },
                  yAxis: {
                    type: 'value',
                  },
                  series: [
                    {
                      data: [...currentSensor.data].reverse().map((d) => d.value),
                      type: 'line',
                      smooth: true,
                      areaStyle: {
                        opacity: 0.1,
                      },
                    },
                  ],
                }}
                width="100%"
                height="500px"
              />
            ) : (
              <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                No sensor data available. Select a room and sensor above.
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}