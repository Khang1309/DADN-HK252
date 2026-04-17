import React from 'react'
import ReactDom from 'react-dom'
import { theme } from '../utils/theme'

export default function Modal({ children, isOpen, setIsOpen, onConfirm }:
    {
        children: React.ReactNode, isOpen: boolean, setIsOpen: (bool: boolean) => void, roomId?: string,
        deviceId?: string, onConfirm?: () => Promise<void>
    }) {
    if (!isOpen) return null

    const portalId = document.getElementById("portal")
    if (!portalId) return <div>Not found</div>

    const handleCancel = () => {
        setIsOpen(false)
    }

    const handleOkay = () => {
        onConfirm ? onConfirm() :
            setIsOpen(false)
    }

    const saveButton = {
        ...styles.buttonStyle,
        background: theme.modalTheme.backgroundBtnSave,
    }
    const cancelButton = {
        ...styles.buttonStyle,
        background: theme.modalTheme.backgroundBtnCancel,
    }

    return ReactDom.createPortal(
        <>
            <div style={styles.overlay}></div>
            <div style={styles.container}>

                <div style={styles.modalStyle}>
                    {children}
                </div>
                {onConfirm && (
                    <div style={styles.button}>
                        <button style={cancelButton} onClick={handleCancel}>Cancel</button>
                        <button style={saveButton} onClick={handleOkay}>Okay</button>
                    </div>
                )}
            </div>
        </>,
        portalId
    )
}

const styles = {

    container: {
        position: 'fixed' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1000',
        background: theme.modalTheme.background,
        padding: '20px',
        color: 'black',
        borderRadius: '10px',
    },
    overlay: {
        position: 'fixed' as const,
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        zIndex: '1000',
        background: 'rgba(0,0,0,0.7)'
    },
    modalStyle: {
        marginBottom: '20px', // Adds space between text and buttons
    },
    button: {
        display: 'flex',
        gap: '10px',
        justifyContent: 'flex-end', // Use flex-end instead of right
    },

    buttonStyle: {
        padding: '5px 10px',
        border: 'none',
        borderRadius: '6px',
    }
}
