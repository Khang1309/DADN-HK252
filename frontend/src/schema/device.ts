import * as z from 'zod'

export const DeviceDataObject = z.object(
    {
        deviceId: z.string(),
        deviceName: z.string(),
        feedKey: z.string(),
        type: z.string(),
        state: z.string(),
        auto: z.boolean().optional(),
        onOffState: z.string().optional(),
        thresholdMin: z.number().optional(),
        thresholdMax: z.number().optional(),
    }
)

export type DeviceDataType = z.infer<typeof DeviceDataObject>
export const DeviceDataList = z.array(DeviceDataObject)
