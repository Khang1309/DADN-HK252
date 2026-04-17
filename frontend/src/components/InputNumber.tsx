import { useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { theme } from "../utils/theme";
function InputNumber({ initValue, isEdit, setValue }: { initValue: number, isEdit: boolean, setValue: (val: number) => void }) {


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value))
    }

    return (
        <div style={styles.container}>
            <input style={styles.input} type="number" value={initValue} min={0} onChange={handleChange} readOnly={!isEdit} />
            {isEdit &&

                <div style={styles.changeValue}>
                    <CiCirclePlus style={{ cursor: 'pointer', background: 'rgba(255,255,255, 0.2)', borderRadius: '50%' }} onClick={() => setValue(initValue + 1)} />
                    <CiCircleMinus style={{ cursor: 'pointer', background: 'rgba(255,255,255, 0.2)', borderRadius: '50%' }} onClick={() => setValue(initValue - 1)} />
                </div>
            }
        </div>
    )
}

const styles = {
    container: {
        margin: '5px',
        background: theme.dashboardTheme.inputNumberBg,
        display: 'flex',
        width: '55px',
        height: 'fit-content',
        borderRadius: '10px',
        overflow: 'hidden',
        border: '1px solid #ccc',
    },

    input: {
        all: 'unset' as const,
        width: '100%',
        margin: '5px',
        display: 'flex',
        justifyContent: 'center',
    },

    changeValue: {
        display: 'flex',
        flexDirection: 'column' as const,
        background: 'rgba(0,0,0,0.2)',
        borderLeft: '1px solid #ccc',
        padding: '3px',
    },

}

export default InputNumber