export default function AttendanceTable({ records, loading }) {
  return (
    <div className="w-full bg-white border rounded-lg overflow-hidden">
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Designation</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-left">Entry</th>
              <th className="px-4 py-3 text-left">Exit</th>
              <th className="px-4 py-3 text-left">Worked Hours</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={8}>Loading...</td>
              </tr>
            ) : records.length === 0 ? (
              <tr>
                <td className="px-4 py-12 text-center text-gray-500" colSpan={8}>No records</td>
              </tr>
            ) : (
              records.map((r, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{r.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={r.employee_picture || "https://i.pravatar.cc/60?img=1"} alt={r.name} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <div className="font-medium">{r.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{r.id}</td>
                  <td className="px-4 py-3">{r.designation || "-"}</td>
                  <td className="px-4 py-3">{r.department || "-"}</td>
                  <td className="px-4 py-3">{r.entryTime || "-"}</td>
                  <td className="px-4 py-3">{r.exitTime || "-"}</td>
                  <td className="px-4 py-3 font-semibold">{r.workedHours || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
