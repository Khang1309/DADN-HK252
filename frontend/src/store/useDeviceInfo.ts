import { create } from 'zustand'
import { DeviceDataList, type DeviceDataType } from '../schema/device';
import axiosClient from '../apis/api';

const mock1: DeviceDataType = { //delete
    id: 1, name: "Quat tran", type: 'fan', place: 'phong khach', value: 24, unit: "°C", action: "On", state: true
}
const mock2: DeviceDataType = { //delete
    id: 2, name: "Quat tran", type: 'fan', place: 'phong khach', value: 24, unit: "°C", action: "On", state: false
}


interface DeviceStore {
    // list of devices
    devices: DeviceDataType[];

    fetchDevices: () => Promise<void>

    updateDevice: (id: number, newValue: number) => void;
    updateAction: (id: number, action: string) => void;
}

export const useDeviceStore = create<DeviceStore>((set) => ({
    devices: [
        mock1, mock2
    ],
    fetchDevices: async () => {
        try {
            // const rawData = await axiosClient.get("/devices")
            // const data = DeviceDataList.parse(rawData.data)

            // set({ devices: data })
        } catch (error) {
            console.log(`Error when getting device info ${error}`)
        }
    },

    updateDevice: (id, newValue) => set((state) => ({
        // Use .map to find the specific device and update it
        devices: state.devices.map((device) =>
            device.id === id ? { ...device, value: newValue } : device
        )
    })),

    updateAction: (id, action) => set((state) => ({
        devices: state.devices.map((device) =>
            device.id === id ? { ...device, action: action } : device
        )
    })),

}));