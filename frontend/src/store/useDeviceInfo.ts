import { create } from 'zustand'
import { DeviceDataList, type DeviceDataType } from '../schema/device';
import axiosClient from '../apis/api';

interface DeviceStore {
    // Devices by room
    devicesByRoom: Record<string, DeviceDataType[]>;

    // Loading states
    isLoading: boolean;
    error: string | null;

    // Polling
    pollingIntervals: Record<string, NodeJS.Timeout>;

    // Actions
    fetchDevicesForRoom: (roomId: string) => Promise<void>;
    toggleDeviceState: (deviceId: string, roomId: string) => Promise<boolean>;
    changeDeviceName: (deviceId: string, newName: string, roomId: string) => Promise<boolean>;
    refreshDeviceState: (deviceId: string, roomId: string) => Promise<void>;
    startPolling: (roomId: string, interval?: number) => void;
    stopPolling: (roomId: string) => void;
    updateAction: (id: string, state: string) => void,
}

export const useDeviceStore = create<DeviceStore>((set, get) => ({
    devicesByRoom: {},
    isLoading: false,
    error: null,
    pollingIntervals: {},

    fetchDevicesForRoom: async (roomId: string) => {
        set({ isLoading: true, error: null });
        try {
            const devices: DeviceDataType[] = await axiosClient.get(`/api/rooms/${roomId}/devices`);

            set((state) => ({
                devicesByRoom: {
                    ...state.devicesByRoom,
                    [roomId]: devices
                },
                isLoading: false
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to fetch devices',
                isLoading: false
            });
            console.error(`Error fetching devices for room ${roomId}:`, error);
        }
    },

    toggleDeviceState: async (deviceId: string, roomId: string) => {
        try {
            // Get current device state
            const devices = get().devicesByRoom[roomId] || [];
            const device = devices.find(d => d.deviceId === deviceId);

            if (!device) return false;

            // Optimistic update - immediately update UI
            const newState = device.onOffState === 'ON' ? 'OFF' : 'ON';
            set((state) => ({
                devicesByRoom: {
                    ...state.devicesByRoom,
                    [roomId]: state.devicesByRoom[roomId]?.map(d =>
                        d.deviceId === deviceId
                            ? { ...d, onOffState: newState, state: newState }
                            : d
                    ) || []
                }
            }));

            // Send update to backend
            await axiosClient.put(`/api/devices/${deviceId}`, {
                onOffState: newState
            });

            return true;
        } catch (error: any) {
            // Revert optimistic update on failure
            await get().refreshDeviceState(deviceId, roomId);
            console.error(`Error toggling device ${deviceId}:`, error);
            return false;
        }
    },

    changeDeviceName: async (deviceId: string, newName: string, roomId: string) => {
        try {
            // Optimistic update
            set((state) => ({
                devicesByRoom: {
                    ...state.devicesByRoom,
                    [roomId]: state.devicesByRoom[roomId]?.map(d =>
                        d.deviceId === deviceId
                            ? { ...d, deviceName: newName }
                            : d
                    ) || []
                }
            }));

            // Send to backend
            await axiosClient.put(`/api/devices/${deviceId}`, {
                deviceName: newName
            });

            return true;
        } catch (error: any) {
            // Revert on failure
            await get().refreshDeviceState(deviceId, roomId);
            console.error(`Error changing device name:`, error);
            return false;
        }
    },

    refreshDeviceState: async (deviceId: string, roomId: string) => {
        try {
            // Re-fetch all devices for the room
            const devices: DeviceDataType[] = await axiosClient.get(`/api/rooms/${roomId}/devices`);
            set((state) => ({
                devicesByRoom: {
                    ...state.devicesByRoom,
                    [roomId]: devices
                }
            }));
        } catch (error) {
            console.error(`Error refreshing device state:`, error);
        }
    },

    startPolling: (roomId: string, interval: number = 5000) => {
        // Clear existing interval if any
        get().stopPolling(roomId);

        const intervalId = setInterval(() => {
            get().refreshDeviceState('', roomId); // Empty deviceId means refresh all
        }, interval);

        set((state) => ({
            pollingIntervals: {
                ...state.pollingIntervals,
                [roomId]: intervalId
            }
        }));
    },

    stopPolling: (roomId: string) => {
        const intervals = get().pollingIntervals;
        if (intervals[roomId]) {
            clearInterval(intervals[roomId]);
            set((state) => ({
                pollingIntervals: {
                    ...state.pollingIntervals,
                    [roomId]: undefined
                }
            }));
        }
    },


    updateAction: (id, action) => set((state) => ({
        devices: state.devices.map((device) =>
            device.deviceId === id ? { ...device, action: action } : device
        )
    })),

}));