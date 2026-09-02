import { useEffect } from "react";
import TodayBookings from "../components/dashboard/TodayBookings";
import { useRoomStore } from "../store/useRoomStore";
import { useBookingStore } from "../store/useBookingStore";
import { RoomStatusCard } from "../components/dashboard/RoomStatusCard";
import { Link } from "react-router-dom";
import { DashboardStats } from "../components/dashboard/DashboardStats";

export default function Dashboard() {
  const bookings = useBookingStore((state) => state.bookings);
  const rooms = useRoomStore((state) => state.rooms);
  const fetchBookings = useBookingStore((state) => state.fetchBookings);
  const fetchRooms = useRoomStore((state) => state.fetchRooms);

  useEffect(() => {
    fetchBookings();
    fetchRooms();
  }, [fetchBookings, fetchRooms]);
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <DashboardStats rooms={rooms} bookings={bookings} />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <TodayBookings bookings={bookings} rooms={rooms} />

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Room availability
              </h2>

              <p className="text-sm text-slate-500">
                {/* Current status of meeting rooms. */}
              </p>
            </div>

            <Link
              to="/rooms"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View all rooms
            </Link>
          </div>

          <div className="grid max-h-[420px] gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
            {rooms.map((room) => (
              <RoomStatusCard key={room.id} room={room} bookings={bookings} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
