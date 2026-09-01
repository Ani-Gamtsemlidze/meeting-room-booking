import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

function App() {
  return (
    <main className="min-h-screen bg-indigo-300/10  text-slate-900">
      <Outlet />
      <Toaster position="top-center" richColors />
    </main>
  );
}

export default App;
