import * as z from 'zod'

const SensorDataPrime = z.object({
    id: z.number(),
    time: z.coerce.date(),
    value: z.number(),
})


export const SensorInfoObject = z.object({
    id: z.number(),
    name: z.string(),
    type: z.string(),
    place: z.string(),
    sensor_data: SensorDataPrime.nullable(),
    unit: z.string(),
    state: z.boolean(),// state current: on / off
    threshold_min: z.number(),
    threshold_max: z.number(),
})

export type SensorType = z.infer<typeof SensorInfoObject>;
export const SensorInfoList = z.array(SensorInfoObject)