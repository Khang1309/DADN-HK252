import { create } from "zustand";
import axiosClient from "../apis/api";
import { type SensorType, SensorInfoList } from "../schema/sensor";

interface SensorStore {
    sensors: SensorType[],
    fetchSensors: () => Promise<void>,
}

const mockSensors: SensorType[] = [
    {
        id: 1,
        name: 'Living Room Temp',
        type: 'temperature',
        place: 'Living Room',
        unit: '°C',
        state: true,
        threshold_min: 16,
        threshold_max: 32,
        sensor_data:

            { id: 103, time: new Date('2026-03-22T10:00:00Z'), value: 24.8 },

    },
    {
        id: 2,
        name: 'Bathroom Humidity',
        type: 'humidity',
        place: 'Bathroom',
        unit: '%',
        state: true,
        threshold_min: 30,
        threshold_max: 65,
        sensor_data:
            { id: 201, time: new Date('2026-03-22T09:30:00Z'), value: 55 },
        // Someone took a shower!

    },
    {
        id: 3,
        name: 'Garage Door Sensor',
        type: 'contact',
        place: 'Garage',
        unit: 'binary',
        state: false, // Currently off/closed
        threshold_min: 0,
        threshold_max: 1,

        sensor_data: null
    }
];



export const useSensorInfo = create<SensorStore>((set) => ({
    sensors: mockSensors,

    fetchSensors: async () => {
        try {
            // const rawData = await axiosClient.get('/sensors')
            // const data = SensorInfoList.parse(rawData.data)

            // set({ sensors: data })
        }
        catch (err) {
            console.log(`Error getting sensor data ${err}`)
        }
    }
}))

