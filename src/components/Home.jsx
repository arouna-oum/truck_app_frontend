import '../css/Home.css'
import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';

function Home(){
    const navigation = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
    const [user, setUser] = useState(null);
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
    useEffect(() => {
        console.log("Component has initialized Trips!");

        get_user_from_local_storage();
    }, []);
    const view_dashboard = () => {
        if(user){
            navigation('/sidebar/dashboard')
        }else{
            navigation('/login')
        }

    }
    return (
        <div className="Home page mt-0">
            <section className="hero">
                <div className="hero-text">
                    <h1>
                    Smart Routes.<br />
                    Compliant Hours.<br />
                    <span>Simplified Logs.</span>
                    </h1>
                    <p>
                    Plan your trips, optimize routes, and generate ELD logs automatically with ease.
                    </p>
                    <div className="hero-buttons">
                    <button className="btn-primary" onClick={() => view_dashboard()}>Get Started</button>
                    <button className="btn-secondary">Learn More →</button>
                    </div>
                </div>

                <div className="hero-image">
                    <div className="mountain">⛰️</div>
                    <div className="truck-illustration">🚛</div>
                    <div className="road" />
                </div>
            </section>

            {/* WHY SECTION */}
            <section className="why-section">
                <h2>Why Choose TruckRoute ELD?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                    <div className="feature-icon icon-blue">📍</div>
                    <h3>Optimize Routes</h3>
                    <p>Find the best routes with estimated time, distance, and stops.</p>
                    </div>
                    <div className="feature-card">
                    <div className="feature-icon icon-purple">📋</div>
                    <h3>ELD Log Generation</h3>
                    <p>Automatically generate compliant ELD logs based on HOS rules.</p>
                    </div>
                    <div className="feature-card">
                    <div className="feature-icon icon-green">🛡️</div>
                    <h3>Stay Compliant</h3>
                    <p>Built-in HOS rules help you stay compliant and avoid violations.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home