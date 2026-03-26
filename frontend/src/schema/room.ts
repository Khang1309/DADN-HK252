
import * as z from 'zod';
import { DeviceDataList } from "./device";
import { SensorInfoList } from "./sensor";

export const RoomInfoObject = z.object({
    roomId: z.number(),
    roomName: z.string(),
    listOfOutputDevices: DeviceDataList,
    listOfSensors: SensorInfoList,
})
export type RoomType = z.infer<typeof RoomInfoObject>
export const listOfRoom = z.array(RoomInfoObject);