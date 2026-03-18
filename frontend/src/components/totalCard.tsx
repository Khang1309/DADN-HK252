import '../index.css'


export default function TotalCard({ name, total, icon, colorName }: { name: string, total: number, icon: string, colorName: string }) {

    const container = {
        ...styles.container, color: colorName,
    }

    return (<div style={container}>
        <div style={styles.nameAndIcon}>
            <div style={styles.name} >{name}</div>
            <div style={styles.icon}>
                <i className={icon}></i>
            </div>

        </div>
        <div style={styles.value}>
            {total}
        </div>
    </div>)
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        padding: '15px',
        margin: '10px',
        background: '#ffffff',
        borderRadius: '5px',
    },
    nameAndIcon: {
        display: 'flex',
        alignItems: 'center',
        color: 'inherit',
    },
    name: {
        marginRight: '10px',
        fontSize: "1.3em",
    },
    icon: {
        fontSize: '1.5em',
    },
    value: {
        display: 'flex',
        color: 'inherit',
        fontSize: '2em',
        fontWeight: '1000',
    },
    total: {
        flex: 1,
    },

}