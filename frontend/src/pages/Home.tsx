import { useState } from 'react'
import { motion } from 'framer-motion'
import { Radio, Signal, Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import RealButton from '@/components/RealButton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import StatCard from '@/components/StatCard'
import RoomCard from '@/components/RoomCard'
import { useRoomInfo } from '@/store/useRoomInfo'
import { useDevicesStore } from '@/store/useDevicesStore'

export default function Home() {
  const rooms = useRoomInfo((state) => state.rooms)
  const fetchRooms = useRoomInfo((state) => state.fetchRooms)
  const handleAddRoom = useRoomInfo((state) => state.addRoom)

  const listOfOutput = useDevicesStore((state) => state.listOfOutput)
  const listOfSensor = useDevicesStore((state) => state.listOfSensor)

  const numberOfDevices = Object.values(listOfOutput).reduce((total, list) => total + list.length, 0)
  const numberOfSensors = Object.values(listOfSensor).reduce((total, list) => total + list.length, 0)

  const [isAddRoom, setIsAddRoom] = useState(false)
  const [newRoomName, setNewRoomName] = useState('')

  const submitAddRoom = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRoomName.trim()) {
      toast.error('Room name is required!')
      return
    }
    const success = await handleAddRoom(newRoomName)
    if (success) {
      setIsAddRoom(false)
      setNewRoomName('')
      toast.success('Room added successfully!')
      fetchRooms()
    } else {
      toast.error('Failed to add room!')
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Smart home system overview</p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          name="Output Devices"
          total={numberOfDevices}
          icon={Radio}
          color="#6366f1"
        />
        <StatCard
          name="Sensors"
          total={numberOfSensors}
          icon={Signal}
          color="#10b981"
        />
      </div>

      {/* Rooms section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground"
          >
            Displaying {rooms.length} room{rooms.length !== 1 ? 's' : ''}
          </motion.p>
          <RealButton onClick={() => setIsAddRoom(true)} className="gap-2 active:shadow-inner">
            <Plus className="h-4 w-4" />
            Add Room
          </RealButton>
        </div>

        {/* Add room dialog */}
        <Dialog open={isAddRoom} onOpenChange={setIsAddRoom}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
            </DialogHeader>
            <form onSubmit={submitAddRoom} className="">
              <Input
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                placeholder="Enter room name"
                autoFocus
                aria-invalid={!newRoomName}
              />
              {!newRoomName ? (
                <p className="text-red-500 text-sm px-2">Enter room's name</p>
              ) : null}
              <div className="flex gap-2 justify-end mt-2">
                <Button type="button" variant="outline" onClick={() => setIsAddRoom(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Room</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Room cards */}
        <div className="space-y-4">
          {rooms.map((item, index) => (
            <RoomCard key={item.roomId} roomData={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}