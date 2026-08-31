import { ChevronDown } from "lucide-react";
import type { BookingFormValues, Employee } from "../../types";
import type {  FieldErrors, UseFormRegister } from "react-hook-form";

interface OrganizerSelectorProps {
  organizers: Employee[];
  register: UseFormRegister<BookingFormValues>
  errors: FieldErrors<BookingFormValues>;
}

export default function OrganizerSelect({register, errors, organizers}: OrganizerSelectorProps ) {
    return (
         <section>
          <div className="mb-2">
            <h2 className="text-lg font-bold text-slate-900">
              select the organizer
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Organizer
              </label>

              <div className="relative w-72 max-w-full mt-4">
                <select
                  {...register("organizerId", {
                    required: "Organizer is required",
                  })}
                  className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-10 text-sm text-gray-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10"
                >
                  <option value="">Select organizer</option>

                  {organizers.map((organizer) => (
                    <option key={organizer.id} value={organizer.id}>
                      {organizer.name} · {organizer.department}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
              {errors.organizerId && (
            <p className="mt-1 text-xs text-red-600">{errors.organizerId.message}</p>
          )}
            </div>
          </div>
        </section>
    )
}