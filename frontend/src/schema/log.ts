import * as z from 'zod'

const LogObject = z.object({
    logsId: z.string(),
    timestamp: z.string(),
    logType: z.number(),
    deviceName: z.string(),
    action: z.string(),
    detail: z.string(),
    logdeviceId: z.string().nullable().optional(),
    device: z.string().nullable().optional(),
})

export type LogType = z.infer<typeof LogObject>
export const LogArray = z.array(LogObject)