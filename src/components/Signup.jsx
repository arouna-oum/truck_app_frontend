import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Signup.css';
import axios from 'axios';

function Signup() {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        console.log('Form up with api is :', API_URL);
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
        }
        console.log('Signing up with:', formData);
        try {
            const res = await axios.post(API_URL+"user/account/", formData);
            console.log("The response given is ", res.data);
            navigate('/login');
        } catch (error) {
            console.log("An error occured here ", error);
        }
    };
    

    return (
        <div className="Signup">
            <div className="signup-container">
                {/* Left Column: Form */}
                <div className="signup-left-col">
                    <div className="form-wrapper">
                    {/* Logo Header */}
                    <div className="signup-logo">
                        <svg className="truck-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="1" y="3" width="15" height="13" rx="2" fill="#1b66ff" stroke="#1b66ff"/>
                        <polygon points="16 8 20 8 23 11 23 16 16 16" fill="#1b66ff" stroke="#1b66ff"/>
                        <circle cx="5.5" cy="18.5" r="2.5" fill="#1b66ff"/>
                        <circle cx="18.5" cy="18.5" r="2.5" fill="#1b66ff"/>
                        </svg>
                        <span className="logo-brand">TruckRoute <span className="logo-bold">ELD</span></span>
                    </div>

                    {/* Heading */}
                    <div className="signup-header">
                        <h2>Create Your Account</h2>
                        <p>Sign up to get started</p>
                    </div>

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} className="register-form">
                        {/* First Name */}
                        <div className="form-field">
                            <span className="field-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                                </svg>
                            </span>
                            <input 
                                type="text" 
                                name="first_name"
                                placeholder="First Name" 
                                value={formData.first_name}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        {/* Last Name */}
                        <div className="form-field">
                            <span className="field-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                                </svg>
                            </span>
                            <input 
                                type="text" 
                                name="last_name"
                                placeholder="Last Name" 
                                value={formData.last_name}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        {/* UserName */}
                        <div className="form-field">
                            <span className="field-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                                </svg>
                            </span>
                            <input 
                                type="text" 
                                name="username"
                                placeholder="Username" 
                                value={formData.username}
                                onChange={handleChange}
                                required 
                            />
                        </div>

                        {/* Email */}
                        <div className="form-field">
                        <span className="field-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                            </svg>
                        </span>
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Email" 
                            value={formData.email}
                            onChange={handleChange}
                            required 
                        />
                        </div>

                        {/* Phone */}
                        <div className="form-field">
                            <span className="field-icon">
                                <i className='bi bi-telephone-fill' style={{color:" #a0aec0"}}></i>
                                {/* <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                                </svg> */}
                            </span>
                            <input 
                                type="number" 
                                name="phone"
                                placeholder="Phone" 
                                value={formData.phone}
                                onChange={handleChange}
                                required 
                            />
                        </div>

                        {/* Password */}
                        <div className="form-field">
                        <span className="field-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        </span>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password"
                            placeholder="Password" 
                            value={formData.password}
                            onChange={handleChange}
                            required 
                        />
                        <button 
                            type="button" 
                            className="visibility-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <i className={`bi ${showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}></i>

                        </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="form-field">
                        <span className="field-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        </span>
                        <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            name="confirmPassword"
                            placeholder="Confirm Password" 
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required 
                        />
                        <button 
                            type="button" 
                            className="visibility-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <i className={`bi ${showConfirmPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}></i>
                            
                        </button>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="submit-btn">Sign Up</button>
                    </form>

                    {/* Context Divider */}
                    <div className="form-divider">
                        <span>or</span>
                    </div>

                    {/* Google Sign Up */}
                    <button type="button" className="google-signup-btn">
                        <svg className="google-svg" width="18" height="18" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-1.14 2.77-2.4 3.63v3h3.86c2.26-2.09 3.59-5.17 3.59-8.48z"/>
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.21v3.11C3.18 21.88 7.31 24 12 24z"/>
                        <path fill="#FBBC05" d="M5.27 14.29a7.18 7.18 0 0 1 0-4.58V6.6H1.21a11.94 11.94 0 0 0 0 10.8l4.06-3.11z"/>
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 5.49l4.06 3.11c.95-2.85 3.6-4.96 6.73-4.96z"/>
                        </svg>
                        Sign up with Google
                    </button>

                    {/* Footer Navigation */}
                    <p className="login-redirect-text">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                    </div>
                </div>

                {/* Right Column: Hero Visuals & Features Layout */}
                <div className="signup-right-col">
                    <div className="overlay-features-panel">
                    
                    {/* Feature 1 */}
                    <div className="feature-item">
                        <div className="feature-icon-box icon-blue">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1b66ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                        </div>
                        <div className="feature-info">
                        <h3>Plan Efficiently</h3>
                        <p>Plan your trips with accurate route and time estimates.</p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="feature-item">
                        <div className="feature-icon-box icon-green">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <path d="M9 12l2 2 4-4"/>
                        </svg>
                        </div>
                        <div className="feature-info">
                        <h3>Follow HOS Rules</h3>
                        <p>We apply FMCSA HOS rules to keep you compliant.</p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="feature-item">
                        <div className="feature-icon-box icon-purple">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                            <line x1="9" y1="12" x2="15" y2="12"/>
                            <line x1="9" y1="16" x2="13" y2="16"/>
                        </svg>
                        </div>
                        <div className="feature-info">
                        <h3>Generate ELD Logs</h3>
                        <p>Get your ELD daily logs automatically.</p>
                        </div>
                    </div>

                    </div>
                </div>
                </div>
        </div>
    )
}

export default Signup