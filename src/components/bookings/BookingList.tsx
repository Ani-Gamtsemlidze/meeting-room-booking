import type { Booking, Employee, Room } from "../../types";
import BookingCard from "./BookingCard";

interface BookingListProps {
  bookings: Booking[];
  rooms: Room[];
  employees: Employee[];
}

export default function BookingList({
  bookings,
  rooms,
  employees,
}: BookingListProps) {
  if (!bookings.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 py-14 text-center">
        <p className="font-medium text-slate-700">No bookings found</p>

        <p className="mt-1 text-sm text-slate-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {bookings.map((booking) => {
        const room = rooms.find((r) => r.id === booking.roomId);
        const organizer = employees.find((e) => e.id === booking.organizerId);
        return (
          <BookingCard
            key={booking.id}
            booking={booking}
            room={room}
            organizer={organizer}
          />
        );
      })}
    </div>
  );
}
