import * as z from 'zod'

export const DeviceObject = z.object(
    {
        deviceId: z.string(),
        deviceName: z.string(),
        feedKey: z.string(),
        type: z.string(),
        state: z.string(),
        auto: z.boolean().optional(),
        onOffState: z.string().optional(),
        currentValue: z.number().optional().nullable(),
        thresholdMin: z.number().optional(),
        thresholdMax: z.number().optional(),
    }
)

export type DeviceType = z.infer<typeof DeviceObject>
export const DeviceList = z.array(DeviceObject)
