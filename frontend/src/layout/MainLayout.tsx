import { useState } from "react";
import s from "./MainLayout.module.css"
import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";


export default function MainLayout() {
    const [openMenu, setOpenMenu] = useState(true)

    // const UserInfos = await axios.get('/userData')

    return <div className={s.container}>
        <SideBar isOpen={openMenu}></SideBar>

        <div className={s.contentArea}>
            <Header onMenuClick={() => setOpenMenu(!openMenu)} />
            <Outlet />
        </div>
    </div>
}