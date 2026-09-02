import { useMemo } from "react";
import type { Room } from "../types";
import { useSearchParams } from "react-router-dom";

export function useRoomsFilter(rooms: Room[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const capacity = searchParams.get("capacity") ?? "";
  const type = searchParams.get("type") ?? "";
  const floor = searchParams.get("floor") ?? "";
  const accessibleOnly = searchParams.get("accessible") === "true";

  function setParam(key: string, value: string | boolean) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      const isEmpty =
        value === "" || value === false || value === undefined;

      if (isEmpty) {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
      return next;
    });
  }

  const setSearch = (value: string) => setParam("search", value);
  const setCapacity = (value: string) => setParam("capacity", value);
  const setType = (value: string) => setParam("type", value);
  const setFloor = (value: string) => setParam("floor", value);
  const setAccessibleOnly = (value: boolean) => setParam("accessible", value);

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
    setSearchParams({});
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