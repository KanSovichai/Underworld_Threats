import { createContext, useContext, useEffect, useState } from "react";
import { subscribeToAuthState } from "../firebase/users";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribeAuth = subscribeToAuthState((user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribeAuth;
	}, []);

	// Keep the Firestore profile (username/role) in sync with whoever is
	// currently logged in, so we know if they're an admin.
	useEffect(() => {
		if (!currentUser) {
			setProfile(null);
			return;
		}
		const unsubscribeProfile = onSnapshot(doc(db, "users", currentUser.uid), (docSnap) => {
			setProfile(docSnap.exists() ? docSnap.data() : null);
		});
		return unsubscribeProfile;
	}, [currentUser]);

	const value = {
		currentUser,
		profile,
		loading,
		isAdmin: profile?.role === "admin",
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
