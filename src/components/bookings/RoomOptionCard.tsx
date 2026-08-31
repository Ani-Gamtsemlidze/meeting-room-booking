import {
  GraduationCap,
  Monitor,
  PenSquare,
  Presentation,
  Users,
  Users2,
  Video,
} from "lucide-react";
import type { Room, RoomAmenity } from "../../types";

const roomTypeIcons = {
  huddle: Users,
  meeting: Users2,
  conference: Presentation,
  training: GraduationCap,
} as const;

interface RoomOptionCardProps {
  room: Room;
  selected: boolean;
  available: boolean;
  onSelect: () => void;
}

const amenityIcons: Record<
  RoomAmenity,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  projector: Presentation,
  whiteboard: PenSquare,
  "video-conference": Video,
  "tv-screen": Monitor,
};

const amenityLabels: Record<RoomAmenity, string> = {
  projector: "Projector",
  whiteboard: "Whiteboard",
  "video-conference": "Video conference",
  "tv-screen": "TV screen",
};

export default function RoomOptionCard({
  room,
  selected,
  available,
  onSelect,
}: RoomOptionCardProps) {
  const RoomIcon = roomTypeIcons[room.type];

  return (
    <button
      type="button"
      disabled={!available}
      onClick={onSelect}
      className={`rounded-xl border p-4 text-left transition ${
        selected
          ? "border-indigo-500 bg-indigo-300/10 ring-2 ring-indigo-500/10"
          : "border-slate-200"
      } ${available ? "hover:border-slate-400" : "cursor-not-allowed bg-slate-50 opacity-70"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50">
            <RoomIcon size={18} className="text-indigo-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">{room.name}</h3>
            <p className="mt-1 text-sm text-slate-500">
              Floor {room.floor} · Up to {room.capacity} people
            </p>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${
            available ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {available ? "Available" : "Booked"}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {room.amenities.map((amenity) => {
          const AmenityIcon = amenityIcons[amenity];
          return (
            <span
              key={amenity}
              className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600"
            >
              <AmenityIcon size={12} aria-hidden="true" />
              {amenityLabels[amenity]}
            </span>
          );
        })}
      </div>
    </button>
  );
}
