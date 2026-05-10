import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Pencil, Trash2, Plus } from 'lucide-react'
import toast from 'react-hot-toast'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import DeviceCard from '@/components/DeviceCard'
import SensorCard from '@/components/SensorCard'
import AddDeviceForm from '@/components/AddDeviceForm'
import { type RoomType } from '@/schema/room'
import { useRoomInfo } from '@/store/useRoomInfo'
import { useDevicesStore } from '@/store/useDevicesStore'

interface RoomCardProps {
  roomData: RoomType
  index: number
}

export default function RoomCard({ roomData, index }: RoomCardProps) {
  const roomId = roomData.roomId
  const [currentRoomName, setCurrentRoomName] = useState(roomData.roomName)

  const fetchDevices = useDevicesStore((s) => s.fetchDevices)
  const listDevices = useDevicesStore((s) => s.listOfOutput[roomData.roomId])
  const listSensor = useDevicesStore((s) => s.listOfSensor[roomData.roomId])
  const addOutput = useDevicesStore((s) => s.addOutput)
  const addSensor = useDevicesStore((s) => s.addSensor)
  const deleteRoom = useRoomInfo((s) => s.deleteRoom)
  const handleEditName = useRoomInfo((s) => s.changeRoomName)

  const [isDelete, setIsDelete] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editValue, setEditValue] = useState(roomData.roomName)
  const [isAddDevice, setIsAddDevice] = useState(false)

  useEffect(() => {
    fetchDevices()
  }, [roomId])

  const handleDelete = async () => {
    await deleteRoom(roomId)
    setIsDelete(false)
  }

  const submitNameChange = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await handleEditName(roomId, editValue)
    if (success) {
      setCurrentRoomName(editValue)
      setIsEdit(false)
      toast.success('Room name updated!')
    } else {
      setIsEdit(false)
      toast.error('Failed to update room name!')
    }
  }

  return (
    <>
      {/* Delete confirmation */}
      <Dialog open={isDelete} onOpenChange={setIsDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Room</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{roomData.roomName}"? All devices in this room will also be removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDelete(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add device dialog */}
      <Dialog open={isAddDevice} onOpenChange={setIsAddDevice}>
        <DialogContent className="sm:max-w-md">
          <AddDeviceForm
            roomId={roomId}
            onAddOutput={addOutput}
            onAddSensor={addSensor}
            onClose={() => setIsAddDevice(false)}
          />
        </DialogContent>
      </Dialog>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-all">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {isEdit ? (
                  <form onSubmit={submitNameChange} className="flex items-center gap-2 flex-1">
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="h-8"
                      autoFocus
                    />
                    <Button type="submit" size="sm" className="h-8">Save</Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8"
                      onClick={() => { setIsEdit(false); setEditValue(currentRoomName) }}
                    >
                      Cancel
                    </Button>
                  </form>
                ) : (
                  <>
                    <CardTitle className="text-lg">{currentRoomName}</CardTitle>
                    <button
                      onClick={() => setIsEdit(true)}
                      className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => setIsDelete(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Devices & Sensors grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {listDevices?.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Output Devices
                  </h4>
                  <div className="space-y-2">
                    {listDevices.map((item) => (
                      <DeviceCard key={item.deviceId} device={item} roomId={roomId} />
                    ))}
                  </div>
                </div>
              )}

              {listSensor?.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Sensors
                  </h4>
                  <div className="space-y-2">
                    {listSensor.map((item) => (
                      <SensorCard key={item.deviceId} sensorInfo={item} roomId={roomData.roomId} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Add device button */}
            <button
              onClick={() => setIsAddDevice(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-muted-foreground/25 p-4 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Add devices / sensors</span>
            </button>
          </CardContent>
        </Card>
      </motion.div>
    </>
  )
}
