import {
  Accessibility,
  Building2,
  Layers3,
  RefreshCcwDot,
  Users,
} from "lucide-react";

interface RoomsFilterProps {
  capacity: string;
  setCapacity: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  floor: string;
  setFloor: (value: string) => void;
  accessibleOnly: boolean;
  setAccessibleOnly: (value: boolean) => void;
  resetFilters: () => void;
}

export default function RoomsFilter({
  capacity,
  setCapacity,
  type,
  setType,
  floor,
  setFloor,
  accessibleOnly,
  setAccessibleOnly,
  resetFilters,
}: RoomsFilterProps) {
  const selectClasses =
    "h-11 appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-9 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative">
        <Users
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <select
          name="capacity"
          value={capacity}
          className={selectClasses}
          onChange={(e) => setCapacity(e.target.value)}
        >
          <option value="">Any capacity</option>
          <option value="2">2+ people</option>
          <option value="4">4+ people</option>
          <option value="6">6+ people</option>
          <option value="8">8+ people</option>
          <option value="12">12+ people</option>
        </select>
      </div>

      <div className="relative">
        <Building2
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <select
          name="type"
          value={type}
          className={selectClasses}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Room type</option>
          <option value="huddle">Huddle</option>
          <option value="meeting">Meeting</option>
          <option value="conference">Conference</option>
          <option value="training">Training</option>
        </select>
      </div>

      <div className="relative">
        <Layers3
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <select
          name="floor"
          value={floor}
          className={selectClasses}
          onChange={(e) => setFloor(e.target.value)}
        >
          <option value="">Floor</option>
          <option value="1">Floor 1</option>
          <option value="2">Floor 2</option>
          <option value="3">Floor 3</option>
        </select>
      </div>

      <label className="flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-slate-300">
        <Accessibility size={16} className="text-slate-400" />
        <input
          type="checkbox"
          name="accessibility"
          checked={accessibleOnly}
          className="h-4 w-4 accent-blue-600"
          onChange={() => setAccessibleOnly(!accessibleOnly)}
        />
        Accessible
      </label>

      <div className="flex items-center justify-center ml-4">
        <RefreshCcwDot size={16} className="text-slate-400" />
        <button onClick={resetFilters} className="ml-1 cursor-pointer">
          Reset
        </button>
      </div>
    </div>
  );
}
