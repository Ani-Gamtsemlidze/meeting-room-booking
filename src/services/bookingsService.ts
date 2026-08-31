import bookingsData from "../data/bookings.json";
import type { Booking } from "../types";

function loadBookings(): Booking[] {
  const cached = localStorage.getItem("bookings");
  if (cached) {
    return JSON.parse(cached);
  }
  localStorage.setItem("bookings", JSON.stringify(bookingsData));
  return bookingsData as Booking[];
}

function saveBookings(bookings: Booking[]): void {
  localStorage.setItem("bookings", JSON.stringify(bookings));
}

function timesOverlap(startA: string, endA: string, startB: string, endB: string): boolean {
  return startA < endB && startB < endA;
}

function hasConflict(
  newBooking: { roomId: string; date: string; startTime: string; endTime: string },
  existingBookings: Booking[],
  excludeId?: string
): boolean {
  return existingBookings.some((booking) => {
    if (booking.id === excludeId) return false;
    if (booking.status === "cancelled") return false;
    if (booking.roomId !== newBooking.roomId) return false;
    if (booking.date !== newBooking.date) return false;
    return timesOverlap(newBooking.startTime, newBooking.endTime, booking.startTime, booking.endTime);
  });
}

export async function getBookings(): Promise<Booking[]> {
  return loadBookings();
}

export async function createBooking(
  data: Omit<Booking, "id" | "status">
): Promise<Booking> {
  const bookings = loadBookings();

  if (hasConflict(data, bookings)) {
    throw new Error("This room is already booked for the selected time.");
  }

  const newBooking: Booking = {
    ...data,
    id: `booking-${Date.now()}`,
    status: "confirmed",
  };

  bookings.push(newBooking);
  saveBookings(bookings);
  return newBooking;
}