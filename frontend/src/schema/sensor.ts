import * as z from 'zod'

const SensorDataObject = z.object({
    id: z.string(),
    sensorDeviceId: z.string(),
    time: z.string(),
    value: z.number(),
    sensor: z.string().nullable(),
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
    thresholdMin: z.number().optional(),
    thresholdMax: z.number().optional(),
    data: SensorDataList,
})

export type SensorType = z.infer<typeof SensorObject>;
export const SensorList = z.array(SensorObject)