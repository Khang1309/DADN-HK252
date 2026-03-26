import { create } from "zustand";
import { type UserInfoType, UserInfo } from "../schema/user";
import axiosClient from "../apis/api";


interface UserInfoState {
    info: UserInfoType | null,
    isLoading: boolean,
    err: string | null,
    fetchUserInfo: () => Promise<void>
}

const mock: UserInfoType = {
    name: "Khang",
}

export const useUserInfoStore = create<UserInfoState>((set) => ({
    info: mock,
    isLoading: false,
    err: null,

    fetchUserInfo: async () => {
        set({ isLoading: true, err: null });
        try {

            // const rawData = await axiosClient.get("/user")
            // const data = UserInfo.parse(rawData.data)
            // set({ info: data })

            set({ isLoading: false });
        }
        catch (errs) {
            set({ err: `Fail to load device ${errs}`, isLoading: false })
            console.log(errs)
        }
    }

}))
