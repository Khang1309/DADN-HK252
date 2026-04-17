import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type RoomType, listOfRoom } from "../schema/room";
import axiosClient from "../apis/api";

interface RoomInfoInterface {
    rooms: RoomType[],
    fetchRooms: () => Promise<void>,
    changeRoomName: (id: string, newName: string) => Promise<boolean>,
    addRoom: (roomName: string) => Promise<boolean>,
    deleteRoom: (roomId: string) => Promise<void>
}

export const useRoomInfo = create<RoomInfoInterface>()(
    persist(
        (set, get) => ({
            rooms: [],

            fetchRooms: async () => {
                try {
                    const data: any[] = await axiosClient.get("/api/Rooms");
                    const validateData = listOfRoom.parse(data);
                    set({ rooms: validateData });
                } catch (error) {
                    console.error(`Error getting room info:`, error);
                }
            },

            changeRoomName: async (id: string, newName: string) => {
                try {
                    await axiosClient.put(`/api/Rooms/${id}`, { roomName: newName });
                    await get().fetchRooms();
                    return true;
                } catch (error) {
                    console.error(`Error changing room name:`, error);
                    return false;
                }
            },

            addRoom: async (roomName: string) => {
                try {
                    await axiosClient.post("/api/Rooms", { roomName: roomName });
                    await get().fetchRooms()
                    return true;
                } catch (error) {
                    console.error(`Error while adding room:`, error);
                    return false;
                }
            },
            deleteRoom: async (roomId: string) => {
                try {
                    await axiosClient.delete(`/api/Rooms/${roomId}`)

                    set((state) => ({
                        rooms: state.rooms.filter((room) => room.roomId !== roomId)
                    }))
                } catch (error) {
                    console.log(`Error deleting ${roomId}`)
                }
            }
        }),


        {
            name: 'room-info-storage',
        }
    )
);