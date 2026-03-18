import { useState } from "react";
import s from "./MainLayout.module.css"
import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import useMenuState from "../store/useMenuState";


const UserInfo = {
    name: "Khang",
    role: "Admin",
    profile: "K",
}

export default function MainLayout() {
    const [openMenu, setOpenMenu] = useState(true)

    return <div className={s.container}>
        <SideBar isOpen={openMenu}></SideBar>
        <div className={s.contentArea}>
            <Header UserInfo={UserInfo} onMenuClick={() => setOpenMenu(!openMenu)} />
            <Outlet />
        </div>
    </div>
}