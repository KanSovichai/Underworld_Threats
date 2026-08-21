import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wrap a route element with <ProtectedRoute>...</ProtectedRoute> to require
// a logged-in user. Pass adminOnly to also require role === "admin".
const ProtectedRoute = ({ children, adminOnly = false }) => {
	const { currentUser, isAdmin, loading } = useAuth();

	if (loading) {
		return <div className="auth_loading_screen">Loading...</div>;
	}

	if (!currentUser) {
		return <Navigate to="/auth/login" replace />;
	}

	if (adminOnly && !isAdmin) {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default ProtectedRoute;
