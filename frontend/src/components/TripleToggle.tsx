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
  const fetchDevices = useDevicesStore((s) => s.fetchDevices)

  // Sync internal state when prop 'state' or 'auto' changes (e.g., from polling or control)
  useEffect(() => {
    setIsChecked(state)
  }, [state, auto])

  const handleToggle = async (newState: string) => {
    try {
      // Optimistic update
      setIsChecked(newState)
      
      await axiosClient.post(`/api/devices/${id}/control`, { status: newState })
      
      // If switching to AUTO, or even manually toggling, wait a bit then refresh 
      // to get the actual state from backend (especially important for AUTO mode)
      if (newState === 'AUTO' || auto) {
        setTimeout(async () => {
          await fetchDevices()
        }, 500)
      } else {
        await fetchDevices()
      }
      
    } catch (error) {
      console.error(`Failed to set device to ${newState}:`, error)
      // Revert if error
      setIsChecked(state)
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
