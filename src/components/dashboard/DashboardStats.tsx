import {
  DoorOpen,
  CircleCheckBig,
  CalendarDays,
  Clock3,
} from "lucide-react";
import type { Booking, Room } from "../../types";
import { getBookingDisplayStatus } from "../../utils/bookingStatus";

export function DashboardStats({
  rooms,
  bookings,
}: {
  rooms: Room[];
  bookings: Booking[];
}) {
  const now = new Date();

  const availableRooms = rooms.filter(
    (room) =>
      !bookings.some(
        (booking) =>
          booking.roomId === room.id &&
          getBookingDisplayStatus(booking) === "in-progress",
      ),
  );

  const todaysBookings = bookings.filter(
    (booking) =>
      booking.status !== "canceled" &&
      new Date(booking.date).toDateString() === now.toDateString(),
  );

  const startOfTomorrow = new Date();
  startOfTomorrow.setHours(24, 0, 0, 0);

  const upcomingBookings = bookings.filter(
    (booking) =>
      booking.status !== "canceled" &&
      new Date(`${booking.date}T${booking.startTime}`) >= startOfTomorrow,
  );

  const stats = [
    {
      label: "Occupied now",
      value: rooms.length - availableRooms.length,
      icon: DoorOpen,
      helper: "In a meeting right now",
    },
    {
      label: "Available now",
      value: availableRooms.length,
      icon: CircleCheckBig,
      helper: "Ready to book",
    },
    {
      label: "Today's bookings",
      value: todaysBookings.length,
      icon: CalendarDays,
      helper: "Scheduled today",
    },
    {
      label: "Upcoming bookings",
      value: upcomingBookings.length,
      icon: Clock3,
      helper: "From tomorrow on",
    },
  ];

  return (
    <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.label}
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  {stat.value}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Icon size={20} />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">{stat.helper}</p>
          </div>
        );
      })}
    </div>
  );
}