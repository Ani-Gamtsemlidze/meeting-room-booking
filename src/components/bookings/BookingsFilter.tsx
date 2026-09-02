import {
  CalendarDays,
  CircleCheck,
  DoorOpen,
  RefreshCcwDot,
} from "lucide-react";
import type { Room } from "../../types";

interface BookingsFilterProps {
  rooms: Room[];
  setRoomFilter: (value: string) => void;
  roomFilter: string | null;
  setDateFilter: (value: string) => void;
  dateFilter: string | null;
  statusFilter: string | null;
  setStatusFilter: (value: string) => void;
  resetBookingFilter: () => void;
}

export default function BookingsFilter({
  rooms,
  setRoomFilter,
  roomFilter,
  setDateFilter,
  dateFilter,
  statusFilter,
  setStatusFilter,
  resetBookingFilter,
}: BookingsFilterProps) {
  const selectClasses =
    "h-11 appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-9 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative">
        <CalendarDays
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <select
          className={selectClasses}
          onChange={(e) => setDateFilter(e.target.value)}
          value={dateFilter || ""}
        >
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
          <option value="all">All bookings</option>
          <option value="inprogress">in progress</option>
        </select>
      </div>

      <div className="relative">
        <CircleCheck
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <select
          className={selectClasses}
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter || ""}
        >
          <option value="">Any status</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Canceled</option>
        </select>
      </div>

      <div className="relative">
        <DoorOpen
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <select
          className={selectClasses}
          onChange={(e) => setRoomFilter(e.target.value)}
          value={roomFilter || ""}
        >
          <option value="">Any room</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
      </div>

      <div className="ml-2 flex items-center">
        <RefreshCcwDot size={16} className="text-slate-400" />

        <button
          onClick={resetBookingFilter}
          type="button"
          className="ml-1 text-sm font-medium text-slate-500 transition hover:text-slate-900 cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
