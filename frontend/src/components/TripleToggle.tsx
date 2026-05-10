import { useState } from 'react'
import { motion } from 'framer-motion'
import axiosClient from '@/apis/api'
import { cn } from '@/lib/utils'

interface TripleToggleProps {
  id: string
  state: string
}

const STATES = ['ON', 'OFF', 'AUTO'] as const

export default function TripleToggle({ id, state }: TripleToggleProps) {
  const [isChecked, setIsChecked] = useState(state)

  const handleToggle = async (newState: string) => {
    try {
      await axiosClient.post(`/api/devices/${id}/control`, { status: newState })
      console.log(newState)
      setIsChecked(newState)
    } catch (error) {
      console.error(`Failed to set device to ${newState}:`, error)
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
