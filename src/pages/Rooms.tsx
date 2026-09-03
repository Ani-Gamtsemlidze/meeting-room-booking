import { useEffect } from "react";
import { useRoomStore } from "../store/useRoomStore";
import RoomList from "../components/rooms/RoomList";
import SearchInput from "../components/SearchInput";
import RoomsFilter from "../components/rooms/RoomsFilter";
import { useRoomsFilter } from "../hooks/useRoomsFilter";
import LoadingState from "../components/LoadingState";

export default function Rooms() {
  const { rooms, fetchRooms, loading } = useRoomStore();
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const filters = useRoomsFilter(rooms);

  return (
    <div className="mx-auto w-full max-w-6xl  px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
          Meeting Rooms
        </h1>

        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Find and book the perfect room for your meeting.
        </p>
      </div>
      <div className="flex flex-col gap-3 lg:flex-row  mb-4">
        <div className="w-full lg:max-w-md">
          <SearchInput
            value={filters.search}
            onChange={filters.setSearch}
            placeholder="Search rooms"
          />
        </div>
        <RoomsFilter {...filters} />
      </div>
      <LoadingState loading={loading}>
        {filters.filteredRooms.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-sm font-medium text-slate-600">
              No rooms match your filters.
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={filters.resetFilters}
              className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <RoomList rooms={filters.filteredRooms} />
        )}
      </LoadingState>
    </div>
  );
}
