import { useState } from 'react'
import { motion } from 'framer-motion'
import { Pencil, Trash2, Minus, Plus } from 'lucide-react'
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
import { type SensorType } from '@/schema/sensor'
import { useDevicesStore } from '@/store/useDevicesStore'

interface SensorCardProps {
  sensorInfo: SensorType
  roomId: string
}

export default function SensorCard({ sensorInfo, roomId }: SensorCardProps) {
  const sensor = useDevicesStore((s) =>
    s.listOfSensor[roomId]?.find((sens) => sens.deviceId === sensorInfo.deviceId)
  )
  const editName = useDevicesStore((s) => s.updateNameSensor)
  const deleteSensor = useDevicesStore((s) => s.deleteSensor)
  const changeSensorValue = useDevicesStore((s) => s.updateValueSensor)

  const [isEdit, setIsEdit] = useState(false)
  const [editValue, setEditValue] = useState(sensorInfo.deviceName)
  const [isDelete, setIsDelete] = useState(false)
  const [isEditValue, setIsEditValue] = useState(false)
  const [valueMin, setValueMin] = useState(sensorInfo.thresholdMin || 0)
  const [valueMax, setValueMax] = useState(sensorInfo.thresholdMax || 100)

  const latestData = sensor && sensor.data.length > 0 ? sensor.data[0] : null

  const handleDelete = async () => {
    await deleteSensor(sensorInfo.deviceId, roomId)
    setIsDelete(false)
    toast.success('Sensor deleted successfully!')
  }

  const handleSubmitNameChange = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await editName(roomId, editValue, sensorInfo.deviceId)
      toast.success('Name updated successfully!')
      setIsEdit(false)
    } catch {
      toast.error('Failed to update name!')
      setIsEdit(false)
    }
  }

  const handleSaveThresholds = async () => {
    try {
      await changeSensorValue(roomId, sensorInfo.deviceId, valueMin, valueMax)
      toast.success('Thresholds updated successfully!')
      setIsEditValue(false)
    } catch {
      toast.error('Failed to update thresholds!')
    }
  }

  return (
    <>
      <Dialog open={isDelete} onOpenChange={setIsDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Sensor</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{sensorInfo.deviceName}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDelete(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
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
                  <Button type="submit" size="sm" className="h-7 px-2 text-xs">Save</Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => { setIsEdit(false); setEditValue(sensorInfo.deviceName) }}
                  >
                    Cancel
                  </Button>
                </form>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm truncate">{sensorInfo.deviceName}</span>
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
              <Badge variant={sensorInfo.state === 'CONNECTED' ? 'success' : 'destructive'}>
                {sensorInfo.state}
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
              <span className="text-sm font-bold">
                {latestData?.value !== undefined
                  ? latestData.value
                  : 'Loading...'}
              </span>
            </div>

            {/* Thresholds */}
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">Min</span>
                <div className="flex items-center gap-0.5">
                  {isEditValue && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setValueMin(valueMin - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                  )}
                  <Input
                    type="number"
                    value={valueMin}
                    onChange={(e) => setValueMin(Number(e.target.value))}
                    readOnly={!isEditValue}
                    className="h-7 w-14 text-center text-xs"
                  />
                  {isEditValue && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setValueMin(valueMin + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>

              <span className="text-muted-foreground">—</span>

              <div className="flex items-center gap-1">
                <div className="flex items-center gap-0.5">
                  {isEditValue && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setValueMax(valueMax - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                  )}
                  <Input
                    type="number"
                    value={valueMax}
                    onChange={(e) => setValueMax(Number(e.target.value))}
                    readOnly={!isEditValue}
                    className="h-7 w-14 text-center text-xs"
                  />
                  {isEditValue && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setValueMax(valueMax + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">Max</span>
              </div>

              {isEditValue ? (
                <div className="flex gap-1 ml-2">
                  <Button size="sm" className="h-7 px-2 text-xs" onClick={handleSaveThresholds}>
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => {
                      setValueMin(sensorInfo.thresholdMin || 0)
                      setValueMax(sensorInfo.thresholdMax || 100)
                      setIsEditValue(false)
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditValue(true)}
                  className="text-muted-foreground hover:text-foreground transition-colors ml-2 cursor-pointer"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  )
}
