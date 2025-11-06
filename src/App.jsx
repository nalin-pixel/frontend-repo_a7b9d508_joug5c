import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Filters from "./components/Filters";
import SummaryCards from "./components/SummaryCards";
import AttendanceTable from "./components/AttendanceTable";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export default function App() {
  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [date, setDate] = useState(todayStr);
  const [department, setDepartment] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const qs = new URLSearchParams({ date, ...(department ? { department } : {}) });
      const res = await fetch(`${BACKEND}/api/attendance?${qs.toString()}`);
      if (!res.ok) throw new Error(`Request failed ${res.status}`);
      const data = await res.json();
      setRecords(data.records || []);
    } catch (e) {
      setError(e.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date, department]);

  const seedEmployees = async () => {
    // Provide a few sample employees to get started
    const sample = [
      {
        id: "E101",
        name: "Alex Johnson",
        designation: "Line Operator",
        department: "Assembly",
        employee_picture_link: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400&auto=format&fit=crop"
      },
      {
        id: "E102",
        name: "Priya Singh",
        designation: "Quality Inspector",
        department: "QA",
        employee_picture_link: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
      },
      {
        id: "E103",
        name: "Marco Rossi",
        designation: "Maintenance Tech",
        department: "Maintenance",
        employee_picture_link: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop"
      }
    ];
    try {
      const res = await fetch(`${BACKEND}/api/employees/seed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sample)
      });
      if (!res.ok) throw new Error("Failed to seed employees");
      await res.json();
      await simulateRFID();
      await fetchData();
      alert("Employees seeded and sample attendance generated");
    } catch (e) {
      alert(e.message || "Seeding failed");
    }
  };

  const simulateRFID = async () => {
    const now = new Date();
    const today = now.toISOString();
    const earlier = new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString();

    // Simulate entry and exit events for two employees
    const events = [
      { id: "E101", scanner_id: "scanner1", timestamp: earlier },
      { id: "E101", scanner_id: "scanner2", timestamp: today },
      { id: "E102", scanner_id: "scanner1", timestamp: earlier },
      { id: "E102", scanner_id: "scanner2", timestamp: today }
    ];

    for (const ev of events) {
      await fetch(`${BACKEND}/api/rfid`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ev)
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header onSeed={seedEmployees} />
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        <Filters date={date} setDate={setDate} department={department} setDepartment={setDepartment} onRefresh={fetchData} />
        <SummaryCards records={records} />
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded">{error}</div>
        )}
        <AttendanceTable records={records} loading={loading} />
      </main>
    </div>
  );
}
