import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock3 } from "lucide-react";

import { useBookingStore } from "../store/useBookingStore";
import { useRoomStore } from "../store/useRoomStore";
import { useEmployeesStore } from "../store/useEmployeesStore";
import { toast } from "sonner";
import { useEffect } from "react";
import BookingDetailHeader from "../components/bookings/details/BookingDetailHeader";
import BookingDetailActions from "../components/bookings/details/BookingDetailActions";
import BookingDetailSections from "../components/bookings/details/BookingDetailSections";

export default function BookingDetail() {
  const { id } = useParams();

  const bookings = useBookingStore((state) => state.bookings);
  const fetchBookings = useBookingStore((state) => state.fetchBookings);
  const rooms = useRoomStore((state) => state.rooms);
  const fetchRooms = useRoomStore((state) => state.fetchRooms);
  const employees = useEmployeesStore((state) => state.employees);
  const fetchEmployees = useEmployeesStore((state) => state.fetchEmployees);
  const cancelBookingById = useBookingStore((state) => state.cancelBookingById);

  useEffect(() => {
    fetchBookings();
    fetchRooms();
    fetchEmployees();
  }, [fetchBookings, fetchRooms, fetchEmployees]);

  const booking = bookings.find((booking) => booking.id === id);

  if (!booking) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Link
          to="/bookings"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={18} />
          Back to bookings
        </Link>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <h1 className="text-xl font-bold text-slate-900">
            Booking not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            This booking may no longer exist.
          </p>
        </div>
      </div>
    );
  }

  const room = rooms.find((room) => room.id === booking.roomId);

  const organizer = employees.find(
    (employee) => employee.id === booking.organizerId,
  );

  const isCancelled = booking.status === "cancelled";

  async function handleCancel() {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await cancelBookingById(booking!.id);
      toast.success("Booking cancelled");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    }
  }
  const bookingDateTime = new Date(`${booking.date}T${booking.startTime}`);
  const isPast = bookingDateTime < new Date();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/bookings"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft size={18} />
        Back to bookings
      </Link>

      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <BookingDetailHeader
          isCancelled={isCancelled}
          room={room}
          booking={booking}
        />

        <BookingDetailSections
          booking={booking}
          room={room}
          organizer={organizer}
        />
        {!isCancelled && !isPast && (
          <BookingDetailActions booking={booking} handleCancel={handleCancel} />
        )}
        {isPast && !isCancelled && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-500">
            <Clock3 size={16} className="text-slate-400" />
            This meeting has already taken place.
          </div>
        )}
      </article>
    </div>
  );
}
