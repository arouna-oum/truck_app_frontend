import '../css/Drivers.css';

const drivers = [
  { initials: "JD", name: "John Driver", cdl: "CDL-A · TX-4821", status: "On duty", statusClass: "status-on", dotClass: "dot-on", driveUsed: 6.5, driveMax: 11, cycleLeft: 47.75, cycleMax: 70, driveColor: "#60a5fa", cycleColor: "#4ade80" },
  { initials: "ML", name: "Maria Lopez", cdl: "CDL-A · GA-9034", status: "Resting", statusClass: "status-rest", dotClass: "dot-rest", driveUsed: 11, driveMax: 11, cycleLeft: 38, cycleMax: 70, driveColor: "#f87171", cycleColor: "#4ade80" },
  { initials: "JK", name: "James Kim", cdl: "CDL-A · CO-2210", status: "Off duty", statusClass: "status-off", dotClass: "dot-off", driveUsed: 0, driveMax: 11, cycleLeft: 62, cycleMax: 70, driveColor: "#60a5fa", cycleColor: "#4ade80" },
];

const summary = [
  { name: "John Driver", trips: 5, miles: "3,288 mi", hours: "42h 10m", violations: 0 },
  { name: "Maria Lopez", trips: 4, miles: "2,142 mi", hours: "38h 00m", violations: 2 },
  { name: "James Kim", trips: 3, miles: "2,000 mi", hours: "22h 05m", violations: 0 },
];

const avatarColors = ["#dbeafe|#1d4ed8", "#dcfce7|#15803d", "#ede9fe|#6d28d9"];

export default function Drivers() {
  return (
    <div className="drivers-page">
      <div className="drivers-topbar">
        <h1 className="drivers-title">Drivers</h1>
        <button className="btn-primary">
          <span>+</span> Add driver
        </button>
      </div>

      <div className="driver-cards">
        {drivers.map((d, i) => {
          const [bg, fg] = avatarColors[i].split("|");
          return (
            <div className="driver-card" key={d.name}>
              <div className="dc-top">
                <div className="dc-avatar" style={{ background: bg, color: fg }}>{d.initials}</div>
                <div className="dc-info">
                  <div className="dc-name">{d.name}</div>
                  <div className="dc-cdl">{d.cdl}</div>
                </div>
                <div className={`dc-dot ${d.dotClass}`} />
              </div>
              <span className={`dc-badge ${d.statusClass}`}>{d.status}</span>
              <div className="dc-bar-group">
                <div className="dc-bar-label">Drive used · {d.driveUsed} / {d.driveMax}h</div>
                <div className="dc-bar-track">
                  <div className="dc-bar-fill" style={{ width: `${(d.driveUsed / d.driveMax) * 100}%`, background: d.driveColor }} />
                </div>
              </div>
              <div className="dc-bar-group">
                <div className="dc-bar-label">Cycle remaining · {d.cycleLeft}h / {d.cycleMax}h</div>
                <div className="dc-bar-track">
                  <div className="dc-bar-fill" style={{ width: `${(d.cycleLeft / d.cycleMax) * 100}%`, background: d.cycleColor }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="summary-card">
        <div className="summary-header">
          <span className="card-title">Driver summary — this month</span>
        </div>
        <div className="table-wrap">
          <table className="summary-table">
            <thead>
              <tr>
                <th>Driver</th>
                <th>Trips</th>
                <th>Miles</th>
                <th>Drive hours</th>
                <th>Violations</th>
              </tr>
            </thead>
            <tbody>
              {summary.map(s => (
                <tr key={s.name}>
                  <td className="s-name">{s.name}</td>
                  <td>{s.trips}</td>
                  <td>{s.miles}</td>
                  <td>{s.hours}</td>
                  <td style={{ color: s.violations > 0 ? "#dc2626" : "#16a34a", fontWeight: 600 }}>{s.violations}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
