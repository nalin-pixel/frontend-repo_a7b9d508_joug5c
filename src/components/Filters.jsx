import { useState } from "react";
import { Calendar, Filter } from "lucide-react";

export default function Filters({ date, setDate, department, setDepartment, onRefresh }) {
  const [localDate, setLocalDate] = useState(date);
  const [localDept, setLocalDept] = useState(department);

  const apply = () => {
    setDate(localDate);
    setDepartment(localDept);
    onRefresh?.();
  };

  return (
    <div className="w-full bg-white border rounded-lg p-4 flex flex-wrap items-end gap-3">
      <div className="flex-1 min-w-[200px]">
        <label className="text-sm text-gray-600">Date</label>
        <div className="relative">
          <input
            type="date"
            value={localDate}
            onChange={(e) => setLocalDate(e.target.value)}
            className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Calendar className="absolute right-3 top-3 text-gray-400" size={16} />
        </div>
      </div>
      <div className="flex-1 min-w-[200px]">
        <label className="text-sm text-gray-600">Department</label>
        <input
          type="text"
          placeholder="All"
          value={localDept}
          onChange={(e) => setLocalDept(e.target.value)}
          className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={apply}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        <Filter size={16} /> Apply
      </button>
    </div>
  );
}
