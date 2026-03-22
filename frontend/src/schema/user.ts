import * as z from 'zod'

export const UserInfo = z.object({
    name: z.string(),
    role: z.string(),
})

export type UserInfoType = z.infer<typeof UserInfo>