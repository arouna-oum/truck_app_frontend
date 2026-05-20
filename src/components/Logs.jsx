import '../css/Logs.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import axiosInstance from "../axios";

const hours = Array.from({ length: 12 }, (_, i) => i * 2);
const hourLabels = ["12A","2","4","6","8","10","12P","2","4","6","8","10"];

const statusColors = {
  "Off duty": "#e2e8f0",
  "Sleeper": "#a5b4fc",
  "Driving": "#60a5fa",
  "On duty": "#4ade80",
};

export default function Logs() {
  const API_URL = import.meta.env.VITE_API_URL;
  const location = useLocation();

  const trip = location.state?.trip;
  const [user, setUser] = useState(null);
  const [eld_trip, setEldTrip] = useState(null);
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
  const get_trip_eld = async () => {
        try {
            const res = await axiosInstance.get("eld/generate-logs/" + trip.id + "/");
            console.log("The response given is ", res.data);
            setEldTrip(res.data?.eld);
            console.log("Right now the hos_types are ", eld_trip);
        } catch (error) {
            console.log("An error occured here ", error);
        }
    }

    const [all_trips, setAllTrips] = useState([]);
    const get_all_trips = async (e) => {
        try {
            const res = await axiosInstance.get("trip/trip_actions/" + user?.id + "/");
            console.log("The response given is ", res.data);
            setAllTrips(res.data.results);
            console.log("Right now the trips are ", all_trips);
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
            get_trip_eld();
            get_all_trips();
        }

    }, [user]);


    const convertToGrid = (segments) => {

        const grid = {
            "Off duty": Array(12).fill(0),
            "Sleeper": Array(12).fill(0),
            "Driving": Array(12).fill(0),
            "On duty": Array(12).fill(0),
        };

        let pointer = 0;

        segments.forEach(seg => {

            const blocks = Math.ceil(seg.hours / 2);

            const label =
            seg.type === "driving"
                ? "Driving"
                : seg.type === "off_duty"
                ? "Off duty"
                : seg.type === "sleeper"
                ? "Sleeper"
                : "On duty";

            for (let i = 0; i < blocks; i++) {

            if (pointer < 12) {

                grid[label][pointer] = 1;
                pointer++;
            }
            }
        });

        return grid;
        };
        const graphData =
        eld_trip?.daily_logs?.length > 0
            ? convertToGrid(
                eld_trip.daily_logs[0].segments
            )
            : null;
const formattedDate = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: '2-digit',
  year: 'numeric',
}).format(new Date());
  return (
    <div className="logs-page">
      <div className="logs-topbar">
        <h1 className="logs-title">ELD Logs</h1>
        {/* <button className="btn-export">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export logs
        </button> */}
      </div>

      <div className="logs-card">
        <div className="logs-card-header">
          <span className="card-title">Today's log</span>
          <span className="card-sub">{user?.username || ""} · {trip ?new Date(trip.departure_date)
                    .toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    }) : ''}</span>
        </div>
        <div className="eld-wrap">
          <div className="eld-grid">
            <div className="eld-hour-row">
              <div className="eld-row-label"></div>
              {hourLabels.map((h, i) => (
                <div key={i} className="eld-hour-label">{h}</div>
              ))}
            </div>
            {graphData &&
  Object.entries(graphData).map(([status, cells]) => (
              <div key={status} className="eld-row">
                <div className="eld-row-label">{status}</div>
                {cells.map((active, i) => (
                  <div
                    key={i}
                    className="eld-cell"
                    style={{ background: active ? statusColors[status] : "var(--eld-empty, #f8fafc)" }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="eld-legend">
            {Object.entries(statusColors).map(([label, color]) => (
              <div key={label} className="legend-item">
                <div className="legend-dot" style={{ background: color, border: label === "Off duty" ? "0.5px solid #cbd5e1" : "none" }} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="logs-card">
        <div className="logs-card-header">
          <span className="card-title">Log history</span>
        </div>
        <div className="log-list">
          {all_trips.map(h => (
            <div key={h.id} className="log-row">
              <span className="log-id">{h.id}</span>
              <span className="log-route">{h.origin} -{">"} {h.destination}</span>
              <span className={`badge ${h.ok ? "badge-ok" : "badge-vio"}`}>{h.status}</span>
              <span className="log-date">{new Date(h.departure_date)
                    .toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    })}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
