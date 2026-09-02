import { useEffect, useRef, useState, type ComponentRef } from "react";
import FullCalendar from "@fullcalendar/react";

const MOBILE_BREAKPOINT = 768;

export function useResponsiveCalendarView() {
  const calendarRef = useRef<ComponentRef<typeof FullCalendar>>(null);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < MOBILE_BREAKPOINT,
  );
  const [mobileView, setMobileView] = useState<"timeGridDay" | "timeGridWeek">(
    "timeGridDay",
  );

  const isMobileRef = useRef(isMobile);
  const mobileViewRef = useRef(mobileView);

  useEffect(() => {
    isMobileRef.current = isMobile;
  }, [isMobile]);

  useEffect(() => {
    mobileViewRef.current = mobileView;
  }, [mobileView]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      if (isMobileRef.current !== mobile) {
        const api = calendarRef.current?.getApi();
        api?.changeView(mobile ? mobileViewRef.current : "timeGridWeek");
      }

      setIsMobile(mobile);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const changeMobileView = (view: "timeGridDay" | "timeGridWeek") => {
    setMobileView(view);
    calendarRef.current?.getApi()?.changeView(view);
  };

  return { calendarRef, isMobile, mobileView, changeMobileView };
}
