import { create } from 'zustand';

import { type RoomType } from '../schema/room';
import { type SensorType } from '../schema/sensor';
import { type DeviceType } from '../schema/device';

interface HistoryStore {
    currentRoom: RoomType | null;
    currentDevice: SensorType | DeviceType | null;
    setCurrentRoom: (room: any) => void;

    setCurrentDevice: (Device: any) => void;
}

export const useHistoryStore = create<HistoryStore>((set) => ({
    currentRoom: null,

    currentDevice: null,
    setCurrentRoom: (room) => set({ currentRoom: room }),

    setCurrentDevice: (Device) => set({ currentDevice: Device }),
}));
