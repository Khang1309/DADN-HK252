import { useState } from 'react'
import { motion } from 'framer-motion'
import { Pencil, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
import TripleToggle from '@/components/TripleToggle'
import { type DeviceType } from '@/schema/device'
import { useDevicesStore } from '@/store/useDevicesStore'

interface DeviceCardProps {
  device: DeviceType
  roomId: string
}

export default function DeviceCard({ device, roomId }: DeviceCardProps) {
  const editName = useDevicesStore((s) => s.updateNameOutput)
  const deleteDevice = useDevicesStore((s) => s.deleteOutput)

  const [deviceNameState, setDeviceName] = useState(device.deviceName)
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [editValue, setEditValue] = useState(device.deviceName)

  const handleDelete = async () => {
    await deleteDevice(device.deviceId, roomId)
    setIsDelete(false)
    toast.success('Device deleted successfully!')
  }

  const handleSubmitNameChange = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await editName(device.deviceId, editValue, roomId)
      setDeviceName(editValue)
      toast.success('Name updated successfully!')
      setIsEdit(false)
    } catch {
      toast.error('Failed to update name!')
      setIsEdit(false)
    }
  }

  return (
    <>
      {/* Delete confirmation dialog */}
      <Dialog open={isDelete} onOpenChange={setIsDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Device</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{device.deviceName}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDelete(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow py-0 gap-0">
          {/* Header */}
          <div className="flex items-center justify-between bg-muted/50 px-4 py-3">
            <div className="flex-1 min-w-0">
              {isEdit ? (
                <form onSubmit={handleSubmitNameChange} className="flex items-center gap-2">
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="h-7 text-sm"
                    autoFocus
                  />
                  <Button type="submit" size="sm" className="h-7 px-2 text-xs">
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => { setIsEdit(false); setEditValue(deviceNameState) }}
                  >
                    Cancel
                  </Button>
                </form>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm truncate">{deviceNameState}</span>
                  <button
                    onClick={() => setIsEdit(true)}
                    className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 ml-2">
              <Badge variant={device.state === 'CONNECTED' ? 'success' : 'destructive'}>
                {device.state}
              </Badge>
              <button
                onClick={() => setIsDelete(true)}
                className="text-destructive hover:text-destructive/80 transition-colors cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
              <span className="text-sm text-muted-foreground">Current Value</span>
              <span className="text-sm font-bold">{device.currentValue ?? 0}</span>
            </div>
            <div className="flex justify-center">
              <TripleToggle
                id={device.deviceId}
                state={device.onOffState ?? 'OFF'}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  )
}
