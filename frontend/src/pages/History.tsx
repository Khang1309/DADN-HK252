import { useMemo, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Field, FieldLabel } from '@/components/ui/field'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,

} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useHistoryStore } from '@/store/useHistoryStore'
import { useRoomInfo } from '@/store/useRoomInfo'
import { useDevicesStore } from '@/store/useDevicesStore'
import axiosClient from '@/apis/api'
import { type LogType, LogArray } from '@/schema/log'

export default function History() {
  const rooms = useRoomInfo((s) => s.rooms)
  const sensors = useDevicesStore((s) => s.listOfSensor)
  const outputs = useDevicesStore((s) => s.listOfOutput)
  const { currentRoom, currentDevice, setCurrentRoom, setCurrentDevice } = useHistoryStore()

  const [logs, setLogs] = useState<LogType[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const [isLoading, setIsLoading] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const devices = useMemo(() => {
    if (!currentRoom) return []
    const roomSensors = sensors[currentRoom.roomId] || []
    const roomOutputs = outputs[currentRoom.roomId] || []
    return [...roomSensors, ...roomOutputs]
  }, [currentRoom, sensors, outputs])

  const handleSelectRoom = (roomId: string) => {
    const room = rooms.find((r) => r.roomId === roomId)
    if (room) {
      setCurrentRoom(room)
      setCurrentDevice(null)
      setCurrentPage(1)
    }
    else {
      setCurrentRoom(null)
      setCurrentDevice(null)
      setCurrentPage(1)
    }
  }

  const handleSelectDevice = (deviceId: string) => {
    const device = devices.find((d) => d.deviceId === deviceId)
    if (device) {
      setCurrentDevice(device)
      setCurrentPage(1)
    }
  }

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true)
      try {
        if (!currentRoom) {
          const response = await axiosClient.get('/api/logs', {
            params: {
              page: currentPage,
              limit: itemsPerPage + 1,
            },
          })
          const data = LogArray.parse(response)
          setLogs(data || [])
        }
        else {
          if (currentDevice) {
            const response = await axiosClient.get(`/api/devices/${currentDevice?.deviceId}/logs`, {
              params: {
                page: currentPage,
                limit: itemsPerPage + 1,
              },
            })
            const data = LogArray.parse(response)
            setLogs(data || [])
          }
          else {
            setLogs([])

          }
        }
      } catch (error) {
        console.error('Failed to fetch logs:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLogs()

  }, [currentPage, currentRoom, currentDevice, itemsPerPage])

  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100);
    console.log(sectionRef)
    return () => clearTimeout(scrollTimeout);
  }, [currentPage, itemsPerPage]);
  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">History</h1>
        <p className="text-muted-foreground mt-1">View your device activity logs</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Filter by device</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Select
                value={currentRoom?.roomId || 'All'}
                onValueChange={handleSelectRoom}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Room" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="All" value="All">All</SelectItem>
                  {rooms.map((room) => (
                    <SelectItem key={room.roomId} value={room.roomId}>
                      {room.roomName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {currentRoom && currentRoom.roomId != 'All' && (
                <Select
                  value={currentDevice?.deviceId || ''}
                  onValueChange={handleSelectDevice}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select Device" />
                  </SelectTrigger>
                  <SelectContent>
                    {devices.map((device) => (
                      <SelectItem key={device.deviceId} value={device.deviceId}>
                        {device.deviceName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Logs table */}
      <div ref={sectionRef}>

      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card >
          <CardHeader>
            <CardTitle className="text-base">Activity Logs</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12 text-muted-foreground">
                Loading logs...
              </div>
            ) : logs.length === 0 ? (
              <div className="flex items-center justify-center py-12 text-muted-foreground">
                No logs available
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Device</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Details</TableHead>
                      {/* <TableHead>Type</TableHead> */}
                      <TableHead className="text-right">Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logs.map((log) => (
                      <TableRow key={log.logsId}>
                        <TableCell className="font-medium">{log.deviceName}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell className="text-muted-foreground w-[50%] truncate">
                          {log.detail}
                        </TableCell>
                        {/* <TableCell>
                          <Badge variant='success'>
                            {log.logType ? 'Output' : 'Sensor'}
                          </Badge>
                        </TableCell> */}
                        <TableCell className="text-right text-muted-foreground text-sm">
                          {new Date(log.timestamp).toLocaleString('vi-VN', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  <Field orientation="horizontal" className="w-fit">
                    <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
                    <Select defaultValue="10" value={String(itemsPerPage)} onValueChange={(val) => { setItemsPerPage(Number(val)); setCurrentPage(1) }}>
                      <SelectTrigger className="w-20" id="select-rows-per-page">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent align="start">
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>

                      </SelectContent>
                    </Select>
                  </Field>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setCurrentPage((prev) => (prev - 1)) }}
                    disabled={currentPage <= 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Prev
                  </Button>

                  <div className="flex items-center gap-1">

                    <Button

                      variant={'default'}
                      size="sm"
                      className="w-8 h-8 p-0"


                    >
                      {currentPage}
                    </Button>

                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setCurrentPage((prev) => (prev + 1)) }}
                    disabled={logs.length < itemsPerPage + 1}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}