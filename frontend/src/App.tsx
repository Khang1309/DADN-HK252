import { useState } from 'react'
import './App.css'
import { router } from './routes/index'
import { RouterProvider } from "react-router-dom";



function App() {
  return <RouterProvider router={router} />;

}

export default App
