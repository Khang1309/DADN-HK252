import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axiosClient from '@/apis/api'
import { cn } from '@/lib/utils'
import { useDevicesStore } from '@/store/useDevicesStore'

interface TripleToggleProps {
  id: string
  state: string
  auto: boolean
}

const STATES = ['ON', 'OFF', 'AUTO'] as const

export default function TripleToggle({ id, state, auto }: TripleToggleProps) {
  const [isChecked, setIsChecked] = useState(state)
  const [isSyncing, setIsSyncing] = useState(false)
  const fetchDevices = useDevicesStore((s) => s.fetchDevices)

  // Sync internal state when prop 'state', 'auto' changes, or when syncing finishes
  useEffect(() => {
    if (!isSyncing) {
      setIsChecked(state)
    }
  }, [state, auto, isSyncing])

  const handleToggle = async (newState: string) => {
    try {
      // Optimistic update
      setIsChecked(newState)

      if (newState === 'AUTO') {
        setIsSyncing(true)
      }
      
      await axiosClient.post(`/api/devices/${id}/control`, { status: newState })
      
      // If switching to AUTO, or even manually toggling while in auto, wait a bit then refresh 
      if (newState === 'AUTO' || auto) {
        setTimeout(async () => {
          await fetchDevices()
          setIsSyncing(false) // Trigger re-sync from props
        }, 500)
      } else {
        await fetchDevices()
        setIsSyncing(false)
      }
      
    } catch (error) {
      console.error(`Failed to set device to ${newState}:`, error)
      // Revert if error
      setIsChecked(state)
      setIsSyncing(false)
    }
  }

  const activeIndex = STATES.indexOf(isChecked as typeof STATES[number])

  return (
    <div className="relative flex h-8 w-[140px] items-center rounded-full bg-muted p-0.5">
      {/* Animated sliding background */}
      <motion.div
        className="absolute h-7 w-[calc(33.33%-2px)] rounded-full bg-primary shadow-sm"
        animate={{ x: `calc(${activeIndex * 100}% + ${activeIndex * 2}px)` }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />

      {STATES.map((s) => (
        <button
          key={s}
          onClick={() => handleToggle(s)}
          className={cn(
            'relative z-10 flex-1 text-xs font-medium transition-colors duration-200 cursor-pointer',
            isChecked === s
              ? 'text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {s === 'ON' ? 'On' : s === 'OFF' ? 'Off' : 'Auto'}
        </button>
      ))}
    </div>
  )
}
