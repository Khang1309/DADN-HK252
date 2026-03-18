import { Route, BrowserRouter, createBrowserRouter } from 'react-router'
import { HomeRoute } from './HomeRoute'
import { LoginRoute } from './LoginRoute'
import { OutputDevicesRoute } from './OutputDevicesRoute'
import { SensorRoute } from './SensorRoute'
import { HistoryRoute } from './HistoryRoute'

import MainLayout from '../layout/MainLayout'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: HomeRoute
    },
    {
        path: "/dashboard",
        element: <MainLayout />,
        children: HomeRoute
    },
    {
        path: "/login",
        children: LoginRoute,
    },
    {
        path: "/outputdevices",
        element: <MainLayout />,
        children: OutputDevicesRoute,
    },
    {
        path: "/sensor",
        element: <MainLayout />,
        children: OutputDevicesRoute,
    },
    {
        path: "/history",
        element: <MainLayout />,
        children: OutputDevicesRoute,
    },

])