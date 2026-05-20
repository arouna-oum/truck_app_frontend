import React from "react";
import RouteMap from "./RouteMap";
import "../css/TripDetails.css";

const TripDetails = ({ trip }) => {
  return (
    <div className="trip-details-page">

      {/* TOP BAR */}
      <div className="trip-topbar">
        <button className="back-btn">
          ← Back to Trips
        </button>

        <div className="topbar-actions">
          <button className="edit-btn">
            ✏️ Edit Trip
          </button>

          <button className="export-btn">
            ⬇ Export
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="trip-grid">

        {/* LEFT CARD */}
        <div className="card info-card">
          <h3>Trip Information</h3>

          <div className="info-row">
            <span>Trip ID</span>
            <strong>TRP-1001</strong>
          </div>

          <div className="info-row">
            <span>Driver</span>
            <strong>John Driver</strong>
          </div>

          <div className="info-row">
            <span>Route</span>
            <strong>Dallas, TX → Chicago, IL</strong>
          </div>

          <div className="info-row">
            <span>Departure</span>
            <strong>May 18, 2026 08:00 AM</strong>
          </div>

          <div className="info-row">
            <span>Distance</span>
            <strong>1,032 mi</strong>
          </div>

          <div className="info-row">
            <span>Status</span>
            <div className="status completed">
              Completed
            </div>
          </div>

          <div className="info-row">
            <span>Cargo Type</span>
            <strong>General</strong>
          </div>

          <div className="info-row">
            <span>Load Number</span>
            <strong>LD-77831</strong>
          </div>

          <div className="info-row">
            <span>Shipper</span>
            <strong>Global Freight Inc.</strong>
          </div>

          <div className="info-row">
            <span>HOS Cycle</span>
            <strong>70 / 8</strong>
          </div>

          <div className="info-row">
            <span>Current Cycle Used</span>
            <strong>42h 15m</strong>
          </div>
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

            <div className="stat-box">
              <span>Stops</span>
              <h2>3</h2>
            </div>

          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="card eld-card">

          <h3>ELD Summary</h3>

          <div className="eld-item">
            <span>Total Drive Time</span>
            <strong>16h 45m</strong>
          </div>

          <div className="eld-item">
            <span>Available Drive Time</span>
            <strong className="green">
              03h 15m
            </strong>
          </div>

          <div className="eld-item">
            <span>Available On Duty</span>
            <strong className="green">
              12h 15m
            </strong>
          </div>

          <div className="eld-item">
            <span>Cycle Remaining</span>
            <strong>
              33h 45m / 70h
            </strong>
          </div>

          <div className="stops-section">

            <h4>Stops & Breaks</h4>

            <div className="stop-item">
              <div className="stop-left">
                <div className="circle">1</div>

                <div>
                  <strong>Fuel Stop</strong>
                  <p>Dallas, TX</p>
                </div>
              </div>

              <span>30m</span>
            </div>

            <div className="stop-item">
              <div className="stop-left">
                <div className="circle">2</div>

                <div>
                  <strong>Rest Break</strong>
                  <p>Little Rock, AR</p>
                </div>
              </div>

              <span>10h</span>
            </div>

            <div className="stop-item">
              <div className="stop-left">
                <div className="circle">3</div>

                <div>
                  <strong>Fuel Stop</strong>
                  <p>St. Louis, MO</p>
                </div>
              </div>

              <span>30m</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default TripDetails;