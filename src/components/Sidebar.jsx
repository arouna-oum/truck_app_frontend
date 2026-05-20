import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom'
import '../css/Sidebar.css'

const Icons = {
  Dashboard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>,
  Trips: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  Logs: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>,
  Drivers: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  Reports: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
  Settings: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
  Logout: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>,
  TruckLogo: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2" fill="#1b66ff" stroke="#1b66ff"/><polygon points="16 8 20 8 23 11 23 16 16 16" fill="#1b66ff" stroke="#1b66ff"/><circle cx="5.5" cy="18.5" r="2.5" fill="#1b66ff"/><circle cx="18.5" cy="18.5" r="2.5" fill="#1b66ff"/></svg>,
  Notification: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
  ChevronDown: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>,
  Plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
  RouteMap: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Distance: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>,
  TimeClock: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Warning: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  HOSShield: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
  MenuToggle: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
};

const tripsData = [
  { id: 'TRP-1001', route: 'Dallas, TX → Chicago, IL', date: 'May 18, 2026', distance: '1,032 mi', status: 'Completed' },
  { id: 'TRP-1002', route: 'Houston, TX → Atlanta, GA', date: 'May 17, 2026', distance: '810 mi', status: 'Completed' },
  { id: 'TRP-1003', route: 'Phoenix, AZ → Denver, CO', date: 'May 16, 2026', distance: '602 mi', status: 'In Progress' },
  { id: 'TRP-1004', route: 'Los Angeles, CA → Seattle, WA', date: 'May 15, 2026', distance: '1,256 mi', status: 'Planned' },
];

function Sidebar(){
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        // <Outlet/>
        <div className="Dashboard">
            <div className="dashboard-layout">
                {/* Backdrop for mobile overlays */}
                {!isCollapsed && <div className="sidebar-backdrop" onClick={() => setIsCollapsed(true)}></div>}

                {/* Sidebar Navigation */}
                <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                    <div className="brand-header">
                    <NavLink className="brand-logo-wrapper" to="/">
                        <Icons.TruckLogo />
                        <span className="brand-name">Truck Route <span className="brand-bold">ELD</span></span>
                    </NavLink>
                    </div>
                    <nav className="nav-menu">
                        <NavLink to="dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}><Icons.Dashboard /> <span>Dashboard</span></NavLink>
                        <NavLink to="trips" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}><Icons.Trips /> <span>Trips</span></NavLink>
                        <NavLink to="logs" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}><Icons.Logs /> <span>Logs</span></NavLink>
                        <NavLink to="drivers" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}><Icons.Drivers /> <span>Drivers</span></NavLink>
                        <NavLink to="reports" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}><Icons.Reports /> <span>Reports</span></NavLink>
                        <NavLink to="settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}><Icons.Settings /> <span>Settings</span></NavLink>
                        <NavLink to="logout" className={({ isActive }) => `nav-item logout ${isActive ? 'active' : ''}`}><Icons.Logout /> <span>Logout</span></NavLink>
                    </nav>
                </aside>

                {/* Main Workspace */}
                <div className="workspace">
                    {/* Main Application Header */}
                    <header className="workspace-header">
                        <div className="header-left-group">
                            <button className="menu-toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
                            <Icons.MenuToggle />
                            </button>
                            <h1 className="view-title">Dashboard</h1>
                        </div>
                        <div className="profile-actions">
                            <button className="notification-trigger">
                            <Icons.Notification />
                            <span className="notification-badge"></span>
                            </button>
                            <div className="profile-dropdown">
                            <div className="avatar-circle">JD</div>
                            <span className="profile-name">John Driver</span>
                            <Icons.ChevronDown />
                            </div>
                        </div>
                    </header>

                    {/* Dashboard Panels Grid */}
                    <main className="dashboard-view">
                        {/* Top Row: Performance Metrics */}
                        <Outlet/>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Sidebar