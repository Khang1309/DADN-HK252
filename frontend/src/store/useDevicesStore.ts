import { create } from "zustand";
import { type SensorType, type SensorData, SensorDataList } from "../schema/sensor";
import { type DeviceType } from "../schema/device";
import { useRoomInfo } from "./useRoomInfo";

import axiosClient from "../apis/api";

interface DeviceData {
    listOfOutput: Record<string, DeviceType[]>, //key la roomID, 
    listOfSensor: Record<string, SensorType[]>,
    countOutputs: () => number,
    countSensors: () => number,
    fetchSensorData: (sensorId: string) => Promise<SensorData[]>;
    fetchDevices: () => Promise<void>,

    addOutput: (roomId: string, deviceName: string) => Promise<void>
    addSensor: (roomId: string, deviceName: string, thresMin: number, thresMax: number) => Promise<void>


    updateNameOutput: (roomId: string, newName: string, deviceId: string) => Promise<void>
    updateNameSensor: (roomId: string, newName: string, deviceId: string) => Promise<void>

    updateValueSensor: (roomId: string, sensorId: string, thresholdMin: number, thresholdMax: number) => Promise<void>

    deleteOutput: (outputId: string, roomId: string) => Promise<void>
    deleteSensor: (sensorId: string, roomId: string) => Promise<void>

    updateSensorForOutput: (currentOutput: string, sensorId: string) => Promise<void>
    getAllSensorData: () => SensorType[]
}

