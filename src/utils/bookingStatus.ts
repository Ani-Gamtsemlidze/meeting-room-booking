import type { Booking } from "../types";

export type BookingDisplayStatus =
  | "canceled"
  | "completed"
  | "in-progress"
  | "upcoming";

export function getBookingDisplayStatus(booking: Booking): BookingDisplayStatus {
  if (booking.status === "canceled") return "canceled";

  const now = new Date();
  const start = new Date(`${booking.date}T${booking.startTime}`);
  const end = new Date(`${booking.date}T${booking.endTime}`);

  if (now > end) return "completed";
  if (now >= start && now < end) return "in-progress";
  return "upcoming";
}