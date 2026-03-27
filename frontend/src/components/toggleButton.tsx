import { useState } from "react";
import { useHeight } from "../hooks/getWidth";

export default function CheckboxToggle() {
    //replace this with  Zustand store state 
    const [isChecked, setIsChecked] = useState('on');

    const [measureRef, height, width] = useHeight();

    const ballWidth = width / 3;
    const ballHeigth = 0.9 * height;

    function getTransformString() {
        if (isChecked === 'on') return `translate(2px, -50%)`;
        if (isChecked === 'off') return `translate(${width / 2 - ballWidth / 2 - 3}px, -50%)`;

        return `translate(${width - 2 - ballWidth}px , -50%)`;
    }

    const dynamicBallStyle = {
        ...styles.ball,
        height: ballHeigth,
        width: ballWidth,
        transform: getTransformString(),
    };

    const dynamicOn = {
        ...styles.on,
        fontWeight: isChecked == 'on' ? '700' : 'normal'
    }
    const dynamicOff = {
        ...styles.off,
        fontWeight: isChecked == 'off' ? '700' : 'normal'
    }
    const dynamicAuto = {
        ...styles.auto,
        fontWeight: isChecked == 'auto' ? '700' : 'normal'
    }

    return (
        <label ref={measureRef} style={styles.toggler}>
            <div></div>
            <input
                type="checkbox"
                style={{ display: 'none' }}
            />

            <span style={dynamicBallStyle}></span>

            <div style={dynamicOn} onClick={() => setIsChecked('on')}>On</div>
            <div style={dynamicOff} onClick={() => setIsChecked('off')}>Off</div>
            <div style={dynamicAuto} onClick={() => setIsChecked('auto')}>Auto</div>
        </label>
    );
}

const styles = {
    toggler: {
        display: 'block',
        width: '120px',
        height: '31px',
        background: 'rgba(0,0,0, 0.2)',
        borderRadius: '30px',
        position: 'relative' as 'relative',
        cursor: 'pointer',
    },
    ball: {
        display: 'inline-block',
        position: 'absolute' as 'absolute',
        top: '50%',
        backgroundColor: '#bcbcbc',
        borderRadius: '25px',
        left: '1px',
        zIndex: 0,
        transition: 'transform 0.5s ease-in-out',
    },
    on: {
        position: 'absolute' as 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: '10px',
        fontSize: '12px',
        color: '#000000', // Colored to match the border
        zIndex: 10,
        transition: 'all 0.4s ease-in',
    },
    off: {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-70%, -50%)',
        fontSize: '12px',
        color: '#000000',
        zIndex: 10,
        transition: 'all 0.4s ease-in',
    },
    auto: {
        position: 'absolute' as 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: '7px',
        fontSize: '12px',
        color: '#000000',
        zIndex: 10,
        transition: 'all 0.4s ease-in',
    }
};