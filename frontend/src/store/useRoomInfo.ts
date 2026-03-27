import { create } from "zustand";
import { type RoomType, listOfRoom } from "../schema/room";
import axiosClient from "../apis/api";

interface RoomInfoInterface {
    rooms: RoomType[],

    fetchRooms: () => Promise<void>,
    changeRoomName: (id: number, newName: string) => Promise<boolean>,
    addRoom: (roomName: string) => Promise<void>
}

const mockRoom = [
    {
        roomId: 1,
        roomName: "Living Room",
        listOfOutputDevices: [
            {
                id: 1,
                name: "Main Light",
                type: "Light",
                place: "Ceiling",
                value: 100,
                unit: "%",
                action: "on",
                state: true,
            },
            {
                id: 2,
                name: "TV",
                type: "Entertainment",
                place: "Wall",
                value: 0,
                unit: "",
                action: "off",
                state: false,
            },
        ],
        listOfSensors: [
            {
                id: 1,
                name: "Temperature Sensor",
                type: "Temperature",
                place: "Wall",
                sensor_data: {
                    id: 1,
                    time: new Date(),
                    value: 25,
                },
                unit: "°C",
                state: true,
                threshold_min: 20,
                threshold_max: 30,
            },
            {
                id: 2,
                name: "Motion Sensor",
                type: "Motion",
                place: "Door",
                sensor_data: null,
                unit: "",
                state: true,
                threshold_min: 0,
                threshold_max: 1,
            },
        ],
    },
    {
        roomId: 2,
        roomName: "Kitchen",
        listOfOutputDevices: [
            {
                id: 3,
                name: "Oven",
                type: "Appliance",
                place: "Counter",
                value: 180,
                unit: "°C",
                action: "auto",
                state: false,
            },
            {
                id: 4,
                name: "Refrigerator Light",
                type: "Light",
                place: "Inside Fridge",
                value: 50,
                unit: "%",
                action: "auto",
                state: true,
            },
        ],
        listOfSensors: [
            {
                id: 3,
                name: "Humidity Sensor",
                type: "Humidity",
                place: "Wall",
                sensor_data: {
                    id: 3,
                    time: new Date(),
                    value: 65,
                },
                unit: "%",
                state: true,
                threshold_min: 40,
                threshold_max: 80,
            },
        ],
    },
    {
        roomId: 3,
        roomName: "Bedroom",
        listOfOutputDevices: [
            {
                id: 5,
                name: "Bedroom Light",
                type: "Light",
                place: "Bedside",
                value: 75,
                unit: "%",
                action: "on",
                state: true,
            },
            {
                id: 6,
                name: "Fan",
                type: "Fan",
                place: "Ceiling",
                value: 3,
                unit: "speed",
                action: "off",
                state: false,
            },
        ],
        listOfSensors: [
            {
                id: 4,
                name: "CO2 Sensor",
                type: "CO2",
                place: "Wall",
                sensor_data: {
                    id: 4,
                    time: new Date(),
                    value: 400,
                },
                unit: "ppm",
                state: true,
                threshold_min: 300,
                threshold_max: 1000,
            },
        ],
    },
]

export const useRoomInfo = create<RoomInfoInterface>((set) => ({
    rooms: mockRoom,

    fetchRooms: async () => {
        try {
            // const rawData = await axiosClient.get("")
            // const data = listOfRoom.parse(rawData.data)
            // set({ rooms: data })
            set({ rooms: mockRoom })
        } catch (error) {
            console.log(`Error getting room info ${error}`)
        }
    },
    changeRoomName: async (id: number, newName: string) => {
        try {
            // const response = await axiosClient.put("", newName);
            // if (!response.data) { return false; }

            // set((state) => ({
            //     rooms: state.rooms.map((room) =>
            //         room.roomId === id ? { ...room, roomName: newName } : room
            //     )
            // }));

            return true
        } catch (error) {
            console.log(`Error changing room name ${error}`)
            return false;
        }
    },
    addRoom: async (roomName: string) => {
        try {
            await axiosClient.post("", roomName)
        } catch (error) {
            console.log(`Error while add room ${error}`)
        }
    }
}))