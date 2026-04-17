import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import React from 'react'
import { IoMdArrowDropleft } from "react-icons/io";


export default function Dropdown({ element1, element2 }: { element1: React.ReactNode, element2: React.ReactNode[] }) {
    return (
        <div className="">
            <Menu>
                {({ open }) => (
                    <>
                        <MenuButton className=" inline-flex items-center gap-2 rounded-md bg-gray-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[focus]:outline data-[focus]:outline-white data-[hover]:bg-gray-700 data-[open]:bg-gray-700">
                            {element1}
                            <span style={{ transform: open ? 'rotate(-90deg)' : 'rotate(0)', transition: 'transform 0.3s ease' }}>
                                <IoMdArrowDropleft />
                            </span>
                        </MenuButton>

                        <MenuItems
                            transition
                            anchor="bottom end"
                            className=" w-52 origin-top-right rounded-xl border border-white/5 bg-gray-800 p-1 text-sm/6 text-white transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-50"
                        >
                            {/* ADDED: index and key */}
                            {
                                element2 ?
                                    (element2.map((element, index) => (
                                        <MenuItem key={index}>
                                            {/* Changed button to a div to prevent HTML nesting errors, 
                                    Headless UI handles the click/focus semantics automatically */}
                                            <div className="group flex w-full cursor-pointer items-center hover:bg-[rgba(0,0,0,0.2)] gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10">
                                                {element}
                                            </div>
                                        </MenuItem>
                                    )))
                                    : (
                                        <div className="p-2 text-gray-500">No sensors available</div>
                                    )
                            }

                            {/* <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
            <TrashIcon className="size-4 fill-white/30" />
            Delete
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">⌘D</kbd>
            </button>
            </MenuItem> */}
                        </MenuItems>
                    </>
                )}
            </Menu>
        </div>
    )
}
