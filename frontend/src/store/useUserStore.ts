import { create } from "zustand";
import { getCookie, setCookie, removeCookie } from 'typescript-cookie'

import { type UserInfoType } from "../schema/user";
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';
import axiosClient from "../apis/api";

const EXPIRED_TIME = 1;

interface UserInfoState {
    info: UserInfoType | null,
    isLoading: boolean,
    err: string | null,
    setError: (err: string | null) => void
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string, fullname: string) => Promise<void>
    logout: () => Promise<void>
    changePassword: (oldPassword: string, newPassword: string, confirmPassword: string) => Promise<void>
}


const cookieStorage: StateStorage = {
    getItem: (name: string) => getCookie(name) ?? null,
    setItem: (name: string, value: string) => setCookie(name, value, { expires: EXPIRED_TIME }), //1 day
    removeItem: (name: string) => removeCookie(name),
}


export const useUserInfoStore = create<UserInfoState>()(
    persist((set) => ({
        info: null,
        isLoading: false,
        err: null,

        setError: (err) => {
            set({ err: err })
        },

        login: async (email: string, password: string) => {
            set({ isLoading: true, err: null });
            try {

                const data = await axiosClient.post("/api/Auth/login", { email: email, password: password })

                set({
                    info: data as unknown as UserInfoType,
                    isLoading: false
                });
            }
            catch (errs: any) {
                const errorMessage = errs?.response?.data?.message || errs?.message || "An unknown error occurred";

                set({
                    err: `Failed to login: ${errorMessage}`,
                    isLoading: false
                });

                console.log(errs);
            }
        },
        register: async (email: string, password, fullname: string) => {
            set({ isLoading: true, err: null });
            try {

                const data = await axiosClient.post("/api/Auth/register", { email: email, password: password, fullName: fullname })

                set({
                    info: data as unknown as UserInfoType,
                    isLoading: false
                });
            }
            catch (errs: any) {

                const errorMessage = errs?.response?.data?.message || errs?.message || "An unknown error occurred";

                set({
                    err: `Failed to register: ${errorMessage}`,
                    isLoading: false
                });

                console.log(errs);
            }

        },
        logout: async () => {
            try {
                set({ info: null })
            } catch (errs: any) {
                const errorMessage = errs?.response?.data?.message || errs?.message || "An unknown error occurred";

                set({
                    err: `Failed to log out: ${errorMessage}`,
                    isLoading: false
                });

            }
        },
        changePassword: async (oldPassword, newPassword, confirmPassword) => {
            set({ isLoading: true, err: null });
            try {
                await axiosClient.post("/api/Auth/change-password", {
                    oldPassword,
                    newPassword,
                    confirmPassword
                });
                set({ isLoading: false });
            } catch (errs) {
                const error = errs as any;
                const errorMessage = error?.response?.data?.message || error?.message || "An unknown error occurred";
                set({
                    err: `Failed to change password: ${errorMessage}`,
                    isLoading: false
                });
                console.log(errs);
                throw errs;
            }
        }
    }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => cookieStorage)
        }

    )

)
