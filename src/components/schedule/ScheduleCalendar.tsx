import FullCalendar, { type CalendarRef } from "@fullcalendar/react";
import themePlugin from "@fullcalendar/react/themes/monarch";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import { useNavigate } from "react-router-dom";
import type { bookingToEvent } from "../../utils/bookingEvent";

type Props = {
  calendarRef: React.RefObject<CalendarRef | null>;
  isMobile: boolean;
  mobileView: "timeGridDay" | "timeGridWeek";
  events: ReturnType<typeof bookingToEvent>[];
};
export default function ScheduleCalendar({
  calendarRef,
  isMobile,
  mobileView,
  events,
}: Props) {
  const navigate = useNavigate();
  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[themePlugin, timeGridPlugin]}
      initialView={isMobile ? mobileView : "timeGridWeek"}
      headerToolbar={
        isMobile
          ? { left: "prev,next", center: "title", right: "today" }
          : {
              left: "prev,next today",
              center: "title",
              right: "timeGridDay,timeGridWeek",
            }
      }
      titleFormat={
        isMobile
          ? { month: "short", day: "numeric" }
          : { month: "long", day: "numeric", year: "numeric" }
      }
      eventDidMount={(info) => {
        const color = info.event.extendedProps.color;
        if (color) {
          info.el.style.setProperty("background-color", color, "important");
          info.el.style.setProperty("border-color", color, "important");
        }
      }}
      allDaySlot={false}
      slotMinTime="09:00:00"
      slotMaxTime="19:00:00"
      expandRows
      slotEventOverlap={false}
      height="auto"
      contentHeight="auto"
      events={events}
      eventContent={(arg) => (
        <div className="h-full w-full min-w-0 overflow-hidden px-1.5 py-1">
          <div className="truncate text-[10px] font-semibold uppercase tracking-wide text-white/90">
            {arg.event.extendedProps.roomName}
          </div>
          <div className="truncate text-xs font-semibold leading-tight text-white">
            {arg.event.title}
          </div>
          <div className="hidden text-[10px] text-white/70 sm:block">
            {arg.timeText}
          </div>
        </div>
      )}
      eventClick={(info) => {
        navigate(`/bookings/${info.event.id}`, {
          state: { from: "/schedule" },
        });
      }}
    />
  );
}
