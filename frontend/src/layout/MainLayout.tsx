import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

import s from "./MainLayout.module.css"
import Header from "./Header";
import SideBar from "./SideBar";
import { useUserInfoStore } from "../store/useUserStore";
import { useRoomInfo } from "../store/useRoomInfo";
import { useDevicesStore } from "../store/useDevicesStore";

export default function MainLayout() {
    const [openMenu, setOpenMenu] = useState(true)

    const fetchRoom = useRoomInfo((state) => state.fetchRooms)

    const fetchDevices = useDevicesStore(s => s.fetchDevices)

    const userInfo = useUserInfoStore(s => s.info)

    useEffect(() => {
        fetchRoom()
    }, [fetchRoom])

    useEffect(() => {
        fetchDevices()

        const interval = setInterval(() => {
            console.log('fetchingDevices')
            fetchDevices()
        }
            , 30000
        )

        return () => clearInterval(interval)
    }, [fetchDevices])

    if (!userInfo || !userInfo.token) {
        console.log("mainlay")
        return <Navigate to="/login" replace={true} />
    }

    return <div className={s.container}>
        <SideBar isOpen={openMenu}></SideBar>

        <div className={s.contentArea}>
            <Header onMenuClick={() => setOpenMenu(!openMenu)} />
            <Outlet />
        </div>
    </div>
}