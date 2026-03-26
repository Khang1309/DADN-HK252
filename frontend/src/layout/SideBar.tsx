import s from './SideBar.module.css'
import MenuCard from '../components/menuCard'
import useMenuState from "../store/useMenuState";

type menuType = "Dashboard" | "OutputDevices" | "Sensor" | "History";

interface CardData {
    index: number,
    icon: string,
    name: menuType
}

const menuCardList: CardData[] = [
    { index: 1, icon: "fa-solid fa-house", name: "Dashboard" },
    { index: 2, icon: "fa-solid fa-hard-drive", name: "OutputDevices" },
    { index: 3, icon: "fa-solid fa-microchip", name: "Sensor" },
    { index: 4, icon: "fa-solid fa-history", name: "History" },
];


export default function SideBar({ isOpen }: { isOpen: boolean }) {

    const val = {
        full: '20%',
        part: '0%',
    }

    const SideBarStyle = (open: boolean) => {
        if (open) {
            return val.full
        }
        return val.part
    }

    return (

        <div className={s.container} style={{ width: SideBarStyle(isOpen), transition: 'width 0.3s ease', }}>
            <div style={styles.menu}>Menu</div>
            {menuCardList.map((item) => (
                <MenuCard
                    key={item.index}
                    name={item.name}
                    icon={item.icon}
                />
            ))

            }
        </div>
    )
}

const styles = {
    menu: {
        height: '15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#527bf4',
        margin: '0 auto',
        width: '100%',
        fontWeight: 'bold',
        fontSize: '1.5em',
    }
}