
export default function OveralTypeCard({ iconName, value, type, place, color }: { iconName: string, value: number, type: string, place: string, color: string }) {

    const colorThemeContainer = {
        ...styles.container, background: color
    }

    const nameType = type == "Nhiệt độ" ? <p><sup>o</sup>C</p> : <p>%</p>

    return <div style={colorThemeContainer}>
        <div style={styles.icon}>

            <i className={iconName}>   </i>
        </div>
        <div style={styles.valueAndType}>
            <div style={styles.value}>
                {value} {nameType}
            </div>
            <div>
                {type} - {place}
            </div>
        </div>
    </div>
}

const styles = {
    container: {
        display: 'flex',
        padding: '5px',
        borderRadius: '10px',
        margin: '10px',
    },
    icon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15px',
        background: 'rgba(0,0,0,0.15)',
        fontSize: '1.5em',
        borderRadius: '10px',
        margin: '5px',

    }, valueAndType: {
        margin: '5px',
    },
    value: {
        fontSize: '2em',
        display: 'flex',
        alignItems: 'center',
        fontWeight: '800',
    }
}