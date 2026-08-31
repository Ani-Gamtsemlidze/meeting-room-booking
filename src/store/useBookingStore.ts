import { create } from "zustand";
import { createBooking, getBookings } from "../services/bookingsService";
import type { Booking } from "../types";

interface BookingState {
  bookings: Booking[];
  loading: boolean;
  fetchBookings: () => Promise<void>;
  createNewBooking: (data: Omit<Booking, "id" | "status">) => Promise<void>;
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  loading: true,
  fetchBookings: async () => {
    const data = await getBookings();
    set({ bookings: data, loading: false });
  },
  createNewBooking: async (data) => {
    const newBooking = await createBooking(data);
    set((state) => ({ bookings: [...state.bookings, newBooking] }));
  },
}));
