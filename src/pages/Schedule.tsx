import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/monarch/theme.css";
import "@fullcalendar/react/themes/monarch/palettes/purple.css";
import "../styles/fullcalendar.css";
import { useBookingStore } from "../store/useBookingStore";
import { useEffect } from "react";
import { useRoomStore } from "../store/useRoomStore";
import { roomColor } from "../utils/roomColors";
import { MobileViewToggle } from "../components/schedule/MobileViewToggle";
import { useResponsiveCalendarView } from "../utils/useResponsiveCalendar";
import ScheduleCalendar from "../components/schedule/ScheduleCalendar";
import { bookingToEvent } from "../utils/bookingEvent";

export default function Schedule() {
  const bookings = useBookingStore((state) => state.bookings);
  const rooms = useRoomStore((state) => state.rooms);
  const fetchRooms = useRoomStore((state) => state.fetchRooms);
  const fetchBookings = useBookingStore((state) => state.fetchBookings);

  const { calendarRef, isMobile, mobileView, changeMobileView } =
    useResponsiveCalendarView();

  useEffect(() => {
    fetchBookings();
    fetchRooms();
  }, [fetchBookings, fetchRooms]);

  const events = bookings
    .filter((booking) => booking.status !== "cancelled")
    .map((booking) => bookingToEvent(booking, rooms));

  const isMobileWeek = isMobile && mobileView === "timeGridWeek";

  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Schedule
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            View meeting room bookings by day or week.
          </p>
        </div>

        {rooms.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {rooms.map((room) => (
              <div key={room.id} className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: roomColor(room) }}
                />
                <span className="text-xs font-medium text-slate-600">
                  {room.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {isMobile && (
        <MobileViewToggle value={mobileView} onChange={changeMobileView} />
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:p-4">
        <div
          className={
            isMobileWeek ? "max-h-[75vh] overflow-y-auto overflow-x-auto" : ""
          }
        >
          <div className={isMobileWeek ? "min-w-[640px]" : ""}>
            <ScheduleCalendar
              events={events}
              calendarRef={calendarRef}
              isMobile={isMobile}
              mobileView={mobileView}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
