import { AlertTriangle } from "lucide-react";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  confirmVariant?: "danger" | "default";
  onConfirm: () => void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel,
  confirmVariant = "default",
  onConfirm,
  onCancel,
  isSubmitting = false,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex items-start gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
              confirmVariant === "danger"
                ? "bg-red-50 text-red-600"
                : "bg-amber-50 text-amber-600"
            }`}
          >
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{title}</h3>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
          >
            Go back
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition disabled:opacity-50 ${
              confirmVariant === "danger"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isSubmitting ? "Please wait..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}