import bookingsData from "../data/bookings.json";
import type { Booking } from "../types";
export async function getBookings() {
  const cached = localStorage.getItem("bookings");

  if (cached) {
    return JSON.parse(cached);
  }
  localStorage.setItem("bookings", JSON.stringify(bookingsData));
  return bookingsData as Booking[];
}
