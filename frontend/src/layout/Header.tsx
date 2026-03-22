import s from './Header.module.css'
import UserCard from '../components/userCard'
import '../index.css'

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
            <div className={s.rightHeader}>
                <UserCard />
            </div>
        </div>
    )
}
