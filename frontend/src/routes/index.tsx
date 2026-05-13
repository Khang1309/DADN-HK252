import { createBrowserRouter } from 'react-router'

import MainLayout from '../layout/MainLayout'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Chart from '../pages/Chart'
import History from '../pages/History'
import Settings from '@/pages/Settings'
import Support from '@/pages/Support'
import AI from '@/pages/AI'

export const router = createBrowserRouter([
  {
    // Protected area (uses SideBar/Header)
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'dashboard', element: <Home /> },
      { path: 'chart', element: <Chart /> },
      { path: 'history', element: <History /> },
      { path: 'settings', element: <Settings /> },
      { path: 'support', element: <Support /> },
      { path: 'ai', element: <AI /> },
    ],
  },
  {
    // Public area
    path: '/login',
    element: <Login />,
  },
  {
    // 404
    path: '*',
    element: (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
          <p className="text-lg text-muted-foreground mt-2">Page not found</p>
        </div>
      </div>
    ),
  },
])