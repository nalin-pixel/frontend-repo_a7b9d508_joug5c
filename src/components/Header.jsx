import { Factory, Users } from "lucide-react";

export default function Header({ onSeed }) {
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-600 text-white">
            <Factory size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold leading-tight">Factory Attendance Dashboard</h1>
            <p className="text-xs text-gray-500">Track daily presence and hours</p>
          </div>
        </div>
        <button
          onClick={onSeed}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition"
        >
          <Users size={16} />
          Seed Sample Employees
        </button>
      </div>
    </header>
  );
}
