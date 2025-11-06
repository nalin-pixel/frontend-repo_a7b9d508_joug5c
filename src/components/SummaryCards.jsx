export default function SummaryCards({ records }) {
  const total = records.length;
  const present = records.filter(r => r.entryTime).length;
  const left = records.filter(r => r.exitTime).length;
  const avgMinutes = (() => {
    const mins = records
      .map(r => r.workedHours)
      .filter(Boolean)
      .map(h => {
        const [hh, mm] = h.split(":").map(Number);
        return hh * 60 + mm;
      });
    if (mins.length === 0) return 0;
    const avg = Math.round(mins.reduce((a, b) => a + b, 0) / mins.length);
    return avg;
  })();

  const avgHoursStr = `${String(Math.floor(avgMinutes / 60)).padStart(2, "0")}:${String(avgMinutes % 60).padStart(2, "0")}`;

  const Card = ({ title, value, accent }) => (
    <div className="flex-1 min-w-[160px] bg-white border rounded-lg p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className={`mt-1 text-2xl font-semibold ${accent}`}>{value}</div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <Card title="Total Records" value={total} accent="text-gray-900" />
      <Card title="Present (Entry)" value={present} accent="text-blue-600" />
      <Card title="Checked-out (Exit)" value={left} accent="text-emerald-600" />
      <Card title="Avg Worked Hrs" value={avgHoursStr} accent="text-purple-600" />
    </div>
  );
}
