import { create } from "zustand";
import { type RoomType, listOfRoom } from "../schema/room";
import axiosClient from "../apis/api";

interface RoomInfoInterface {
    rooms: RoomType[],
    fetchRooms: () => Promise<void>,
    changeRoomName: (id: string, newName: string) => Promise<boolean>,
    addRoom: (roomName: string) => Promise<boolean>
}

export const useRoomInfo = create<RoomInfoInterface>((set) => ({
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
            return true;
        } catch (error) {
            console.error(`Error changing room name:`, error);
            return false;
        }
    },

    addRoom: async (roomName: string) => {
        try {
            await axiosClient.post("/api/Rooms", { roomName: roomName });
            return true;
        } catch (error) {
            console.error(`Error while adding room:`, error);
            return false;
        }
    }
}));