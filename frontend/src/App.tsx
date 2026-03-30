
import './App.css'
import { router } from './routes/index'
import { RouterProvider } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Modal from 'react-modal'
import { useModal } from './store/useModal';

const rootElement = document.getElementById('root');
if (rootElement) {
  Modal.setAppElement(rootElement);
}

function App() {
  const { isOpen, toggleOpen } = useModal()
  return (
    <>
      <Modal
        isOpen={false}
        onRequestClose={() => toggleOpen(false)}
        style={{
          overlay: {
            zIndex: 1000,
          },
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
      </Modal>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>

  )

}

export default App
