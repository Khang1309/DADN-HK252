import { useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface AddDeviceFormProps {
  roomId: string
  onAddOutput: (roomId: string, deviceName: string) => Promise<void>
  onAddSensor: (roomId: string, deviceName: string, thresMin: number, thresMax: number) => Promise<void>
  onClose: () => void
}

export default function AddDeviceForm({ roomId, onAddOutput, onAddSensor, onClose }: AddDeviceFormProps) {
  const [deviceType, setDeviceType] = useState<'OUTPUT' | 'SENSOR'>('OUTPUT')
  const [deviceName, setDeviceName] = useState('')
  const [thresholdMin, setThresholdMin] = useState(0)
  const [thresholdMax, setThresholdMax] = useState(100)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!deviceName.trim()) {
      toast.error('Device name is required!')
      return
    }

    if (deviceType === 'SENSOR' && thresholdMin >= thresholdMax) {
      toast.error('Threshold min must be less than threshold max!')
      return
    }

    try {
      setIsLoading(true)
      if (deviceType === 'OUTPUT') {
        await onAddOutput(roomId, deviceName)
        toast.success('Output device added successfully!')
      } else {
        await onAddSensor(roomId, deviceName, thresholdMin, thresholdMax)
        toast.success('Sensor added successfully!')
      }
      onClose()
    } catch {
      toast.error('Failed to add device!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="">
      <div>
        <h3 className="text-lg font-semibold">Add New Device</h3>
        <p className="text-sm text-muted-foreground">Choose the type and configure your device</p>
      </div>

      {/* Type toggle */}
      <div className="grid grid-cols-2 mt-4">
        <Button
          type="button"
          variant={deviceType === 'OUTPUT' ? 'default' : 'outline'}
          onClick={() => setDeviceType('OUTPUT')}
          className="w-full border-b-0 rounded-none rounded-t-md -top-1"
        >
          Output Device
        </Button>
        <Button
          type="button"
          variant={deviceType === 'SENSOR' ? 'default' : 'outline'}
          onClick={() => setDeviceType('SENSOR')}
          className="w-full border-b-0 rounded-none rounded-t-md -top-1"
        >
          Sensor
        </Button>
      </div>

      <div className=' bg-white p-4 border-solid flex flex-col gap-4 border-1 border-[oklch(0.87 0.02 252.99)]'>
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="deviceName">Device Name</Label>
          <Input
            id="deviceName"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            placeholder="Enter device name"
            disabled={isLoading}
            className='hover:border-blue-500'
          />
        </div>

        {/* Sensor thresholds */}
        {deviceType === 'SENSOR' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="thresholdMin">Threshold Min</Label>
              <Input
                id="thresholdMin"
                type="number"
                value={thresholdMin}
                onChange={(e) => setThresholdMin(Number(e.target.value))}
                className='hover:border-blue-500'
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="thresholdMax">Threshold Max</Label>
              <Input
                id="thresholdMax"
                type="number"
                value={thresholdMax}
                onChange={(e) => setThresholdMax(Number(e.target.value))}
                disabled={isLoading}
                className='hover:border-blue-500'
              />
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 justify-end mt-4">
        <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Device'}
        </Button>
      </div>
    </form>
  )
}
