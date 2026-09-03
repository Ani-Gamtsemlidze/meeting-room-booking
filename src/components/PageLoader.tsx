import { LoaderCircle } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <LoaderCircle className="h-6 w-6 animate-spin text-indigo-600" />
    </div>
  );
}