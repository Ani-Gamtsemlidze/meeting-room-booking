import { CalendarDays, Clock3, MapPin, UserRound, Users2 } from "lucide-react";
import type { Booking, Employee, Room } from "../../../types";

interface BookingDetailSectionsProps  {
  booking: Booking;
  room?: Room;
  organizer?: Employee;
}

export default function BookingDetailSections({
  booking,
  room,
  organizer,
}: BookingDetailSectionsProps) {
  return (
    <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-2">
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Schedule
        </h2>

        <div className="mt-4 space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
              <CalendarDays size={18} className="text-slate-600" />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400">Date</p>

              <p className="mt-0.5 font-medium text-slate-800">
                {booking.date}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
              <Clock3 size={18} className="text-slate-600" />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400">Time</p>

              <p className="mt-0.5 font-medium text-slate-800">
                {booking.startTime} – {booking.endTime}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Room
        </h2>

        <div className="mt-4 space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
              <MapPin size={18} className="text-indigo-700" />
            </div>

            <div>
              <p className="font-semibold text-slate-900">
                {room?.name ?? "Unknown room"}
              </p>

              {room && (
                <p className="mt-1 text-sm text-slate-500">
                  Floor {room.floor}
                </p>
              )}
            </div>
          </div>

          {room && (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                <Users2 size={18} className="text-slate-600" />
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">Capacity</p>

                <p className="mt-0.5 font-medium text-slate-800">
                  Up to {room.capacity} people
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="md:col-span-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Organizer
        </h2>

        <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-50 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
            <UserRound size={19} className="text-slate-600" />
          </div>

          <div>
            <p className="font-semibold text-slate-900">
              {organizer?.name ?? "Unknown organizer"}
            </p>

            {organizer && (
              <p className="mt-0.5 text-sm text-slate-500">
                {organizer.department} · {organizer.email}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
