import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css';
import { userService, userSubject, setUserLogo } from '../userStore';
import axios from 'axios';

function Login(){
    const API_URL = import.meta.env.VITE_API_URL;
    const [formData, setFormData] = useState({email: '', password: ''});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e)  => {
        e.preventDefault();
        // Handle login logic here

        console.log('Signing up with:', formData);
        try {
            const res = await axios.post(API_URL+"user/login/", formData);
            console.log("The response given is ", res.data);
            setUserLogo(res.data);
            // localStorage.setItem('user', JSON.stringify(res.data));
            // setUser Behavior start
            const user_val = localStorage.getItem('user');
            if(user_val){
                userSubject.next(JSON.parse(user_val));
                console.log("User data Loaded:", userService.getUser());
            }else{
                console.log("No user data Loaded:", user_val);
            }
            // setUser Behavior end
            navigate('/sidebar/dashboard');
        } catch (error) {
            console.log("An error occured here ", error);
        }
    };

    return (
        <div className="Login mt-5">
            <div className="login-container">
                <div className="login-card">
                    {/* Logo Header */}
                    <div className="logo-container">
                    <svg className="truck-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="1" y="3" width="15" height="13" rx="2" fill="#1b66ff" stroke="#1b66ff"/>
                        <polygon points="16 8 20 8 23 11 23 16 16 16" fill="#1b66ff" stroke="#1b66ff"/>
                        <circle cx="5.5" cy="18.5" r="2.5" fill="#1b66ff"/>
                        <circle cx="18.5" cy="18.5" r="2.5" fill="#1b66ff"/>
                    </svg>
                    <span className="logo-text">TruckRoute <span className="logo-bold">ELD</span></span>
                    </div>

                    {/* Header Text */}
                    <div className="header-text-group">
                    <h2>Welcome Back!</h2>
                    <p>Login to continue to your account</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="login-form">
                    {/* Email Input */}
                    <div className="input-group">
                        <span className="input-icon-left">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        </span>
                        <input 
                        type="email" 
                        placeholder="Email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required 
                        />
                    </div>

                    {/* Password Input */}
                    <div className="input-group">
                        <span className="input-icon-left">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        </span>
                        <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Password" 
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required 
                        />
                        <button 
                        type="button" 
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        >
                        <i className={`bi ${showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}></i>
                        </button>
                    </div>

                    {/* Forgot Password */}
                    <div className="forgot-password-container">
                        <a href="#forgot" className="forgot-password-link">Forgot Password?</a>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn-primary">Login</button>
                    </form>

                    {/* Divider */}
                    <div className="divider">
                    <span>or</span>
                    </div>

                    {/* Google Login */}
                    <button type="button" className="btn-google">
                    <svg className="google-icon" width="18" height="18" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-1.14 2.77-2.4 3.63v3h3.86c2.26-2.09 3.59-5.17 3.59-8.48z"/>
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.21v3.11C3.18 21.88 7.31 24 12 24z"/>
                        <path fill="#FBBC05" d="M5.27 14.29a7.18 7.18 0 0 1 0-4.58V6.6H1.21a11.94 11.94 0 0 0 0 10.8l4.06-3.11z"/>
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.18 2.12 1.21 5.49l4.06 3.11c.95-2.85 3.6-4.96 6.73-4.96z"/>
                    </svg>
                    Login with Google
                    </button>

                    {/* Footer */}
                    <p className="signup-text">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login