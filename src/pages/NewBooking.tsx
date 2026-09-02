import { useEffect } from "react";
import BookingForm from "../components/bookings/BookingForm";
import { useRoomStore } from "../store/useRoomStore";
import { useEmployeesStore } from "../store/useEmployeesStore";
import { useNavigate } from "react-router-dom";
import { useBookingStore } from "../store/useBookingStore";
import type { BookingFormValues } from "../types";
import { calculateEndTime } from "../utils/bookingTime";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { isWithinOfficeHours } from "../utils/officeHours";

export default function NewBooking() {
  const { rooms, fetchRooms } = useRoomStore();
  const { employees, fetchEmployees } = useEmployeesStore();
  const { createNewBooking } = useBookingStore();

  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
    fetchEmployees();
  }, [fetchRooms, fetchEmployees]);

  const bookableRooms = rooms.filter((room) => room.status === "active");

  const handleCreate = async (data: BookingFormValues) => {
    const endTime = calculateEndTime(data.startTime, data.duration);
     if (!isWithinOfficeHours(data.startTime, endTime)) {
    toast.error("Bookings must be between 09:00 AM and 18:00 PM.");
    return;
  }

    try {
      await createNewBooking({
        title: data.title,
        description: data.description || undefined,
        date: data.date,
        startTime: data.startTime,
        endTime,
        roomId: data.roomId,
        organizerId: data.organizerId,
      });
      toast.success("Booking created");
      navigate("/bookings");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    }
  };

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
          Create booking
        </h1>

        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Schedule a meeting and choose the room that works best for your team.
        </p>
      </div>

      <BookingForm
        rooms={bookableRooms}
        organizers={employees}
        submit={handleCreate}
      />
    </div>
  );
}
