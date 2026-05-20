import '../css/Settings.css';
import { useState } from "react";

const Toggle = ({ on }) => {
  const [active, setActive] = useState(on);
  return (
    <div className={`toggle ${active ? "toggle-on" : "toggle-off"}`} onClick={() => setActive(!active)}>
      <div className="toggle-thumb" />
    </div>
  );
};

const notifications = [
  { label: "HOS limit warnings", sub: "Alert 1h before limit", on: true },
  { label: "Trip reminders", sub: "Notify before departure", on: true },
  { label: "Violation alerts", sub: "Immediate notification", on: false },
  { label: "Weekly report email", sub: null, on: true },
];

const compliance = [
  { label: "Auto-generate ELD logs", on: true },
  { label: "FMCSA data sync", on: false },
  { label: "Roadside inspection mode", on: false },
];

export default function Settings() {
  return (
    <div className="settings-page">
      <div className="settings-topbar">
        <h1 className="settings-title">Settings</h1>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card-header">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Profile
          </div>
          <div className="profile-avatar-row">
            <div className="profile-avatar">JD</div>
            <div>
              <div className="profile-name">John Driver</div>
              <div className="profile-email">john@truckroute.com</div>
            </div>
          </div>
          <div className="field">
            <label className="field-label">Full name</label>
            <div className="field-value">John Driver</div>
          </div>
          <div className="field">
            <label className="field-label">CDL number</label>
            <div className="field-value">TX-482192</div>
          </div>
          <div className="field">
            <label className="field-label">HOS cycle</label>
            <div className="field-value field-select">
              <span>70 hr / 8 days</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
          <div className="field">
            <label className="field-label">Phone</label>
            <div className="field-value">+237 672 458 060</div>
          </div>
          <button className="btn-save">Save changes</button>
        </div>

        <div className="settings-right">
          <div className="settings-card">
            <div className="settings-card-header">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              Notifications
            </div>
            {notifications.map(n => (
              <div key={n.label} className="toggle-row">
                <div>
                  <div className="toggle-label">{n.label}</div>
                  {n.sub && <div className="toggle-sub">{n.sub}</div>}
                </div>
                <Toggle on={n.on} />
              </div>
            ))}
          </div>

          <div className="settings-card">
            <div className="settings-card-header">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Compliance
            </div>
            {compliance.map(c => (
              <div key={c.label} className="toggle-row">
                <div className="toggle-label">{c.label}</div>
                <Toggle on={c.on} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
