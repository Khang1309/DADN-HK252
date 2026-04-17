import * as z from 'zod';

export const RoomInfoObject = z.object({
    roomId: z.string(),
    roomName: z.string(),
})

export type RoomType = z.infer<typeof RoomInfoObject>
export const listOfRoom = z.array(RoomInfoObject);