import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../userStore";

const ProtectedRoute = ({ children }) => {

    const user = localStorage.getItem("user");

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const parsed = JSON.parse(user);

    const token = parsed?.access;

    // if no token or expired → redirect
    if (!token || isTokenExpired()) {
        localStorage.clear();
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;