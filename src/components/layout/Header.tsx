import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  DoorOpen,
  CalendarClock,
  CalendarDays,
} from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/rooms", label: "Rooms", icon: DoorOpen },
  { to: "/bookings", label: "Bookings", icon: CalendarClock },
  { to: "/schedule", label: "Schedule", icon: CalendarDays },
];

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
  <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
    <NavLink to="/" className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
        <DoorOpen size={19} />
      </div>

      <div className="hidden sm:block">
        <p className="font-bold tracking-tight text-slate-900">
          RoomBook
        </p>
        <p className="text-xs text-slate-400">
          Meeting rooms
        </p>
      </div>
    </NavLink>

    <nav className="flex items-center gap-1">
      {navItems.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            }`
          }
        >
          <Icon size={17} />
          <span className="hidden md:inline">{label}</span>
        </NavLink>
      ))}
    </nav>
  </div>
</header>
  );
}