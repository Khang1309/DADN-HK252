import { createBrowserRouter } from 'react-router';

import MainLayout from '../layout/MainLayout';

import Home from '../pages/Home';
import Login from '../pages/Login';
import OutputDevices from '../pages/OutputDevices';
import Sensor from '../pages/Sensor';
import History from '../pages/History';

export const router = createBrowserRouter([
    {
        // 1. THE PROTECTED AREA (Uses SideBar/Header)
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },           // URL: /
            { path: "dashboard", element: <Home /> },    // URL: /dashboard
            { path: "outputdevices", element: <OutputDevices /> }, // URL: /output
            { path: "sensor", element: <Sensor /> },     // URL: /sensor
            { path: "history", element: <History /> },   // URL: /history
        ]
    },
    {
        // 2. THE PUBLIC AREA (No SideBar)
        path: "/login",
        element: <Login />
    },
    {
        // 3. THE "OVAL" (Catch-all for 404 errors)
        path: "*",
        element: <div>404 - Page Not Found</div>
    }
]);