import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUserInfoStore } from '../store/useUserStore'
import Modal from './Modal'

function UserCardOption() {
    const userName = useUserInfoStore(s => s.info?.fullName)
    const logout = useUserInfoStore(s => s.logout)
    const navigate = useNavigate()

    const [isLogout, setIsLogout] = useState(false)

    const handleLogout = async () => {
        await logout()
        await navigate('/login')
    }

    return (
        <>
            <Modal isOpen={isLogout} setIsOpen={setIsLogout} onConfirm={handleLogout} >
                {
                    <div>
                        <div style={{ fontSize: '1.3em', fontWeight: '600' }}>Log out</div>
                        <div>
                            Do you want to log out?
                        </div>
                    </div>
                }
            </Modal>

            <div className='flex flex-col bg-indigo-400 text-black w-[150px]'>
                <div className="text-lg p-4 font-medium border-b-2 border-[#e3e6e8]">Hi {userName}</div>
                <div className='cursor-pointer px-4 py-2 border-b-2 border-[#e3e6e8] hover:bg-[rgba(0,0,0,0.2)]'>Settings</div>
                <div className='cursor-pointer px-4 py-2 text-red-500 hover:bg-[rgba(0,0,0,0.2)]' onClick={() => setIsLogout(true)}>Log out</div>
            </div>
        </>
    )
}

export default UserCardOption