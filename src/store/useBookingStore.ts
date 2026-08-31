import { create } from "zustand";
import { getBookings } from "../services/bookingsService";
import type { Booking } from "../types";

interface BookingState {
    bookings: Booking[],
    loading: boolean,
    fetchBookings: () => Promise<void>
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  loading: true,
  fetchBookings: async () => {
    const data = await getBookings();
    set({ bookings: data, loading: false });
  },
}));
