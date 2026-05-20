import '../css/Home.css'

function Home(){
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
                    <button className="btn-primary">Get Started</button>
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