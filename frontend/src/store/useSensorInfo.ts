import { create } from "zustand";
import axiosClient from "../apis/api";
import { type SensorType, SensorInfoList, type SensorData, SensorDataList } from "../schema/sensor";

interface SensorStore {
    sensors: SensorType[],
    sensorData: SensorData[],
    fetchSensors: () => Promise<void>,
    changeSensorName: (id: string, newName: string) => Promise<boolean>,
    getSensorData: (id: string) => Promise<void>,
}



export const useSensorInfo = create<SensorStore>((set) => ({
    sensors: [],
    sensorData: [],

    fetchSensors: async () => {
        try {
            // const rawData = await axiosClient.get('/sensors')
            // const data = SensorInfoList.parse(rawData.data)

            // set({ sensors: data })
        }
        catch (err) {
            console.log(`Error getting sensor data ${err}`)
        }
    },
    changeSensorName: async (id: string, newName: string) => {
        try {
            // const response = await axiosClient.put("", newName);
            // if (!response.data) { return false; }

            // set((state) => ({
            //     sensors: state.sensors.map((sensor) =>
            //         sensor.id === id ? { ...sensor, name: newName } : sensor
            //     )
            // }));

            return true
        } catch (error) {
            console.log(`Error changing sensor name ${error}`)
            return false;
        }
    },
    getSensorData: async (id: string) => {
        try {
            const data = await axiosClient.get(`/api/devices/${id}/data`)
            console.log(data, 'aaaaa')
            const value = SensorDataList.parse(data)

            set({ sensorData: value })

        } catch (error) {

        }
    }
}))

