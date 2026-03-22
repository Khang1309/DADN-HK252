import * as z from 'zod'

export const DeviceDataObject = z.object(
    {
        id: z.number(),
        name: z.string(),
        type: z.string(),
        place: z.string(),
        value: z.number(),
        unit: z.string(),
        action: z.string(), // User action on, off, auto
        state: z.boolean(), // state current: on / off, true => on
    }
)

export type DeviceDataType = z.infer<typeof DeviceDataObject>
export const DeviceDataList = z.array(DeviceDataObject)
