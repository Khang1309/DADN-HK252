import s from './Header.module.css'
import UserCard from '../components/card/userCard'
import '../index.css'
import Popovers from '../components/Popover'
import UserCardOption from '../components/UserCardOption'

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
    const toggleSideBar = onMenuClick
    return (
        <div className={s.container}>
            <div className={s.leftHeader}>
                <i className="fas fa-bars" onClick={toggleSideBar} />
            </div>
            <div className={s.midHeader}>
                <div>Smart Home Controller</div>
                <div>Hệ thống quản lý nhà thông minh</div>
            </div>
            <div className='flex flex-1 justify-end items-end'>

                <Popovers
                    element1={<div className={s.rightHeader}>
                        <UserCard />
                    </div>}
                    element2={
                        <UserCardOption />
                    }


                />
            </div>


        </div >
    )
}
