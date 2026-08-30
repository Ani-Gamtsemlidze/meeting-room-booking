import { useEffect } from "react";
import { useRoomStore } from "../store/useRoomStore";
import RoomList from "../components/rooms/RoomList";
import SearchInput from "../components/SearchInput";
import RoomsFilter from "../components/rooms/RoomsFilter";
import { useRoomsFilter } from "../hooks/useRoomsFilter";

export default function Rooms() {
  const { rooms, fetchRooms, loading } = useRoomStore();
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const filters = useRoomsFilter(rooms);

  if (loading) return <p>Loading rooms</p>;

  return (
    <div className="mx-auto w-full max-w-7xl  px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
          Meeting Rooms
        </h1>

        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Find and book the perfect room for your meeting.
        </p>
      </div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center mb-4">
        <div className="w-full lg:max-w-md">
          <SearchInput value={filters.search} onChange={filters.setSearch} />
        </div>
        <RoomsFilter {...filters} />
      </div>
      <RoomList rooms={filters.filteredRooms} />
    </div>
  );
}
