import { create } from "zustand";
import type { Room } from "../types";
import * as roomsService from "../services/roomsService";

interface RoomState {
  rooms: Room[];
  loading: boolean;
  fetchRooms: () => Promise<void>;
}

export const useRoomStore = create<RoomState>((set) => ({
  rooms: [],
  loading: true,

  fetchRooms: async () => {
    set({ loading: true });

    try {
      const data = await roomsService.getRooms();

      set({
        rooms: data,
        loading: false
      });
    } finally {
      set({
        loading: false,
      });
    }
  },
}));