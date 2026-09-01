import { useNavigate, useParams } from "react-router-dom";
import BookingForm from "../components/bookings/BookingForm";
import { useRoomStore } from "../store/useRoomStore";
import { useEmployeesStore } from "../store/useEmployeesStore";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useBookingStore } from "../store/useBookingStore";
import { calculateDuration, calculateEndTime } from "../utils/bookingTime";
import type { BookingFormValues } from "../types";
import { toast } from "sonner";

export default function EditBooking() {
  const { id } = useParams();

  const { bookings, fetchBookings, updateBookingById } = useBookingStore();
  const { employees, fetchEmployees } = useEmployeesStore();
  const {rooms, fetchRooms} = useRoomStore()

  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
    fetchEmployees();
    fetchRooms();
  }, [fetchBookings, fetchEmployees, fetchRooms]);

  const foundBooking  = bookings.find((booking) => booking.id === id);
  const booking = foundBooking;

  if (!booking) {
  return <p className="p-8 text-slate-500">Booking not found.</p>;
}
  const defaultValues: BookingFormValues  = {
    title: booking.title,
    description: booking?.description ?? "",
    date: booking?.date,
    startTime: booking?.startTime ,
    duration: booking ? calculateDuration(booking.startTime, booking.endTime) : 0,
    roomId: booking?.roomId,
    organizerId: booking?.organizerId,
  };

const bookableRooms = rooms.filter(
    (room) => room.status === "active" || room.id === booking?.roomId
  );

  async function handleUpdateBooking(data: BookingFormValues) {
    try {
      await updateBookingById(booking!.id, {
        title: data.title,
        description: data.description || undefined,
        date: data.date,
        startTime: data.startTime,
        endTime: calculateEndTime(data.startTime, data.duration),
        roomId: data.roomId,
        organizerId: data.organizerId,
      });
      toast.success("Booking updated");
      navigate(`/bookings/${booking?.id}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    }
  }

  return (
   <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <button
          type="button"
          onClick={() => navigate("/bookings")}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={18} />
          Back to bookings
        </button>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Edit booking
        </h1>

        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Schedule a meeting and choose the room that works best for your team.
        </p>
      </div>

     <BookingForm
        rooms={bookableRooms}
        organizers={employees}
        submit={handleUpdateBooking}
        defaultValues={defaultValues}
      />
    </div>
  );
}