export const useDevicesStore = create<DeviceData>((set, get) => ({
    listOfOutput: {},
    listOfSensor: {},
    countOutputs: () => {
        const outputsRecord = get().listOfOutput;

        const allDeviceArrays = Object.values(outputsRecord);

        const totalCount = allDeviceArrays.reduce((total, deviceList) => {
            return total + deviceList.length;
        }, 0);

        return totalCount;
    },
    countSensors: () => {
        const sensorsRecord = get().listOfSensor;

        const allDeviceArrays = Object.values(sensorsRecord);

        const totalCount = allDeviceArrays.reduce((total, deviceList) => {
            return total + deviceList.length;
        }, 0);

        return totalCount;
    },
    fetchSensorData: async (sensorId: string) => {
        try {
            const data = await axiosClient.get(`/api/devices/${sensorId}/data`)
            const realData = SensorDataList.parse(data)
            console.log(realData, '123')
            return realData;
        } catch (error) {
            console.log("Error getting sensor data" + sensorId)
            return []
        }

    },
    fetchDevices: async () => {
        try {

            const rooms = useRoomInfo.getState().rooms

            await Promise.all(rooms.map(async (room) => {
                try {

                    const allDevices: any[] = await axiosClient.get(`/api/rooms/${room.roomId}/devices`);

                    const outputs = (allDevices.filter((device) => device.type === 'OUTPUT') as DeviceType[])
                        .sort((a, b) => a.deviceId.localeCompare(b.deviceId));

                    const sensors = (allDevices.filter((device) => device.type === 'SENSOR') as SensorType[])
                        .sort((a, b) => a.deviceId.localeCompare(b.deviceId));

                    console.log(sensors)
                    await Promise.all(sensors.map(async (sensor) => {
                        const data = await get().fetchSensorData(sensor.deviceId)
                        // Sort data by 'time' field descending to ensure newest is first
                        sensor["data"] = data.sort((a, b) => {
                            const timeA = a.time ? new Date(a.time).getTime() : 0;
                            const timeB = b.time ? new Date(b.time).getTime() : 0;
                            return timeB - timeA;
                        });
                    }))


                    set((state) => ({
                        listOfOutput: {
                            ...state.listOfOutput, // Keep devices from other rooms safe
                            [room.roomId]: outputs // Update just this room's devices
                        },
                        listOfSensor: {
                            ...state.listOfSensor, // Keep sensors from other rooms safe
                            [room.roomId]: sensors // Update just this room's sensors
                        }
                    }))


                }
                catch (error) {
                    console.error(`Failed to fetch devices for room ${room.roomId}`, error);
                }
            }))
        } catch (error) {
            console.error(`Failed to fetch devices`, error);
        }
    },

    addOutput: async (roomId: string, deviceName: string) => {
        try {
            await axiosClient.post(`/api/rooms/${roomId}/devices`, { deviceName: deviceName, type: 'OUTPUT' })

            await get().fetchDevices()

        } catch (error) {
            console.error("Failed to add output device:", error);
            throw error;
        }
    },
    addSensor: async (roomId: string, deviceName: string, thresMin: number, thresMax: number) => {
        try {
            await axiosClient.post(`/api/rooms/${roomId}/devices`, { deviceName: deviceName, type: 'SENSOR', thresholdMin: thresMin, thresholdMax: thresMax })

            await get().fetchDevices()

        } catch (error) {
            console.error("Failed to add sensor device:", error);
            throw error;
        }

    },

    updateNameOutput: async (roomId: string, newName: string, deviceId: string) => {
        try {

            await axiosClient.put(`/api/devices/${deviceId}`, { deviceName: newName })

            set((state) => ({
                listOfOutput: {
                    ...state.listOfOutput,
                    [roomId]: state.listOfOutput[roomId]?.map((output) =>
                        output.deviceId === deviceId ?
                            { ...output, deviceName: newName } : output
                    ) || []
                }
            }))
        } catch (error) {
            console.error(`Failed to update name for device ${deviceId}`, error);
        }
    },
    updateNameSensor: async (roomId: string, newName: string, deviceId: string) => {
        try {

            await axiosClient.put(`/api/devices/${deviceId}`, { deviceName: newName })

            set((state) => ({
                listOfSensor: {
                    ...state.listOfSensor,
                    [roomId]: state.listOfSensor[roomId]?.map((sensor) =>
                        sensor.deviceId === deviceId ?
                            { ...sensor, deviceName: newName } : sensor
                    ) || []
                }
            }))
        } catch (error) {
            console.error(`Failed to update name for device ${deviceId}`, error);
        }

    },

    updateValueSensor: async (roomId: string, sensorId: string, thresholdMin: number, thresholdMax: number) => {
        try {
            await axiosClient.put(`/api/devices/${sensorId}`, {
                thresholdMin: thresholdMin,
                thresholdMax: thresholdMax
            })

            set((state) => ({
                listOfSensor: {
                    ...state.listOfSensor,
                    [roomId]: state.listOfSensor[roomId]?.map((sensor) =>
                        sensor.deviceId === sensorId ?
                            { ...sensor, thresholdMin: thresholdMin, thresholdMax: thresholdMax } : sensor
                    ) || []
                }
            }))
        } catch (error) {
            console.error(`Failed to update threshold for sensor ${sensorId}`, error);
        }
    },

    deleteOutput: async (outputId: string, roomId: string) => {
        try {
            await axiosClient.delete(`/api/devices/${outputId}`)

            set((state) => ({
                listOfOutput: {
                    ...state.listOfOutput,
                    [roomId]: state.listOfOutput[roomId]?.filter((output) =>
                        output.deviceId !== outputId
                    )
                }
            }))

        } catch (error) {
            console.log("Error deleting output" + outputId)
        }
    },
    deleteSensor: async (sensorId: string, roomId: string) => {
        try {
            await axiosClient.delete(`/api/devices/${sensorId}`)

            set((state) => ({
                listOfSensor: {
                    ...state.listOfSensor,
                    [roomId]: state.listOfSensor[roomId]?.filter((sensor) =>
                        sensor.deviceId !== sensorId
                    )
                }
            }))

        } catch (error) {
            console.log("Error deleting output" + sensorId)
        }

    },
    updateSensorForOutput: async (currentOutput: string, sensorId: string) => {
        try {
            await axiosClient.put(`/api/devices/${currentOutput}`, { connectedSensorId: sensorId })
            // After successful update, refresh devices to get the latest data
            await get().fetchDevices()

        } catch (error) {
            console.log("Error updating sensor for output" + currentOutput)
        }
    },
    getAllSensorData: () => {
        try {
            const rooms = useRoomInfo.getState().rooms
            const allSensors = rooms.map((room) => {
                return get().listOfSensor[room.roomId] || [];
            })
            return allSensors.flat()
        } catch (error) {
            console.log("Error fetching all sensor data")
            return []
        }
    }
}))