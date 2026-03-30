import * as z from 'zod';
import { DeviceDataList } from './device';
import { SensorInfoList } from './sensor';

export const RoomInfoObject = z.object({
    roomId: z.string(),
    roomName: z.string(),
    // Add these back so RoomCard knows they exist!
    listOfOutputDevices: DeviceDataList.default([]),
    listOfSensors: SensorInfoList.default([]),
})

export type RoomType = z.infer<typeof RoomInfoObject>
export const listOfRoom = z.array(RoomInfoObject);