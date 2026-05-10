import { Menu, LogOut, Settings } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useUserInfoStore } from '@/store/useUserStore'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { info } = useUserInfoStore()
  const logout = useUserInfoStore((s) => s.logout)
  const navigate = useNavigate()
  const [isLogout, setIsLogout] = useState(false)

  const handleLogout = async () => {
    await logout()
    await navigate('/login')
  }

  const handleSettings = async () => {
    await navigate('/settings')
  }

  const initials = info?.fullName
    ? info.fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
    : '?'

  return (
    <>
      <Dialog open={isLogout} onOpenChange={setIsLogout}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log out</DialogTitle>
            <DialogDescription>Are you sure you want to log out?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLogout(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleLogout}>Log out</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-md py-6">
        {/* Left */}
        <div className="flex h-16 items-center gap-4">
          <Button variant="ghost" className="h-16 w-16 p-0" onClick={onMenuClick}>
            <Menu size={40} />
          </Button>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold tracking-tight">Smart Home Controller</h1>
            <p className="text-xs text-muted-foreground">IoT Device Management System</p>
          </div>
        </div>

        {/* Right */}
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex w-30 h-16 items-center gap-2 px-4 py-4">
              <span className="hidden sm:inline text-sm font-medium">
                {info?.fullName}
              </span>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>
              <p className="text-sm font-medium">{info?.fullName}</p>
              <p className="text-xs text-muted-foreground">{info?.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSettings}>
              <Settings className="mr-2 h-4 w-4"

              />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setIsLogout(true)}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </>
  )
}
