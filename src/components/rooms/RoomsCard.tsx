import {
  Accessibility,
  ChevronRight,
  GraduationCap,
  MapPin,
  Presentation,
  Users,
  Users2,
} from "lucide-react";
import type { Room } from "../../types";

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const roomTypeIcons = {
    huddle: Users,
    meeting: Users2,
    conference: Presentation,
    training: GraduationCap,
  } as const;
  const RoomIcon = roomTypeIcons[room.type];
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50">
          <RoomIcon size={24} className="text-blue-600" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-950">{room.name}</h2>

          <p className="mt-1 text-sm text-slate-500">{room.type}</p>
        </div>
      </div>

      <div className="mt-7 flex items-center gap-4 text-slate-600">
        <div className="flex items-center gap-2">
          <Users2 size={17} className="text-slate-500" />
          <span className="text-sm font-medium text-slate-700">
            {room.capacity} people
          </span>
        </div>

        <span className="text-slate-400">•</span>

        <div className="flex items-center gap-2">
          <MapPin size={17} className="text-slate-500" />
          <span className="text-sm font-medium text-slate-700">
            {room.floor} Floor
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {room.amenities.map((amenity) => (
          <div
            key={amenity}
            className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
          >
            <span>{amenity}</span>
          </div>
        ))}
      </div>

      {room.isAccessible && (
        <div className="flex items-center gap-1.5 text-sm mt-2 text-slate-600">
          <Accessibility size={16} />
          <span className="">Accessible</span>
        </div>
      )}

      <div className="mt-6 border-t border-slate-200 pt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-600">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-sm font-medium">Available now</span>
          </div>

          <button
            type="button"
            className="flex items-center gap-1 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            View availability
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
