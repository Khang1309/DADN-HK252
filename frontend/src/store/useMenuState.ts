import { create } from 'zustand'

interface menuType {
    currentTab: "Dashboard" | "OutputDevices" | "Sensor" | "History";
    setTab: (nextTab: "Dashboard" | "OutputDevices" | "Sensor" | "History") => void
    reloadTab: () => void
}

const useMenuState = create<menuType>((set) => ({
    currentTab: "Dashboard",
    setTab: (nextTab) => set({ currentTab: nextTab }),
    reloadTab: () => set({ currentTab: "Dashboard" })
}))


export default useMenuState