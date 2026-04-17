import * as z from 'zod'

const LogObject = z.object({
    logsId: z.string(),
    timestamp: z.string(),
    logType: z.boolean(),
    deviceName: z.string(),
    action: z.string(),
    details: z.string(),
    deviceId: z.string(),
    device: z.string().nullable(),
})

export type LogType = z.infer<typeof LogObject>
export const LogArray = z.array(LogObject)