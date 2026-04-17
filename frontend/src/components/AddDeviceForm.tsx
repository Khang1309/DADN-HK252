import { useState } from "react";
import toast from "react-hot-toast";
import { theme } from "../utils/theme";

interface AddDeviceFormProps {
    roomId: string;
    onAddOutput: (roomId: string, deviceName: string) => Promise<void>;
    onAddSensor: (roomId: string, deviceName: string, thresMin: number, thresMax: number) => Promise<void>;
    onClose: () => void;
}

export default function AddDeviceForm({ roomId, onAddOutput, onAddSensor, onClose }: AddDeviceFormProps) {
    const [deviceType, setDeviceType] = useState<"OUTPUT" | "SENSOR">("OUTPUT");
    const [deviceName, setDeviceName] = useState("");
    const [thresholdMin, setThresholdMin] = useState(0);
    const [thresholdMax, setThresholdMax] = useState(100);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!deviceName.trim()) {
            toast.error("Device name is required!");
            return;
        }

        if (deviceType === "SENSOR" && thresholdMin >= thresholdMax) {
            toast.error("Threshold min must be less than threshold max!");
            return;
        }

        try {
            setIsLoading(true);
            if (deviceType === "OUTPUT") {
                await onAddOutput(roomId, deviceName);
                toast.success("Output device added successfully!");
            } else {
                await onAddSensor(roomId, deviceName, thresholdMin, thresholdMax);
                toast.success("Sensor added successfully!");
            }
            onClose();
        } catch (error) {
            console.error("Error adding device:", error);
            toast.error("Failed to add device!");
        } finally {
            setIsLoading(false);
        }
    };

    const submitButton = {
        ...styles.button,
        color: "white",
        background: theme.dashboardTheme.buttonColor,
    };

    const cancelButton = {
        ...styles.button,
        background: "rgba(0,0,0,0.2)",
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.title}>Add New Device/Sensor</div>

            {/* Toggle Button */}
            <div style={styles.toggleContainer}>
                <button
                    type="button"
                    style={{
                        ...styles.toggleButton,
                        background: deviceType === "OUTPUT" ? theme.dashboardTheme.buttonColor : "rgba(0,0,0,0.2)",
                        color: deviceType === "OUTPUT" ? "white" : "inherit",
                    }}
                    onClick={() => setDeviceType("OUTPUT")}
                >
                    Output Device
                </button>
                <button
                    type="button"
                    style={{
                        ...styles.toggleButton,
                        background: deviceType === "SENSOR" ? theme.dashboardTheme.buttonColor : "rgba(0,0,0,0.2)",
                        color: deviceType === "SENSOR" ? "white" : "inherit",
                    }}
                    onClick={() => setDeviceType("SENSOR")}
                >
                    Sensor
                </button>
            </div>

            {/* Device Name Input */}
            <div style={styles.fieldGroup}>
                <label style={styles.label}>Device Name</label>
                <input
                    type="text"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                    placeholder="Enter device name"
                    style={styles.input}
                    disabled={isLoading}
                />
            </div>

            {/* Sensor-specific fields */}
            {deviceType === "SENSOR" && (
                <>
                    <div style={styles.thresholdContainer}>
                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Threshold Min</label>
                            <input
                                type="number"
                                value={thresholdMin}
                                onChange={(e) => setThresholdMin(Number(e.target.value))}
                                placeholder="Min value"
                                style={styles.input}
                                disabled={isLoading}
                            />
                        </div>
                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Threshold Max</label>
                            <input
                                type="number"
                                value={thresholdMax}
                                onChange={(e) => setThresholdMax(Number(e.target.value))}
                                placeholder="Max value"
                                style={styles.input}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </>
            )}

            {/* Action Buttons */}
            <div style={styles.buttonContainer}>
                <button style={submitButton} type="submit" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add"}
                </button>
                <button style={cancelButton} type="button" onClick={onClose} disabled={isLoading}>
                    Cancel
                </button>
            </div>
        </form>
    );
}

const styles = {
    form: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "15px",
        padding: "20px",
    },
    title: {
        fontSize: "1.3em",
        fontWeight: "600",
        marginBottom: "10px",
    },
    toggleContainer: {
        display: "flex",
        gap: "10px",
        marginBottom: "10px",
    },
    toggleButton: {
        flex: 1,
        padding: "10px 15px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "1em",
        fontWeight: "500",
        transition: "all 0.3s ease",
    },
    fieldGroup: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "5px",
    },
    label: {
        fontSize: "0.9em",
        fontWeight: "500",
    },
    input: {
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "1em",
        fontFamily: "inherit",
    },
    thresholdContainer: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "10px",
    },
    buttonContainer: {
        display: "flex",
        gap: "10px",
        marginTop: "10px",
    },
    button: {
        all: "unset" as const,
        padding: "10px 15px",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "1em",
        fontWeight: "500",
        border: "none",
        textAlign: "center" as const,
    },
};
