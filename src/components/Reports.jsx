import '../css/Reports.css';

const stats = [
  { label: "Total trips", value: "12", change: "+3 vs last month", up: true },
  { label: "Total miles", value: "5,430", change: "+12%", up: true },
  { label: "Drive hours", value: "80h 15m", change: "Avg 6.7h / trip", up: true },
  { label: "Violations", value: "2", change: "-1 vs last month", up: false, danger: true },
];

const barData = [
  { month: "Dec", pct: 42 },
  { month: "Jan", pct: 60 },
  { month: "Feb", pct: 50 },
  { month: "Mar", pct: 76 },
  { month: "Apr", pct: 64 },
  { month: "May", pct: 100, current: true },
];

const pieSegments = [
  { label: "Completed", count: 7, color: "#60a5fa", dash: 49, offset: 0 },
  { label: "Planned", count: 3, color: "#4ade80", dash: 22, offset: -49 },
  { label: "In progress", count: 2, color: "#f87171", dash: 11, offset: -71 },
];

const hosData = [
  { name: "John Driver", used: 42, total: 70, color: "#60a5fa" },
  { name: "Maria Lopez", used: 62, total: 70, color: "#f87171" },
  { name: "James Kim", used: 22, total: 70, color: "#4ade80" },
];

export default function Reports() {
  return (
    <div className="reports-page">
      <div className="reports-topbar">
        <h1 className="reports-title">Reports</h1>
        <button className="btn-export">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export PDF
        </button>
      </div>

      <div className="reports-stats">
        {stats.map(s => (
          <div className="stat-card" key={s.label}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={s.danger ? { color: "#dc2626" } : {}}>{s.value}</div>
            <div className="stat-change" style={{ color: s.danger ? "#dc2626" : s.up ? "#16a34a" : "#64748b" }}>{s.change}</div>
          </div>
        ))}
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-title">Miles driven — last 6 months</div>
          <div className="bar-chart">
            {barData.map(b => (
              <div key={b.month} className="bar-col">
                <div className="bar-outer">
                  <div
                    className="bar-inner"
                    style={{ height: `${b.pct}%`, background: b.current ? "#2563eb" : "#93c5fd" }}
                  />
                </div>
                <span className={`bar-label ${b.current ? "bar-label-active" : ""}`}>{b.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-title">Trip status breakdown</div>
          <div className="pie-wrap">
            <svg width="100" height="100" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="6"/>
              {pieSegments.map((seg, i) => (
                <circle
                  key={i}
                  cx="18" cy="18" r="14"
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="6"
                  strokeDasharray={`${seg.dash} ${88 - seg.dash}`}
                  strokeDashoffset={seg.offset}
                  transform="rotate(-90 18 18)"
                />
              ))}
            </svg>
            <div className="pie-legend">
              {pieSegments.map(seg => (
                <div key={seg.label} className="pie-legend-item">
                  <div className="pie-dot" style={{ background: seg.color }} />
                  <span>{seg.label} — {seg.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hos-card">
        <div className="hos-header"><span className="card-title">HOS utilization by driver</span></div>
        <div className="hos-list">
          {hosData.map(h => (
            <div key={h.name} className="hos-row">
              <div className="hos-info">
                <span className="hos-name">{h.name}</span>
                <span className="hos-val">{h.used}h / {h.total}h cycle</span>
              </div>
              <div className="hos-track">
                <div className="hos-fill" style={{ width: `${(h.used / h.total) * 100}%`, background: h.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
