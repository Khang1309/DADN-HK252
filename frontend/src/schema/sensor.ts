import * as z from 'zod'

const SensorDataObject = z.object({
    id: z.string().optional(),
    sensorDeviceId: z.string().optional(),
    time: z.string().optional(),
    timestamp: z.string().optional(),
    value: z.number(),
    sensor: z.string().nullable().optional(),
})

export type SensorData = z.infer<typeof SensorDataObject>
export const SensorDataList = z.array(SensorDataObject)

export const SensorObject = z.object({
    deviceId: z.string(),
    deviceName: z.string(),
    type: z.string(),
    feedKey: z.string(),
    state: z.string(),
    auto: z.boolean().nullable(),
    onOffState: z.string().nullable(),
    currentValue: z.number().optional().nullable(),
    thresholdMin: z.number().optional(),
    thresholdMax: z.number().optional(),
    data: SensorDataList,
})

export type SensorType = z.infer<typeof SensorObject>;
export const SensorList = z.array(SensorObject)