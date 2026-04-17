import { create } from 'zustand';

import { type RoomType } from '../schema/room';
import { type SensorType } from '../schema/sensor';

interface ChartStore {
    currentRoom: RoomType | null;
    currentSensor: SensorType | null;
    setCurrentRoom: (room: any) => void;
    setCurrentSensor: (sensor: any) => void;
}

export const useChartStore = create<ChartStore>((set) => ({
    currentRoom: null,
    currentSensor: null,
    setCurrentRoom: (room) => set({ currentRoom: room }),
    setCurrentSensor: (sensor) => set({ currentSensor: sensor }),
}));
