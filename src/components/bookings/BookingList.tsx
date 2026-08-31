import type { Booking, Employee, Room } from "../../types";
import BookingCard from "./BookingCard";

interface BookingListProps {
  bookings: Booking[];
  rooms: Room[];
  employees: Employee[];
}

export default function BookingList({ bookings, rooms, employees }: BookingListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {bookings.map((booking) => {
        const room = rooms.find((r) => r.id === booking.roomId);
        const organizer = employees.find((e) => e.id === booking.organizerId);
        return <BookingCard key={booking.id} booking={booking} room={room} organizer={organizer} />;
      })}
    </div>
  );
}