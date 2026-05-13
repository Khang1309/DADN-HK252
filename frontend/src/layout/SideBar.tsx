import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, BarChart3, History, MessageCircleQuestionMark, Wrench, Bot } from 'lucide-react'
import { cn } from '@/lib/utils'

import logo from '../assets/images/logo.svg'


const navItemsMenu = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/chart', icon: BarChart3, label: 'Chart' },
  { to: '/history', icon: History, label: 'History' },
  { to: '/ai', icon: Bot, label: 'AI Control' },
]

const navItemsAccount = [
  { to: '/settings', icon: Wrench, label: 'Settings' },
  { to: '/support', icon: MessageCircleQuestionMark, label: 'Support' },

]



interface SideBarProps {
  isOpen: boolean
}

export default function SideBar({ isOpen }: SideBarProps) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 240 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative flex flex-col overflow-hidden bg-sidebar text-sidebar-foreground min-h-screen border-r border-sidebar-border"
    >
      <div className="flex flex-col h-full" style={{ minWidth: 240 }}>
        {/* Logo / Brand */}
        <div className="flex h-16 items-center justify-center gap-2 border-b border-sidebar-border px-4">
          <img src={logo} alt="" />

        </div>

        {/* Navigation */}
        <nav className="space-y-1 p-3">
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            Menu
          </p>
          {navItemsMenu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn('h-4 w-4 shrink-0', isActive && 'drop-shadow-sm')} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 h-8 w-1 rounded-r-full bg-sidebar-primary-foreground/30"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <nav className="space-y-1 p-3">
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            Account
          </p>
          {navItemsAccount.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn('h-4 w-4 shrink-0', isActive && 'drop-shadow-sm')} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 h-8 w-1 rounded-r-full bg-sidebar-primary-foreground/30"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>


        {/* Footer */}
        <div className="flex-1 flex items-end justify-center p-4">
          <p className="text-xs text-sidebar-foreground/40 text-center">
            Smart Home v1.0
          </p>
        </div>
      </div>
    </motion.aside>
  )
}