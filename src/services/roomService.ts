import { Room } from "@/models/room";

export const getRooms = (): Room[] => {
    return JSON.parse(localStorage.getItem("rooms") || "[]");
  };
  
  export const saveRooms = (rooms: Room[]) => {
    localStorage.setItem("rooms", JSON.stringify(rooms));
  };
  
  export const addRoom = (room: Room) => {
    const rooms = getRooms();
    rooms.push(room);
    saveRooms(rooms);
  };
  
  export const updateRoom = (updatedRoom: Room) => {
    const rooms = getRooms().map((room) =>
      room.id === updatedRoom.id ? updatedRoom : room
    );
    saveRooms(rooms);
  };
  
  export const deleteRoom = (roomId: string) => {
    const rooms = getRooms().filter((room) => room.id !== roomId);
    saveRooms(rooms);
  };