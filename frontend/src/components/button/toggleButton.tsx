import { useState } from "react";
import { useHeight } from "../../hooks/getWidth";
import { theme } from "../../utils/theme";
import axiosClient from "../../apis/api";
export default function CheckboxToggle({ id, state }: { id: string, state: string }) {
    //replace this with  Zustand store state 
    const [isChecked, setIsChecked] = useState(state);

    const [measureRef, height, width] = useHeight();

    const ballWidth = width / 3;
    const ballHeigth = 0.9 * height;

    function getTransformString() {
        if (isChecked === 'ON') return `translate(2px, -50%)`;
        if (isChecked === 'OFF') return `translate(${width / 2 - ballWidth / 2 - 3}px, -50%)`;

        return `translate(${width - 2 - ballWidth}px , -50%)`;
    }

    const handleOn = async () => {

        console.log('Attempting to turn ON...');

        try {
            const response = await axiosClient.post(`/api/devices/${id}/control`, { status: 'ON' });
            setIsChecked('ON')
            console.log('Successfully turned ON:', response.data);
        } catch (error) {
            console.error('Failed to turn on device:', error);
        }
    }
    const handleOff = async () => {
        console.log('Attempting to turn OFF...');

        try {
            const response = await axiosClient.post(`/api/devices/${id}/control`, { status: 'OFF' });
            setIsChecked('OFF')
            console.log('Successfully turned OFF:', response.data);
        } catch (error) {
            console.error('Failed to turn OFF device:', error);
        }

    }
    const handleAuto = async () => {
        console.log('Attempting to turn AUTO...');

        try {
            const response = await axiosClient.post(`/api/devices/${id}/control`, { status: 'AUTO' });
            setIsChecked('AUTO')
            console.log('Successfully turned AUTO:', response.data);
        } catch (error) {
            console.error('Failed to turn AUTO device:', error);
        }

    }

    const dynamicBallStyle = {
        ...styles.ball,
        height: ballHeigth,
        width: ballWidth,
        transform: getTransformString(),
    };

    const dynamicOn = {
        ...styles.on,
        fontWeight: isChecked == 'ON' ? '700' : 'normal'
    }
    const dynamicOff = {
        ...styles.off,
        fontWeight: isChecked == 'OFF' ? '700' : 'normal'
    }
    const dynamicAuto = {
        ...styles.auto,
        fontWeight: isChecked == 'AUTO' ? '700' : 'normal'
    }

    return (
        <label ref={measureRef} style={styles.toggler}>


            <span style={dynamicBallStyle}></span>

            <div style={dynamicOn} onClick={handleOn}>On</div>
            <div style={dynamicOff} onClick={handleOff}>Off</div>
            <div style={dynamicAuto} onClick={handleAuto}>Auto</div>
        </label>
    );
}

const styles = {
    toggler: {
        display: 'block',
        width: '120px',
        height: '31px',
        background: theme.dashboardTheme.buttonBackgroundColor,
        borderRadius: '30px',
        position: 'relative' as 'relative',
        cursor: 'pointer',

    },
    ball: {
        display: 'inline-block',
        position: 'absolute' as 'absolute',
        top: '50%',
        backgroundColor: theme.dashboardTheme.buttonColor,
        borderRadius: '25px',
        left: '1px',
        zIndex: 0,
        transition: 'transform 0.5s ease-in-out',
    },
    on: {
        position: 'absolute' as 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: '11%',
        fontSize: '12px',
        // Colored to match the border
        zIndex: 10,
        transition: 'all 0.4s ease-in',
    },
    off: {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-70%, -50%)',
        fontSize: '12px',

        zIndex: 10,
        transition: 'all 0.4s ease-in',
    },
    auto: {
        position: 'absolute' as 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: '7px',
        fontSize: '12px',

        zIndex: 10,
        transition: 'all 0.4s ease-in',
    }
};