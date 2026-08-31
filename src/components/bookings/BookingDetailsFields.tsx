import type { BookingFormFieldProps } from "./types";

export default function BookingDetailsFields({
  register,
  errors,
}: BookingFormFieldProps) {
  const inputClasses =
    "mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10";
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">Meeting details</h2>

        <p className="mt-1 text-sm text-slate-500">
          Add the basic information about your meeting.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="title" className="text-sm font-medium text-slate-700">
            Meeting title
          </label>

          <input
            id="title"
            {...register("title", {
              required: "Meeting title is required",
            })}
            placeholder="e.g. Sprint planning"
            className={inputClasses}
          />

          {errors.title && (
            <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="text-sm font-medium text-slate-700"
          >
            Description
            <span className="ml-1 font-normal text-slate-400">(optional)</span>
          </label>

          <textarea
            id="description"
            rows={4}
            {...register("description")}
            placeholder="Add any extra details about your meeting..."
            className={inputClasses}
          />
        </div>
      </div>
    </section>
  );
}
