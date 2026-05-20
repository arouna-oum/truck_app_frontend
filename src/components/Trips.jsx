import { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../axios";
import TripDetails from "./TripDetails";
import { Link, useNavigate } from "react-router-dom";
import "../css/Trips.css";

const cargoTypes = [
  { label: "General", icon: "📦" },
  { label: "Hazmat", icon: "⚠️" },
  { label: "Refrigerated", icon: "❄️" },
  { label: "Oversized", icon: "📐" },
  { label: "Livestock", icon: "🐄" },
  { label: "Fuel", icon: "⛽" },
];

const drivers = ["John Driver", "Maria Lopez", "James Kim"];
const cycles = ["70 hr / 8 days", "60 hr / 7 days"];

const STEPS = ["Route", "Details", "Review"];


const statusClass = { completed: "badge-done", "in_transit": "badge-prog", pending: "badge-plan", cancelled: "badge-cancel" };


const stats = [
  { label: "Total trips", value: "12", color: "" },
  { label: "Completed", value: "7", color: "#15803d" },
  { label: "In progress", value: "3", color: "#ea580c" },
  { label: "Planned", value: "2", color: "#1d4ed8" },
];

export default function Trips() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [editTrip, setEditTrip] = useState(null);
  const [active, setActive] = useState("All");
  const [filters, setFilters] = useState(["All"]);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    assigned_driver_id: "",
    co_driver: undefined,
    driver_number: "",
    tractor_number: "",
    origin: "",
    destination: "",
    departure_date: "",
    departure_time: "",
    cargo_type: "",
    shipper_name: "",
    load_number: "",
    hos_cycle: "",
    status: "",
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const canNext = () => {
    if (step === 0) return form.origin.trim() && form.destination.trim() && form.tractor_number;
    if (step === 1) return form.departure_date && form.cargo_type && form.assigned_driver_id && form.hos_cycle && form.load_number;
    return true;
  };

  const estimatedDriveHours = form.distance && form.avgSpeed
    ? (parseFloat(form.distance) / parseFloat(form.avgSpeed)).toFixed(1)
    : null;

    const [statuses, setStatus] = useState([]);
    const [cargo_types, setCargos] = useState([]);
    const [hos_types, setHOS] = useState([]);
    const [user_list, setUsers] = useState([]);
    const [all_trips, setAllTrips] = useState([]);
    const [all_trips_details, setAllTripsDetails] = useState([]);
    const [user, setUser] = useState(null);
    const filtered = active === "All" ? (all_trips || []) : (all_trips || []).filter(t => t.status === active);
    // Requests start
    const get_status_choices = async (e) => {
        try {
            const res = await axiosInstance.get("trip/status_choices/")
            console.log("The response given is ", res.data);
            setStatus(res.data['status_choices']);
            setFilters(filters.concat(res.data['status_choices']));
            console.log("Right now the statuses are ", statuses);
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

    const get_cargo_choices = async (e) => {
        try {
            const res = await axiosInstance.get("trip/cargo_type_choices/")
            console.log("The response given is ", res.data);
            setCargos(res.data['cargo_type_choices']);
            console.log("Right now the cargo_types are ", cargo_types);
        } catch (error) {
            console.log("An error occured here ", error);
        }
    }

    const get_hos_choices = async (e) => {
        try {
            const res = await axiosInstance.get("trip/hos_choices/")
            console.log("The response given is ", res.data);
            setHOS(res.data['hos_choices']);
            console.log("Right now the hos_types are ", hos_types);
        } catch (error) {
            console.log("An error occured here ", error);
        }
    }

    const get_user_list = async () => {
        try {
            const res = await axiosInstance.get("user/all_users/")
            console.log("The response given is ", res.data);
            setUsers(res.data);
            console.log("Right now the hos_types are ", hos_types);
        } catch (error) {
            console.log("An error occured here ", error);
        }
    }

    const handleSubmit = async ()  => {
        // Handle login logic here

        console.log('Creating Trip up with:', form);
        form.co_driver_id = form.co_driver_id || null;
        // try {
        //     const res = await axios.post(API_URL+"trip/trip_actions/", form);
        //     console.log("The response given is ", res.data);
        //     setShowModal(false);
        //     // setUserLogo(res.data);
        //     // localStorage.setItem('user', JSON.stringify(res.data));
        // } catch (error) {
        //     console.log("An error occured here ", error);
        // }
        try {
            if (editTrip) {
                // Edit mode — PUT request
                const res = await axiosInstance.put("trip/trip_actions/" + editTrip.id + "/", form);
                console.log("Trip updated:", res.data);
                setSuccessMessageModify(true);
                setErrorMessage(false);

                setTimeout(() => {
                    setSuccessMessageModify(false);
                }, 4000);
            } else {
                // Create mode — POST request
                const res = await axiosInstance.post("trip/trip_actions/", form);
                console.log("Trip created:", res.data);
                setSuccessMessageCreate(true);
                setErrorMessage(false);

                setTimeout(() => {
                    setSuccessMessageCreate(false);
                }, 4000);
            }
            setShowModal(false);
            setEditTrip(null);
            get_all_trips(); 
            get_trip_details();
        } catch (error) {
            console.log("An error occurred:", error);

            setErrorMessage(true);
            setSuccessMessageModify(false);
            setSuccessMessageCreate(false);

            setTimeout(() => {
                setErrorMessage(false);
            }, 4000);
        }
    };

    const navigate = useNavigate();
    const view_trip = (trip) => {
        navigate('/sidebar/view_trip', {
            state: { trip }
        });
    }

    const open_edit = (trip) => {
        console.log("the modif trips are ", trip);
        setForm({
            assigned_driver_id: trip.assigned_driver.id || "",
            co_driver_id: trip.co_driver?.id || "",
            driver_number: trip.driver_number || "",
            tractor_number: trip.tractor_number || "",
            origin: trip.origin || "",
            destination: trip.destination || "",
            departure_date: trip.departure_date || "",
            departure_time: trip.departure_time || "",
            cargo_type: trip.cargo_type || "",
            shipper_name: trip.shipper_name || "",
            load_number: trip.load_number || "",
            hos_cycle: trip.hos_cycle || "",
            status: trip.status || "",
        });
        setEditTrip(trip);
        setStep(0);
        setShowModal(true);
    };
    const [successMessageCreate, setSuccessMessageCreate] = useState(false);
    const [successMessageModify, setSuccessMessageModify] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    // Requests end
    useEffect(() => {
        console.log("Component has initialized Trips!");
        get_user_from_local_storage();
        get_status_choices();
        get_cargo_choices();
        get_hos_choices();
        get_user_list();
    }, []);
    useEffect(() => {

        if(user){
            get_all_trips();
            get_trip_details();
        }

    }, [user]);
  return (
    <div className="trips-page">
      <div className="trips-topbar">
        <h1 className="trips-title">Trips</h1>
        <button className="btn-primary w-25" 
        onClick={() => {
        setEditTrip(null);
        setForm({
            assigned_driver_id: "", co_driver_id: "", driver_number: "",
            tractor_number: "", origin: "", destination: "",
            departure_date: "", departure_time: "", cargo_type: "",
            shipper_name: "", load_number: "", hos_cycle: "",
        });
        setStep(0);
        setShowModal(true);
        }}>
          <span className="btn-icon">+</span> Plan new trip
        </button>
      </div>

        {/* Modal */}
      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">

            {/* Header */}
            <div className="modal-header">
                <div className="modal-header-left">
                    <div className="modal-header-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2"><path d="M3 12h18M3 6l9-3 9 3M3 18l9 3 9-3"/></svg>
                    </div>
                    <span className="modal-title">{editTrip ? "Edit trip" : "Plan new trip"}</span>
                </div>
                <button className="modal-close" onClick={() => setShowModal(false)} aria-label="Close">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
            </div>

            {/* Step bar */}
            <div className="step-bar">
                {STEPS.map((s, i) => (
                    <div key={s} className="step-item">
                    <div className={`step-circle ${i < step ? "step-done" : i === step ? "step-active" : "step-idle"}`}>
                        {i < step
                        ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        : i + 1}
                    </div>
                    <span className={`step-label ${i < step ? "step-label-done" : i === step ? "step-label-active" : "step-label-idle"}`}>{s}</span>
                    {i < STEPS.length - 1 && <div className={`step-line ${i < step ? "step-line-done" : ""}`} />}
                    </div>
                ))}
            </div>

            {/* Body */}
            <div className="modal-body">

            {/* STEP 0: Route */}
            {step === 0 && (
                <div className="form-section">
                <div className="form-row">
                    <div className="field">
                    <label className="field-label">Origin</label>
                    <div className="field-input-wrap">
                        <svg className="field-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/></svg>
                        <input
                        type="text"
                        placeholder="City, State"
                        value={form.origin}
                        onChange={e => set("origin", e.target.value)}
                        />
                    </div>
                    </div>
                    <div className="field">
                    <label className="field-label">Destination</label>
                    <div className="field-input-wrap">
                        <svg className="field-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                        <input
                        type="text"
                        placeholder="City, State"
                        value={form.destination}
                        onChange={e => set("destination", e.target.value)}
                        />
                    </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="field">
                    <label className="field-label">Tractor Number</label>
                    <div className="field-input-wrap">
                        <input
                        type="text"
                        placeholder="e.g. TR-1234"
                        value={form.tractor_number}
                        onChange={e => set("tractor_number", e.target.value)}
                        />
                    </div>
                    </div>
                    <div className="field">
                    <label className="field-label">Driver Number</label>
                    <div className="field-input-wrap">
                        <input
                        type="number"
                        placeholder="e.g. 55"
                        value={form.driver_number}
                        onChange={e => set("driver_number", e.target.value)}
                        />
                    </div>
                    </div>
                </div>
                {/* {estimatedDriveHours && form.origin && form.destination && (
                    <div className="info-note">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    Estimated drive time: <strong>{estimatedDriveHours}h</strong> at {form.avgSpeed} mph
                    </div>
                )} */}
                </div>
            )}

            {/* STEP 1: Details */}
            {step === 1 && (
                <div className="form-section">
                <div className="form-row">
                    <div className="field">
                    <label className="field-label">Departure date</label>
                    <div className="field-input-wrap">
                        <svg className="field-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        <input
                        type="date"
                        value={form.departure_date}
                        onChange={e => set("departure_date", e.target.value)}
                        />
                    </div>
                    </div>
                    <div className="field">
                    <label className="field-label">Departure time</label>
                    <div className="field-input-wrap">
                        <svg className="field-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        <input
                        type="time"
                        value={form.departure_time}
                        onChange={e => set("departure_time", e.target.value)}
                        />
                    </div>
                    </div>
                </div>

                <div className="field">
                    <label className="field-label">Cargo type</label>
                    <div className="cargo-grid">
                    {cargo_types.map(c => (
                        <button
                        key={c.value}
                        className={`cargo-btn ${form.cargo_type === c.label || form.cargo_type === c.value ? "cargo-active" : ""}`}
                        onClick={() => set("cargo_type", c.value)}
                        type="button"
                        >
                        {/* <span className="cargo-icon">{c.icon}</span> */}
                        <span>{c.label}</span>
                        </button>
                    ))}
                    </div>
                </div>

                <div className="form-row">
                    <div className="field">
                        <label className="field-label">Assign Driver</label>
                        <div className="field-input-wrap select-wrap">
                            <select value={form.assigned_driver_id} onChange={e => set("assigned_driver_id", e.target.value)}>
                            <option value="">Select Assign Driver</option>
                            {user_list.map(d => <option key={d.id} value={d.id || form.assigned_driver_id}>
                                {d.username}
                            </option>)}
                            </select>
                            <svg className="select-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                    </div>
                    <div className="field">
                        <label className="field-label">Co Driver</label>
                        <div className="field-input-wrap select-wrap">
                            <select value={form.co_driver_id} onChange={e => set("co_driver_id", e.target.value)}>
                            <option value="">Select Co Driver</option>
                            {user_list.map(d => <option key={d.id} value={d.id || form.co_driver_id}>
                                {d.username}
                            </option>)}
                            </select>
                            <svg className="select-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="field-label">HOS Cycle</label>
                    <div className="field-input-wrap select-wrap">
                        <select value={form.hos_cycle} onChange={e => set("hos_cycle", e.target.value)}>
                        <option value="">Select HOS Cycle</option>
                        {hos_types.map(c => <option key={c.value} value={c.value || c.hos_cycle}>
                            {c.label}
                        </option>)}
                        </select>
                        <svg className="select-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                </div>

                {editTrip && (<div className="field">
                    <label className="field-label">Status</label>
                    <div className="field-input-wrap select-wrap">
                        <select value={form.status} onChange={e => set("status", e.target.value)}>
                        <option value="">Select Status</option>
                        {statuses.map(c => <option key={c.value} value={c.value || c.status}>
                            {c.label}
                        </option>)}
                        </select>
                        <svg className="select-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                </div>)}

                <div className="form-row">
                    <div className="field">
                        <label className="field-label">Shipper Name</label>
                        <div className="field-input-wrap">
                            <svg className="field-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            <input
                            type="text"
                            value={form.shipper_name}
                            onChange={e => set("shipper_name", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="field-label">Load Number</label>
                        <div className="field-input-wrap">
                            <svg className="field-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            <input
                            type="number"
                            min={0}
                            value={form.load_number}
                            onChange={e => set("load_number", e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* <div className="info-note">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <span><strong>{form.assigned_driver}</strong> has <strong>47h 45m</strong> cycle remaining — fully compliant for this trip.</span>
                </div> */}
                </div>
            )}

            {/* STEP 2: Review */}
            {step === 2 && (
                <div className="form-section">
                <div className="review-title">Review your trip</div>
                <div className="review-card">
                    <div className="review-row">
                    <span className="review-label">Route</span>
                    <span className="review-value">{form.origin} → {form.destination}</span>
                    </div>
                    <div className="review-row">
                    <span className="review-label">Tractor Number</span>
                    <span className="review-value">{form.tractor_number}</span>
                    </div>
                    <div className="review-row">
                    <span className="review-label">Driver Number</span>
                    <span className="review-value">{form.driver_number} mph</span>
                    </div>
                    <div className="review-row">
                    <span className="review-label">Departure</span>
                    <span className="review-value">{form.departure_date} at {form.departure_time}</span>
                    </div>
                    <div className="review-row">
                    <span className="review-label">Cargo</span>
                    <span className="review-value">{form.cargo_type}</span>
                    </div>
                    <div className="review-row">
                    <span className="review-label">Assigned Driver</span>
                    <span className="review-value">{form.assigned_driver_id}</span>
                    </div>
                    <div className="review-row">
                    <span className="review-label">HOS Cycle</span>
                    <span className="review-value">{form.hos_cycle}</span>
                    </div>
                    <div className="review-row">
                    <span className="review-label">Shipper Name</span>
                    <span className="review-value">{form.shipper_name}</span>
                    </div>
                    <div className="review-row">
                    <span className="review-label">Load Number</span>
                    <span className="review-value">{form.load_number}</span>
                    </div>
                    {form.co_driver_id && (
                    <div className="review-row">
                        <span className="review-label">Co-Driver</span>
                        <span className="review-value">{form.co_driver_id}</span>
                    </div>
                    )}
                </div>
                <div className="info-note info-success">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Trip is HOS compliant. ELD log will be auto-generated on departure.
                </div>
                </div>
            )}
            </div>

            {/* Footer */}
            <div className="modal-footer">
                <button
                    className="btn-back"
                    onClick={() => {
                        if (step === 0) {
                            setShowModal(false);
                            setEditTrip(null);
                        } else {
                            setStep(s => s - 1);
                        }
                    }}
                >
                    {step === 0
                    ? "Cancel"
                    : <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> Back</>
                    }
                </button>
                <div className="footer-right">
                    <span className="step-counter">Step {step + 1} of {STEPS.length}</span>
                    <button
                    className="btn-next"
                    onClick={() => step < STEPS.length - 1 ? setStep(s => s + 1) : handleSubmit()}
                    disabled={!canNext()}
                    >
                    {step === STEPS.length - 1
                        ? <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> {editTrip ? "Edit trip" : "Create trip"}</>
                        : <>Continue <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></>
                    }
                    </button>
                </div>
            </div>

            </div>
          </div>
        </div>
      )}

      <div className="trips-stats">
        {/* {stats.map(s => (
          <div className="stat-card" key={s.label}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={s.color ? { color: s.color } : {}}>{s.value}</div>
          </div>
        ))} */}
        <div className="stat-card">
            <div className="stat-label">Total trips</div>
            <div className="stat-value">{all_trips_details ? all_trips_details['total']:0}</div>
        </div>
        <div className="stat-card">
            <div className="stat-label">Completed</div>
            <div className="stat-value" style={{ color: "#15803d"}}>{all_trips_details ? all_trips_details['completed']:0}</div>
        </div>
        <div className="stat-card">
            <div className="stat-label">In Transit</div>
            <div className="stat-value" style={{ color: "#ea580c" }}>{all_trips_details ? all_trips_details['in_transit']:0}</div>
        </div>
        <div className="stat-card">
            <div className="stat-label">Pending</div>
            <div className="stat-value" style={{ color: "#1d4ed8" }}>{all_trips_details ? all_trips_details['pending']:0}</div>
        </div>
      </div>

      <div className="trips-filters">
        {filters.map(f => (
          <button
            key={f.value || f}
            className={`filter-btn ${active === (f.value || f) ? "filter-active" : ""}`}
            onClick={() => setActive(f.value || f)}
          >
            {f.label || f}
          </button>
        ))}
      </div>

      <div className="trips-card">
        <div className="trips-card-header">
          <span className="card-title">All trips</span>
          <span className="card-link">View all</span>
        </div>
        <div className="table-wrap">
          <table className="trips-table">
            <thead>
              <tr>
                <th>Tractor Number</th>
                <th>Route</th>
                <th>Date</th>
                <th>Distance</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id}>
                  <td className="trip-id">{t.tractor_number}</td>
                  <td className="trip-route">{t.origin} -{">"} {t.destination}</td>
                  <td>{    new Date(t.departure_date)
                    .toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    })}</td>
                  <td>{t.distance} miles</td>
                  <td><span className={`badge ${statusClass[t.status]}`}>{t.status}</span></td>
                  <td className="buttonsarr">
                    <button className="btn btn-secondary btn-sm" onClick={() => view_trip(t)}><i className="bi bi-eye"></i></button>
                    <button className="btn colr btn-sm" onClick={() => open_edit(t)}><i className="bi bi-pencil"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            <br />
            <br />
            {successMessageCreate && (
                <div className="info-note info-success allin">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Trip was successfully modified.
                </div>
            )}
            {successMessageModify && (
                <div className="info-note info-success allin">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Trip was successfully created.
                </div>
            )}
            {errorMessage && (
                <div className="info-note info-danger allin">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    An Error occured, verify your internet connection and try again.
                </div>
            )}
        </div>
      </div>

    </div>
  );
}