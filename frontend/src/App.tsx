
import './App.css'
import { router } from './routes/index'
import { RouterProvider } from "react-router-dom";
import { Toaster } from 'react-hot-toast';


function App() {

  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />;
    </>

  )

}

export default App
