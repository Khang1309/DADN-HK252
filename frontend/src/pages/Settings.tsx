import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, LockKeyhole, Info } from 'lucide-react'
import toast from 'react-hot-toast'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'

import { Button } from '@/components/ui/button'

import { Input } from "@/components/ui/input"

import { useUserInfoStore } from '@/store/useUserStore'

function Settings() {

    const currentMail = useUserInfoStore(s => s.info?.email)
    const changePassword = useUserInfoStore(s => s.changePassword)
    const isLoading = useUserInfoStore(s => s.isLoading)

    const [curPass, setCurPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    const handleUpdatePassword = async () => {
        try {
            await changePassword(curPass, newPass, confirmPass)
            toast.success('Password updated successfully!')
            setCurPass('')
            setNewPass('')
            setConfirmPass('')
        } catch (error) {
            const err = error as any;
            const errorMessage = err?.response?.data?.message || err?.message || "Failed to update password";
            toast.error(errorMessage)
        }
    }


    return (
        <div className="p-6 space-y-6">
            {/* Page header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-1">Manage your account</p>
            </motion.div>


            <div className='space-y-4'>
                <Card>
                    <CardHeader>

                    </CardHeader>

                    <CardContent>
                        <div className="flex flex-col md:grid md:grid-cols-[200px_1fr] gap-y-6 items-center">


                            <div className="col-start-2 flex gap-2 font-bold">
                                <Mail /> Email
                            </div>


                            <label className="flex gap-2 pr-4 items-center justify-end">
                                <p>
                                    Primary Address
                                </p>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info size={15} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Your email address used for sign in</p>
                                    </TooltipContent>
                                </Tooltip>
                            </label>
                            <div>
                                <Input
                                    value={currentMail} disabled
                                    className='hover:border-blue-500'
                                    id="email" type="email"
                                    placeholder="Your current email" />

                            </div>


                            <div className="col-start-2 flex gap-2 font-bold">
                                <LockKeyhole /> Password
                            </div>

                            <label className=" flex gap-2 pr-4 items-center justify-end" >Current Password

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info size={15} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Enter your current password to verify your identity</p>
                                    </TooltipContent>
                                </Tooltip>

                            </label>
                            <div>
                                <Input className='hover:border-blue-500'
                                    id="current-pass" type="password"
                                    placeholder="Enter your current password"
                                    value={curPass}
                                    onChange={(e) => setCurPass(e.target.value)} />
                            </div>

                            <label className="flex gap-2 pr-4 items-center justify-end">New Password

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info size={15} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Choose a new strong password</p>
                                    </TooltipContent>
                                </Tooltip>

                            </label>
                            <div>
                                <Input
                                    className='hover:border-blue-500'
                                    id="new-pass" type="password"
                                    placeholder="Enter your new password"
                                    value={newPass}
                                    onChange={(e) => setNewPass(e.target.value)} />
                            </div>

                            {/* confirm */}
                            <label className="flex gap-2 pr-4 items-center justify-end">Confirm Password

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info size={15} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Re-enter your password to confirm</p>
                                    </TooltipContent>
                                </Tooltip>

                            </label>
                            <div >
                                <Input className='hover:border-blue-500'
                                    id="confirm-pass" type="password"
                                    placeholder="Confirm your new password"
                                    value={confirmPass}
                                    onChange={(e) => setConfirmPass(e.target.value)}
                                    aria-invalid={confirmPass != newPass}
                                />
                                {confirmPass !== '' && confirmPass !== newPass ? (
                                    <p className="text-red-500 text-sm">Password doesn't match!</p>
                                ) : null}
                            </div>
                            <div className="col-start-2 flex gap-2 font-bold">
                                <Button 
                                    onClick={handleUpdatePassword}
                                    disabled={isLoading || curPass == '' || newPass == '' || confirmPass == '' || newPass != confirmPass}>
                                    {isLoading ? 'Updating...' : 'Update password'}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>

    )
}

export default Settings