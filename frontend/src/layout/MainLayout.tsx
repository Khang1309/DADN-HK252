import { useState, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import Header from './Header'
import SideBar from './SideBar'
import { useUserInfoStore } from '@/store/useUserStore'
import { useRoomInfo } from '@/store/useRoomInfo'
import { useDevicesStore } from '@/store/useDevicesStore'

export default function MainLayout() {
  const [openMenu, setOpenMenu] = useState(true)

  const fetchRoom = useRoomInfo((state) => state.fetchRooms)
  const fetchDevices = useDevicesStore((s) => s.fetchDevices)
  const userInfo = useUserInfoStore((s) => s.info)

  useEffect(() => {
    fetchRoom()
  }, [fetchRoom])

  useEffect(() => {
    fetchDevices()

    const interval = setInterval(() => {
      fetchDevices()
    }, 30000)

    return () => clearInterval(interval)
  }, [fetchDevices])

  if (!userInfo || !userInfo.token) {
    return <Navigate to="/login" replace={true} />
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SideBar isOpen={openMenu} />

      <div className="flex flex-1 flex-col overflow-y-auto min-w-0 transition-all duration-300">
        <Header onMenuClick={() => setOpenMenu(!openMenu)} />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}