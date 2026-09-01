import {
  CalendarDays,
  Clock3,
  MapPin,
  Presentation,
  UserRound,
  Users2,
  GraduationCap,
  ChevronRight,
} from "lucide-react";

import type { Booking, Employee, Room } from "../../types";
import { Link } from "react-router-dom";

interface BookingCardProps {
  booking: Booking;
  room?: Room;
  organizer?: Employee;
}

const roomTypeIcons = {
  huddle: Users2,
  meeting: Users2,
  conference: Presentation,
  training: GraduationCap,
};

export default function BookingCard({
  booking,
  room,
  organizer,
}: BookingCardProps) {
  const RoomIcon = room ? roomTypeIcons[room.type] : Users2;
  const isCancelled = booking.status === "cancelled";

  return (
    <Link
      to={`/bookings/${booking.id}`}
      className="block"
    >
      <article className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
              <RoomIcon size={22} />
            </div>

            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    isCancelled
                      ? "bg-red-50 text-red-700"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isCancelled ? "bg-red-500" : "bg-emerald-500"
                    }`}
                  />

                  {isCancelled ? "Cancelled" : "Confirmed"}
                </span>

                {room && (
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-600">
                    {room.type}
                  </span>
                )}
              </div>

              <h3 className="truncate text-lg font-bold text-slate-900">
                {booking.title}
              </h3>

              {booking.description && (
                <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">
                  {booking.description}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <CalendarDays size={17} className="shrink-0 text-slate-400" />
            <span>{booking.date}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock3 size={17} className="shrink-0 text-slate-400" />
            <span>
              {booking.startTime} – {booking.endTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={17} className="shrink-0 text-slate-400" />
            <span className="truncate">
              {room?.name ?? "Unknown room"}
              {room && ` · Floor ${room.floor}`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <UserRound size={17} className="shrink-0 text-slate-400" />
            <span className="truncate">
              {organizer?.name ?? "Unknown organizer"}
            </span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          {room ? (
            <span className="text-xs font-medium text-slate-400">
              Capacity {room.capacity}
            </span>
          ) : (
            <span />
          )}

          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-700">
            View details
            <ChevronRight size={16} />
          </span>
        </div>
      </article>
    </Link>
  );
}
