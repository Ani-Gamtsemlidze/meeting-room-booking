import { Controller, type Control, type FieldErrors } from "react-hook-form";
import type { BookingFormValues, Room } from "../../types";
import RoomOptionCard from "./RoomOptionCard";

interface RoomSelectorProps {
  rooms: Room[];
  control: Control<BookingFormValues>;
  errors: FieldErrors<BookingFormValues>;
}
export default function RoomSelector({
  rooms,
  control,
  errors,
}: RoomSelectorProps) {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">
          Choose a room
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Select a room that fits your meeting and is available at the chosen time.
        </p>
      </div>

      <Controller
        name="roomId"
        control={control}
        rules={{
          required: "Please select a room",
        }}
        render={({ field }) => (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => {
              const available = true;

              return (
                <RoomOptionCard
                  key={room.id}
                  room={room}
                  available={available}
                  selected={field.value === room.id}
                  onSelect={() => field.onChange(room.id)}
                />
              );
            })}
          </div>
        )}
      />

      {errors.roomId && (
        <p className="mt-2 text-xs text-red-600">
          {errors.roomId.message}
        </p>
      )}
    </section>
  );
}