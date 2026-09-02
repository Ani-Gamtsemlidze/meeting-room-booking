type View = "timeGridDay" | "timeGridWeek";

export function MobileViewToggle({
  value,
  onChange,
}: {
  value: View;
  onChange: (view: View) => void;
}) {
  return (
    <div className="mb-3 inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1">
      {(["timeGridDay", "timeGridWeek"] as const).map((view) => (
        <button
          key={view}
          type="button"
          onClick={() => onChange(view)}
          className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
            value === view
              ? "bg-white text-indigo-700 shadow-sm"
              : "text-slate-500"
          }`}
        >
          {view === "timeGridDay" ? "Day" : "Week"}
        </button>
      ))}
    </div>
  );
}