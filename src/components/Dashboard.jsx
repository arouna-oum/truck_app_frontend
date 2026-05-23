import React, { useState, useEffect } from 'react';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import axiosInstance from '../axios';
import '../css/Dashboard.css'

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

function Dashboard(){
    const navigation = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
    const [user, setUser] = useState(null);
    const [all_trips_details, setAllTripsDetails] = useState([]);

    const get_user_from_local_storage = () => {
        console.log("Component has initialized!");
        const user_val = localStorage.getItem('user');
        console.log("User data Loaded 2: ", user_val);
        if(user_val){
            console.log("User data Loaded 2: ", user_val);
            setUser(JSON.parse(user_val));
        }else{
            console.log("No user data Loaded:", user);
        }
    }

    const view_all_trips = () => {
        navigation('/sidebar/trips')
    }

    const [all_trips, setAllTrips] = useState([]);
    const get_all_trips = async (e) => {
        try {
            const res = await axiosInstance.get("trip/all_trips/" + user?.id + "/");
            console.log("The response given is ", res.data);
            setAllTrips(res.data);
            console.log("Right now the trips are ", all_trips);
        } catch (error) {
            console.log("An error occured here ", error);
        }
    }

    const get_trip_details = async (e) => {
        try {
            const res = await axiosInstance.get("trip/trip_details/"+user?.id+"/")
            console.log("The response given is ", res.data);
            setAllTripsDetails(res.data);
            console.log("Right now the trip details are ", all_trips_details);
        } catch (error) {
            console.log("An error occured here ", error);
        }
    }

    useEffect(() => {
        console.log("Component has initialized Trips!");

        get_user_from_local_storage();
    }, []);
    useEffect(() => {

        if(user){
            get_all_trips();
            get_trip_details();
        }

    }, [user]);
    return (
        // <Outlet/>
        <div className="Dashboard">
            <section className="metrics-row">
                <div className="metric-card">
                <div className="metric-icon bg-light-blue text-blue"><Icons.RouteMap /></div>
                <div className="metric-details">
                    <span className="metric-label">Total Trips</span>
                    <h3 className="metric-value">{all_trips_details ? all_trips_details['total']:0}</h3>
                    <span className="metric-period"></span>
                </div>
                </div>
                <div className="metric-card">
                <div className="metric-icon bg-light-green text-green"><Icons.Distance /></div>
                <div className="metric-details">
                    <span className="metric-label">Total Distance</span>
                    <h3 className="metric-value">{all_trips_details ? all_trips_details['distance']:0} mi</h3>
                    <span className="metric-period">This Month</span>
                </div>
                </div>
                {/* <div className="metric-card">
                <div className="metric-icon bg-light-purple text-purple"><Icons.TimeClock /></div>
                <div className="metric-details">
                    <span className="metric-label">Drive Time</span>
                    <h3 className="metric-value">80h 15m</h3>
                    <span className="metric-period">This Month</span>
                </div>
                </div> */}
                {/* <div className="metric-card">
                    <div className="metric-icon bg-light-orange text-orange"><Icons.Warning /></div>
                    <div className="metric-details">
                        <span className="metric-label">Violations</span>
                        <h3 className="metric-value text-orange-dark">2</h3>
                        <span className="metric-period">This Month</span>
                    </div>
                </div> */}
            </section>

            {/* Bottom Row: Detailed Context Splits */}
            <div className="details-split-container">
                {/* Table Panel: Trips Record */}
                <section className="trips-panel">
                <div className="panel-header">
                    <div>
                        <h2>Recent Trips</h2>
                    </div>
                    <div>
                        <button onClick={()=>view_all_trips()} className="btn btn-primary action-link">View All</button>
                    </div>
                </div>
                <div className="scrollable-table-wrapper">
                    <table className="custom-data-table">
                    <thead>
                        <tr>
                        <th>Tractor Number</th>
                        <th>Route</th>
                        <th>Date</th>
                        <th>Distance</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {all_trips?.slice(-5).map((trip, index) => (
                        <tr key={trip.id}>
                            <td className="font-mono text-dark">{trip.tractor_number}</td>
                            <td className="text-secondary">{trip.origin} → {trip.destination}</td>
                            <td>{new Date(trip.departure_date)
                                .toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric"
                                })}</td>
                            <td>{trip.distance}</td>
                            <td>
                            <span className={`status-tag ${trip.status.toLowerCase().replace(' ', '-')}`}>
                                {trip.status}
                            </span>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </section>

                {/* Controls Sidebar Layout */}
                <div className="controls-sidebar-layout">
                {/* Compliance / HOS Summary Card */}
                <section className="hos-summary-panel">
                    <div className="panel-header-simple">
                    <h2>HOS Summary</h2>
                    </div>
                    <div className="hos-list-group">
                    <div className="hos-list-item">
                        <div className="hos-icon-box bg-light-blue text-blue"><Icons.TimeClock /></div>
                        <div className="hos-item-info">
                        <span className="hos-item-label">Available Drive Time</span>
                        <span className="hos-item-value font-mono">03:15</span>
                        </div>
                    </div>
                    <div className="hos-list-item">
                        <div className="hos-icon-box bg-light-green text-green"><Icons.HOSShield /></div>
                        <div className="hos-item-info">
                        <span className="hos-item-label">Available On Duty</span>
                        <span className="hos-item-value font-mono">12:15</span>
                        </div>
                    </div>
                    <div className="hos-list-item">
                        <div className="hos-icon-box bg-light-purple text-purple"><Icons.Logs /></div>
                        <div className="hos-item-info">
                        <span className="hos-item-label">Cycle Remaining</span>
                        <span className="hos-item-value font-mono">47:45 / 70:00</span>
                        </div>
                    </div>
                    </div>
                </section>

                {/* Instant Call To Actions */}
                <section className="quick-actions-panel">
                    <div className="panel-header-simple">
                    <h2>Quick Actions</h2>
                    </div>
                    <div className="action-buttons-group">
                    <NavLink className="btn-action-primary" to="/sidebar/trips">
                        <Icons.Plus /> Plan New Trip
                    </NavLink>
                    {/* <button className="btn-action-secondary">
                        <Icons.Logs /> Generate ELD Log
                    </button> */}
                    </div>
                </section>
                </div>
            </div>
        </div>
    )
}

export default Dashboard