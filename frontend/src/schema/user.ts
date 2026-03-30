import * as z from 'zod'

export const UserInfo = z.object({
    token: z.string(),
    email: z.string(),
    fullName: z.string(),
})

export type UserInfoType = z.infer<typeof UserInfo>