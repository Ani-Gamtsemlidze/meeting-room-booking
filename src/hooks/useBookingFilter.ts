import type { Booking } from "../types";
import { useSearchParams } from "react-router-dom";
import { getBookingDisplayStatus } from "../utils/bookingStatus";

export function useBookingFilter(bookings: Booking[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const roomFilter = searchParams.get("room");
  const dateFilter = searchParams.get("date") ?? "upcoming";
  const statusFilter = searchParams.get("status") || "";

  function setSearch(value: string) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) {
        next.set("search", value);
      } else {
        next.delete("search");
      }
      return next;
    });
  }

  function setRoomFilter(value: string) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (value) {
        next.set("room", value);
      } else {
        next.delete("room");
      }

      return next;
    });
  }

  function setDateFilter(value: string) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (value) {
        next.set("date", value);
      } else {
        next.delete("date");
      }

      return next;
    });
  }

  function setStatusFilter(value: string) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (value) {
        next.set("status", value);
      } else {
        next.delete("status");
      }

      return next;
    });
  }

  const now = new Date();
  const normalizedSearch = search.toLowerCase();

  const filteredBookings = bookings.filter((booking) => {
    const findSearch =
      booking.title.toLowerCase().includes(normalizedSearch) ||
      booking.description?.toLowerCase().includes(normalizedSearch);
    if (search && !findSearch) {
      return false;
    }

    if (roomFilter && booking.roomId !== roomFilter) {
      return false;
    }

    const bookingDateTime = new Date(`${booking.date}T${booking.startTime}`);

    if (dateFilter === "upcoming" && bookingDateTime < now) {
      return false;
    }

    if (dateFilter === "past" && bookingDateTime >= now) {
      return false;
    }
    if (
      dateFilter === "inprogress" &&
      getBookingDisplayStatus(booking) !== "in-progress"
    ) {
      return false;
    }
    if (statusFilter && booking.status !== statusFilter) {
      return false;
    }

    return true;
  });

  function resetBookingFilter() {
    setSearchParams({});
  }

  return {
    search,
    setSearch,
    filteredBookings,
    setRoomFilter,
    roomFilter,
    setDateFilter,
    dateFilter,
    statusFilter,
    setStatusFilter,
    resetBookingFilter,
  };
}
