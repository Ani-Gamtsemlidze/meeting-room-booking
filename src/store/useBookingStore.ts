import { create } from "zustand";
import { cancelBooking, createBooking, getBookings, updateBooking } from "../services/bookingsService";
import type { Booking } from "../types";

interface BookingState {
  bookings: Booking[];
  loading: boolean;
  fetchBookings: () => Promise<void>;
  createNewBooking: (data: Omit<Booking, "id" | "status">) => Promise<void>;
  cancelBookingById: (id: string) => Promise<void>;
  updateBookingById: (id: string, data: Omit<Booking, "id" | "status">) => Promise<void>;
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
  cancelBookingById : async(id) => {
    const updatedBookingStatus = await cancelBooking(id)
      set((state) => ({
      bookings: state.bookings.map((booking) => (booking.id === id ? updatedBookingStatus : booking)),
    }));
  },
  updateBookingById: async (id, data) => {
    const updatedBooking = await updateBooking(id, data);
    set((state) => ({
      bookings: state.bookings.map((booking) => (booking.id === id ? updatedBooking : booking)),
    }));
  } 
}));
