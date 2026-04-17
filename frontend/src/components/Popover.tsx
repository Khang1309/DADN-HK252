import React from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

function Popovers({ element1, element2 }: { element1: React.ReactNode, element2: React.ReactNode }) {
  return (
    <Popover className="relative">
      <PopoverButton className="cursor-pointer block text-sm/6 font-semibold text-white/50 focus:outline-none data-active:text-white data-hover:text-white border-none outline-none">
        {element1}
      </PopoverButton>
      <PopoverPanel className="absolute right-0">
        {element2}
      </PopoverPanel>

    </Popover>
  )
}

export default Popovers