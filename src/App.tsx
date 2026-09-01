import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./components/layout/Header";

function App() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Toaster position="top-center" richColors />
    </main>
  );
}

export default App;
