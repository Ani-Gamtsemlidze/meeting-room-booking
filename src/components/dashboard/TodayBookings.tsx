import { Link } from "react-router-dom";
import type { Booking, Room } from "../../types";
import { getBookingDisplayStatus } from "../../utils/bookingStatus";

type TodayBookingsProps = {
  bookings: Booking[];
  rooms: Room[];
};

export default function TodayBookings({ bookings, rooms }: TodayBookingsProps) {
  const todayBookings = bookings
    .filter((booking) => {
      const today = new Date();
      const bookingDate = new Date(booking.date);
      return bookingDate.toDateString() === today.toDateString();
    })
    .sort((a, b) => {
      const aStart = new Date(`${a.date}T${a.startTime}`);
      const bStart = new Date(`${b.date}T${b.startTime}`);
      return aStart.getTime() - bStart.getTime();
    });
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Today's bookings</h2>
          <p className="text-sm text-slate-500">
            Meetings scheduled for today.
          </p>
        </div>

        <Link
          to="/schedule"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        >
          View schedule
        </Link>
      </div>
      {todayBookings.length === 0 ? (
        <p className="py-6 text-center text-sm text-slate-400">
          No bookings scheduled for today.
        </p>
      ) : (
        <div className="space-y-3 overflow-y-auto max-h-[420px]">
          {todayBookings.map((booking) => {
            const status = getBookingDisplayStatus(booking);
            const room = rooms.find((room) => room.id === booking.roomId);

            return (
              <Link
                key={booking.id}
                to={`/bookings/${booking.id}`}
                className="flex flex-col gap-3 rounded-xl border border-slate-100 p-3 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between sm:p-4"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div className="w-14 shrink-0 sm:w-24">
                    <p className="text-sm font-semibold text-slate-900">
                      {booking.startTime}
                    </p>

                    <p className="text-xs text-slate-500">{booking.endTime}</p>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="break-words text-sm font-semibold text-slate-900 sm:truncate sm:text-base">
                      {booking.title}
                    </p>

                    <p className="text-xs text-slate-500 sm:text-sm">
                      {room?.name ?? "Unknown room"}
                    </p>
                  </div>
                </div>

                <div
                  className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                    status === "completed"
                      ? "bg-slate-100 text-slate-600"
                      : status === "in-progress"
                        ? "bg-emerald-100 text-emerald-700"
                        : status === "upcoming"
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-red-100 text-red-700"
                  }`}
                >
                  <span
                    className={`mr-2 h-2 w-2 rounded-full ${
                      status === "completed"
                        ? "bg-slate-400"
                        : status === "in-progress"
                          ? "bg-emerald-500"
                          : status === "upcoming"
                            ? "bg-indigo-500"
                            : "bg-red-500"
                    }`}
                  />

                  {status === "in-progress"
                    ? "In progress"
                    : status === "upcoming"
                      ? "Upcoming"
                      : status === "completed"
                        ? "Completed"
                        : "Canceled"}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
