import type { Booking, Room } from "../../../types";

interface BookingDetailHeaderProps {
  booking: Booking;
  room?: Room;
  isCanceled: boolean;
}
export default function BookingDetailHeader({ isCanceled, room, booking }: BookingDetailHeaderProps) {
    return (
          <div className="border-b border-slate-100 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    isCanceled
                      ? "bg-red-50 text-red-700"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isCanceled ? "bg-red-500" : "bg-emerald-500"
                    }`}
                  />

                  {isCanceled ? "Canceled" : "Confirmed"}
                </span>

                {room && (
                  <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium capitalize text-indigo-700">
                    {room.type}
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {booking.title}
              </h1>

              {booking.description && (
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                  {booking.description}
                </p>
              )}
            </div>
          </div>
        </div>
    )

}