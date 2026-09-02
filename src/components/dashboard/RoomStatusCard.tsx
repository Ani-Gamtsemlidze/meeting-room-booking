import { DoorOpen, MapPin, Users2 } from "lucide-react";
import type { Booking, Room } from "../../types";
import { getBookingDisplayStatus } from "../../utils/bookingStatus";

export function RoomStatusCard({
  room,
  bookings,
}: {
  room: Room;
  bookings: Booking[];
}) {
  const currentBooking = bookings.find(
    (booking) =>
      booking.roomId === room.id &&
      getBookingDisplayStatus(booking) === "in-progress",
  );

  const status = currentBooking ? "occupied" : "available";

  const statusStyles = {
    available: "bg-emerald-50 text-emerald-700",
    occupied: "bg-amber-50 text-amber-700",
  };

  const dotStyles = {
    available: "bg-emerald-500",
    occupied: "bg-amber-500",
  };

  const label = currentBooking
    ? `Occupied until ${currentBooking.endTime}`
    : "Available now";

  return (
    
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <DoorOpen size={21} />
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold text-slate-900">{room.name}</h3>

          <p className="text-sm capitalize text-slate-500">{room.type}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
        <span className="flex items-center gap-1.5">
          <Users2 size={15} />
          {room.capacity} seats
        </span>

        <span className="flex items-center gap-1.5">
          <MapPin size={15} />
          Floor {room.floor}
        </span>
      </div>

      <div
        className={`mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${statusStyles[status]}`}
      >
        <span className={`h-2 w-2 rounded-full ${dotStyles[status]}`} />

        {label}
      </div>
    </div>
  );
}