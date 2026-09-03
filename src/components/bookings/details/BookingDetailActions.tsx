import { Pencil, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import type { Booking } from "../../../types";

interface BookingDetailActionsProps {
  booking: Booking;
  setShowCancelConfirm: (value: boolean) => void
}

export default function BookingDetailActions({ booking, setShowCancelConfirm}: BookingDetailActionsProps) {
    return (
        <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/50 p-6 sm:flex-row sm:justify-end">
            <Link
              to={`/bookings/${booking.id}/edit`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Pencil size={16} />
              Edit booking
            </Link>

            <button
              type="button"
              onClick={() => setShowCancelConfirm(true) }
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              <XCircle size={16} />
              Cancel booking
            </button>
          </div>
    )
}