import { useEffect } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

import { useBookingStore } from "../store/useBookingStore";
import { useRoomStore } from "../store/useRoomStore";
import { useEmployeesStore } from "../store/useEmployeesStore";

import BookingList from "../components/bookings/BookingList";
import SearchInput from "../components/SearchInput";
import { useBookingFilter } from "../hooks/useBookingFilter";
import BookingsFilter from "../components/bookings/BookingsFilter";
import LoadingState from "../components/LoadingState";

export default function Bookings() {
   const bookings = useBookingStore((state) => state.bookings);
  const fetchBookings = useBookingStore((state) => state.fetchBookings);
  const bookingsLoading = useBookingStore((state) => state.loading);

  const rooms = useRoomStore((state) => state.rooms);
  const fetchRooms = useRoomStore((state) => state.fetchRooms);
  const roomsLoading = useRoomStore((state) => state.loading);

  const employees = useEmployeesStore((state) => state.employees);
  const fetchEmployees = useEmployeesStore((state) => state.fetchEmployees);
  const employeesLoading = useEmployeesStore((state) => state.loading);

  const isLoading = bookingsLoading || roomsLoading || employeesLoading;

  const filters = useBookingFilter(bookings);

  useEffect(() => {
    fetchBookings();
    fetchRooms();
    fetchEmployees();
  }, [fetchBookings, fetchRooms, fetchEmployees]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Bookings
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            View and manage meeting room bookings.
          </p>
        </div>

        <Link
          to="/bookings/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-800"
        >
          <Plus size={18} />
          New booking
        </Link>
      </div>
      <div className="flex flex-col gap-3 lg:flex-row  mb-4">
        <div className="w-full lg:max-w-md">
          <SearchInput
            value={filters.search}
            onChange={filters.setSearch}
            placeholder="Search bookings"
          />
        </div>
        <BookingsFilter {...filters} rooms={rooms} />
      </div>
      <LoadingState loading={isLoading} >

      <BookingList
        bookings={filters.filteredBookings}
        rooms={rooms}
        employees={employees}
      />

      </LoadingState>

    </div>
  );
}
