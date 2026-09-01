import { ChevronDown } from "lucide-react";
import type { BookingFormFieldProps } from "./types";

export default function BookingDateTimeFields({
  register,
  errors,
}: BookingFormFieldProps) {
  const inputClasses =
    "mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10";
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">Date & time</h2>

        <p className="mt-1 text-sm text-slate-500">
          Choose when your meeting will take place.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="text-sm font-medium text-slate-700">Date</label>

          <input
            type="date"
            {...register("date", {
              required: "Date is required",
            })}
            className={inputClasses}
          />
          {errors.date && (
            <p className="mt-1 text-xs text-red-600">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Start time
          </label>

          <input
            type="time"
            {...register("startTime", {
              required: "Start Time is required",
            })}
            className={inputClasses}
          />
          {errors.startTime && (
            <p className="mt-1 text-xs text-red-600">
              {errors.startTime.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Duration</label>

          <div className="relative w-48 max-w-full mt-1.5">
            <select
              {...register("duration", {
                valueAsNumber: true,
                required: "Duration is required",
              })}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-10 text-sm text-gray-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10"
            >
              <option value="">Select Duration</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={90}>1.5 hours</option>
              <option value={120}>2 hours</option>
              <option value={150}>2.5 hours</option>
              <option value={180}>3 hours</option>
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
          {errors.duration && (
            <p className="mt-1 text-xs text-red-600">
              {errors.duration.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
