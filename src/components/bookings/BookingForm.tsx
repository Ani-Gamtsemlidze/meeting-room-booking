import { useForm } from "react-hook-form";
import type { BookingFormValues, Employee, Room } from "../../types";
import { Calendar1 } from "lucide-react";
import BookingDetailsFields from "./BookingDetailsFields";
import BookingDateTimeFields from "./BookingDateTimeFields";
import OrganizerSelect from "./OrganizerSelect";
import RoomSelector from "./RoomSelector";

interface BookingFormProps {
  rooms: Room[];
  organizers: Employee[];
  submit: (data: BookingFormValues) => void;
}

export default function BookingForm({
  rooms,
  organizers,
  submit,
}: BookingFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BookingFormValues>();

  const onSubmit = (data: BookingFormValues) => {
    submit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="    rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="space-y-8">
        <BookingDetailsFields register={register} errors={errors} />

        <div className="border-t border-gray-100" />

        <BookingDateTimeFields register={register} errors={errors} />

        <div className="border-t border-gray-100" />

        <OrganizerSelect
          register={register}
          errors={errors}
          organizers={organizers}
        />

        <RoomSelector rooms={rooms} control={control} errors={errors} />

        <div className="flex flex-col border-t border-gray-100 pt-6 sm:flex-row sm:justify-between">
          <button
            type="button"
            className="rounded-lg border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <div className="flex justify-end gap-3">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-700 px-5 py-2.5 font-semibold text-white transition hover:bg-indigo-800"
            >
              <Calendar1 size={18} />
              Create booking
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
