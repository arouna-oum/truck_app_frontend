import React from "react";
import RouteMap from "./RouteMap";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";
import "../css/TripDetails.css";

const TripDetails = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const location = useLocation();

  const trip = location.state?.trip;

  const navigation = useNavigate();
  const return_trip = () => {
    navigation('/sidebar/trips');
  }
  const [eld_trip, setEldTrip] = useState(null);
    const get_trip_eld = async () => {
        if (!trip?.id) {
            console.log("Trip ID not available yet");
            return;
        }
        try {
            const res = await axiosInstance.get("eld/generate-logs/" + trip.id + "/");
            console.log("The response given is ", res.data);
            const eldData = res.data.eld;

            console.log("ELD DATA:", eldData);
            setEldTrip(eldData);
            console.log("Right now the hos_types are ", eld_trip);
        } catch (error) {
            console.log("An error occured here ", error);
        }
    }
    const view_log = (trip) => {
        navigation('/sidebar/logs', {
            state: { trip }
        });
    }
    useEffect(() => {

        if(trip){
            get_trip_eld();
        }

    }, [trip]);
useEffect(() => {
    if (eld_trip) {
        console.log("eld_trip is now updated:", eld_trip);
    }
}, [eld_trip]);
  return (
    <div className="trip-details-page">

      {/* TOP BAR */}
      <div className="trip-topbar">
        <button className="back-btn" onClick={() => return_trip()}>
          ← Back to Trips
        </button>

        <div className="topbar-actions">
          {/* <button className="edit-btn">
            ✏️ Edit Trip
          </button> */}

          <button className="export-btn" onClick={() => view_log(trip)}>
            See log
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="trip-grid">

        {/* LEFT CARD */}
        <div className="card info-card">
          <h3>Trip Information</h3>

          <div className="info-row">
            <span>Tractor Number</span>
            <strong>{trip.tractor_number}</strong>
          </div>

          <div className="info-row">
            <span>Driver</span>
            <strong>{trip.assigned_driver.username}</strong>
          </div>

            {trip.co_driver && (
            <div className="info-row">
                <span>Co Driver</span>
                <strong>{trip.co_driver.username}</strong>
            </div>
            )}

          <div className="info-row">
            <span>Route</span>
            <strong>{trip.origin} -{">"} {trip.destination}</strong>
          </div>

          <div className="info-row">
            <span>Departure</span>
            <strong>{new Date(trip.departure_date)
                    .toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    })}, {trip.departure_time}</strong>
          </div>

          <div className="info-row">
            <span>Distance</span>
            <strong>{trip.distance} mi</strong>
          </div>

          <div className="info-row">
            <span>Status</span>
            <div className="status completed">
              {trip.status}
            </div>
          </div>

          <div className="info-row">
            <span>Cargo Type</span>
            <strong>{trip.cargo_type}</strong>
          </div>

          <div className="info-row">
            <span>Load Number</span>
            <strong>{trip.load_number}</strong>
          </div>

          <div className="info-row">
            <span>Shipper</span>
            <strong>{trip.shipper_name}</strong>
          </div>

          <div className="info-row">
            <span>HOS Cycle</span>
            <strong>{trip.hos_cycle}</strong>
          </div>

          {/* <div className="info-row">
            <span>Current Cycle Used</span>
            <strong>42h 15m</strong>
          </div> */}
        </div>

        {/* CENTER CARD */}
        <div className="card route-card">
          <h3>Route Overview</h3>

          <div className="map-container">
            <RouteMap geometry={trip?.route_geometry} />
          </div>

          <div className="route-stats">

            <div className="stat-box">
              <span>Total Distance</span>
              <h2>{trip?.distance} miles</h2>
            </div>

            <div className="stat-box">
              <span>Total Drive Time</span>
              <h2>{trip?.duration} hr</h2>
            </div>

            {/* <div className="stat-box">
              <span>Stops</span>
              <h2>3</h2>
            </div> */}

          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="card eld-card">

          <h3>ELD Summary</h3>

          {/* <div className="eld-item">
            <span>Total Drive Time</span>
            <strong>16h 45m</strong>
          </div> */}

          <div className="eld-item">
            <span>Available Drive Time</span>
            <strong className="green">
              {eld_trip && eld_trip.daily_logs?.length > 0 && (
                <span>{eld_trip.daily_logs[0].driving_hours}</span>
              )}
            </strong>
          </div>

          <div className="eld-item">
            <span>Available On Duty</span>
            <strong className="green">
            {eld_trip && eld_trip.daily_logs?.length > 0 && (
                <span>{eld_trip.daily_logs[0].on_duty_hours}</span>
              )}
            </strong>
          </div>

          {/* <div className="eld-item">
            <span>Cycle Remaining</span>
            <strong>
              33h 45m / 70h
            </strong>
          </div> */}

          <div className="stops-section">

            <h4>Stops & Breaks</h4>

            {trip?.route_instructions?.slice(-3).map((instruction, index) => (
                <div className="stop-item" key={index}>
                    <div className="stop-left">
                        <div className="circle">{index + 1}</div>
                        <div>
                            <strong>{instruction.mode}</strong>
                            <p>{instruction.name}</p>
                        </div>
                    </div>
                    <span>{instruction.distance}m</span>
                </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
};

export default TripDetails;