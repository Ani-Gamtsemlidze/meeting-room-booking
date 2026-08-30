import { useMemo, useState } from "react";
import type { Room } from "../types";

export function useRoomsFilter(rooms: Room[]) {
  const [search, setSearch] = useState("");
  const [capacity, setCapacity] = useState("");
  const [type, setType] = useState("");
  const [floor, setFloor] = useState("");
  const [accessibleOnly, setAccessibleOnly] = useState(false);

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      if (search && !room.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (capacity && room.capacity < Number(capacity)) return false;
      if (type && room.type !== type) return false;
      if (floor && room.floor !== Number(floor)) return false;
      if (accessibleOnly && !room.isAccessible) return false;
      return true;
    });
  }, [rooms, search, capacity, type, floor, accessibleOnly]);

  function resetFilters() {
    setSearch("");
    setCapacity("");
    setType("");
    setFloor("");
    setAccessibleOnly(false);
  }
  return {
    search,
    setSearch,
    filteredRooms,
    capacity,
    setCapacity,
    type,
    setType,
    setFloor,
    floor,
    setAccessibleOnly,
    accessibleOnly,
    resetFilters,
  };
}
