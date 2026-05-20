import '../css/Settings.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import axiosInstance from '../axios';
import { userService, userSubject, setUserLogo } from '../userStore';

const Toggle = ({ on }) => {
  const [active, setActive] = useState(on);
  return (
    <div className={`toggle ${active ? "toggle-on" : "toggle-off"}`} onClick={() => setActive(!active)}>
      <div className="toggle-thumb" />
    </div>
  );
};

const notifications = [
  { label: "HOS limit warnings", sub: "Alert 1h before limit", on: true },
  { label: "Trip reminders", sub: "Notify before departure", on: true },
  { label: "Violation alerts", sub: "Immediate notification", on: false },
  { label: "Weekly report email", sub: null, on: true },
];

const compliance = [
  { label: "Auto-generate ELD logs", on: true },
  { label: "FMCSA data sync", on: false },
  { label: "Roadside inspection mode", on: false },
];

export default function Settings() {
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
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        phone: '',
        refresh: '',
        access: ''
    });
    const open_edit = (user) => {
        console.log("the modif user is ", user);
        setFormData({
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            username: user.username || "",
            email: user.email || "",
            phone: user.phone || ""
        });
    };

    const handleSubmit = async (e)  => {
        e.preventDefault();
        // Handle login logic here
        const user_val = localStorage.getItem('user');
        console.log('user_val up with:', user_val);
        if(user_val){
            const v = JSON.parse(user_val);
            console.log('v up with:', v);
            formData.refresh = v.refresh;
            formData.access = v.access;
        }
        console.log('Signing up with:', formData);
        try {
            const res = await axiosInstance.patch("user/account/"+user.id+"/", formData);
            console.log("The response given is ", res.data);
            setUserLogo(res.data);
            // localStorage.setItem('user', JSON.stringify(res.data));
            // setUser Behavior start
            const user_val = localStorage.getItem('user');
            if(user_val){
                userSubject.next(JSON.parse(user_val));
                console.log("User data Loaded:", userService.getUser());
                get_user_from_local_storage();
            }else{
                console.log("No user data Loaded:", user_val);
            }
        } catch (error) {
            console.log("An error occured here ", error);
        }
    };

    useEffect(() => {
        console.log("Component has initialized Trips!");
        get_user_from_local_storage();
    }, []);
    useEffect(() => {

        if(user){
            open_edit(user);
        }

    }, [user]);
  return (
    <div className="settings-page">
      <div className="settings-topbar">
        <h1 className="settings-title">Settings</h1>
      </div>

      <div className="settings-grid">
        <form onSubmit={handleSubmit} className="settings-card">
          <div className="settings-card-header">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Profile
          </div>
          <div className="profile-avatar-row">
            {user && (
                <div>
                    <div className="profile-avatar">
                        <img src={user?.profile_picture || user?.google_picture_url} className="avatar-circle"
                                    alt="Avatar" loading="lazy"/>
                    </div>
                    <div>
                        <div className="profile-name">{user?.first_name} {user?.last_name}</div>
                        <div className="profile-email">{user?.email}</div>
                    </div>
                </div>
            )}
          </div>
          <div className="field">
            <label className="field-label">First name</label>
            <div className="field-value">
                <div className="field-input-wrap">
                    <input
                    type="text"
                    placeholder="First name"
                    value={formData.first_name}
                    onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                    required/>
                </div>
            </div>
          </div>
          <div className="field">
            <label className="field-label">Last Name</label>
            <div className="field-value">
                <div className="field-input-wrap">
                    <input
                    type="text"
                    placeholder="Last name"
                    value={formData.last_name}
                    onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                    required/>
                </div>
            </div>
          </div>
          <div className="field">
            <label className="field-label">Username</label>
            <div className="field-value">
                <div className="field-input-wrap">
                    <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    required/>
                </div>
            </div>
          </div>
          <div className="field">
            <label className="field-label">Email</label>
            <div className="field-value">
                <div className="field-input-wrap">
                    <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required/>
                </div>
            </div>
          </div>
          <div className="field">
            <label className="field-label">Phone</label>
            <div className="field-value">
                <div className="field-input-wrap">
                <input
                    type="number"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required/>
                </div>

            </div>
          </div>
          <button className="btn-save" type='submit'>Save changes</button>
        </form>

        <div className="settings-right">
          <div className="settings-card">
            <div className="settings-card-header">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              Notifications
            </div>
            {notifications.map(n => (
              <div key={n.label} className="toggle-row">
                <div>
                  <div className="toggle-label">{n.label}</div>
                  {n.sub && <div className="toggle-sub">{n.sub}</div>}
                </div>
                <Toggle on={n.on} />
              </div>
            ))}
          </div>

          <div className="settings-card">
            <div className="settings-card-header">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Compliance
            </div>
            {compliance.map(c => (
              <div key={c.label} className="toggle-row">
                <div className="toggle-label">{c.label}</div>
                <Toggle on={c.on} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
