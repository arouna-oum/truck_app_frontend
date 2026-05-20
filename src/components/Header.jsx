import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Header.css';
import { userService, userSubject } from '../userStore';
import { use } from 'react';

function Header(){
    const [user, setUser] = useState(null);
    const [navItems, setNavItems] = useState(["Home", "Login"]);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        // This code runs once on mount (like ngOnInit)
        console.log("Component has initialized!");
        const user_val = localStorage.getItem('user');
        if(user_val){
            console.log("User data Loaded 2: ", user_val);
            userService.setUser(JSON.parse(user_val));
        }else{
            console.log("No user data Loaded:", user);
        }
        const subscription = userSubject.subscribe((newUser) => {
            console.log("Header received new user update:", newUser);
            if(newUser){
                setUser(newUser);
                const newList = navItems.filter(item => item !== "Login");
                setNavItems(newList);
            }
           
        });
        console.log("User data Loaded:", user);
        // Optional: Return a function for cleanup (like ngOnDestroy)
        return () => {
            console.log("Component is being destroyed!");
            subscription.unsubscribe();
        };
    }, []);
    return (
        <div className="Header">
            <nav>
                <NavLink className="logo" to="/">
                    <div className="logo-icon">🚛</div>
                    TruckRoute ELD
                </NavLink>
                <ul className="nav-links">
                    {navItems.map(item => (
                        <li key={item}>
                            <NavLink
                                to={item === "/" ? "/" : `/${item.toLowerCase()}`}
                                className={({ isActive }) => (isActive ? "active-link" : "")}
                            >
                                {item}
                            </NavLink>
                        </li>
                    ))}
                    {/* START CODE HEADER */}
                    {/* FIXED: Conditional rendering using && */}
                        {user && (
                            <div className="profile-actions">
                                <div className="profile-dropdown">
                                    <img src={user?.profile_picture || user?.google_picture_url} className="avatar-circle"
                                        alt="Avatar" loading="lazy"/>
                                    <span className="profile-name">{user.username}</span>
                                </div>
                            </div>
                        )}
                    {/* END CODE HEADER */}

                </ul>
                <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                <span />
                <span />
                <span />
                </button>
            </nav>

            {/* MOBILE MENU */}
            <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                {navItems.map(item => (
                    <NavLink
                        key={item}
                        to={item === "/" ? "/" : `/${item.toLowerCase()}`}
                        className={({ isActive }) => (isActive ? "active-link" : "")}
                    >
                        {item}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default Header