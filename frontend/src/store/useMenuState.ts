import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface menuType {
    currentTab: "Dashboard" | "Chart" | "History";
    setTab: (nextTab: "Dashboard" | "Chart" | "History") => void
    reloadTab: () => void
}

const useMenuState = create<menuType>()(
    persist(
        (set) => ({

            currentTab: "Dashboard",
            setTab: (nextTab) => set({ currentTab: nextTab }),
            reloadTab: () => set({ currentTab: "Dashboard" })
        }),
        {
            name: "menu-tab-storage",
        }
    )
)


export default useMenuState