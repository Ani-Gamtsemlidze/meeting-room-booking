import roomsData from "../data/rooms.json";
import type { Room } from "../types";

export async function getRooms(): Promise<Room[]> {
  const cached = localStorage.getItem("rooms");
  if (cached) {
    return JSON.parse(cached);
  }
  localStorage.setItem("rooms", JSON.stringify(roomsData));

  return roomsData as Room[];
}
