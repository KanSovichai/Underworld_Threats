import { initializeApp, getApps, deleteApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import {
	collection,
	doc,
	setDoc,
	updateDoc,
	deleteDoc,
	onSnapshot,
	query,
	orderBy,
} from "firebase/firestore";
import { auth, db } from "./config";

const usersCollection = collection(db, "users");

/* ---------------------------------------------------------------------- */
/*  Public-facing auth (register / login / logout / current-user state)  */
/* ---------------------------------------------------------------------- */

// Registers a brand-new account (used by the public Register page) and
// creates a matching Firestore profile document so the account shows up
// in the admin dashboard's Users tab.
export async function registerUser(email, password, username) {
	const credential = await createUserWithEmailAndPassword(auth, email, password);
	await setDoc(doc(db, "users", credential.user.uid), {
		username,
		email,
		role: "user",
		createdAt: new Date().toISOString(),
	});
	return credential.user;
}

export async function loginUser(email, password) {
	const credential = await signInWithEmailAndPassword(auth, email, password);
	return credential.user;
}

export async function logoutUser() {
	return signOut(auth);
}

// Subscribes to auth state changes. Returns an unsubscribe function.
export function subscribeToAuthState(onChange) {
	return onAuthStateChanged(auth, onChange);
}

/* ---------------------------------------------------------------------- */
/*  Admin dashboard: live list of user profiles                          */
/* ---------------------------------------------------------------------- */

export function subscribeToUsers(onChange, onError) {
	const q = query(usersCollection, orderBy("createdAt", "desc"));
	return onSnapshot(
		q,
		(snapshot) => {
			const users = snapshot.docs.map((docSnap) => ({
				id: docSnap.id,
				...docSnap.data(),
			}));
			onChange(users);
		},
		onError
	);
}

// Creates a new Auth account + Firestore profile FROM the admin dashboard,
// without logging the admin out of their own session.
//
// Why the secondary-app trick: the Firebase client SDK's
// createUserWithEmailAndPassword() always signs in AS the newly created
// user on the app instance you call it on. To let an admin add a user
// while staying logged in as themselves, we spin up a second, temporary
// Firebase App instance (same project, same config) just for this one
// call, then tear it down immediately after.
export async function adminCreateUser(email, password, username) {
	const tempAppName = `admin-create-user-${Date.now()}`;
	const primaryApp = getApps()[0];
	const tempApp = initializeApp(primaryApp.options, tempAppName);
	const tempAuth = getAuth(tempApp);

	try {
		const credential = await createUserWithEmailAndPassword(tempAuth, email, password);
		await setDoc(doc(db, "users", credential.user.uid), {
			username,
			email,
			role: "user",
			createdAt: new Date().toISOString(),
		});
		return credential.user;
	} finally {
		// Always clean up the temporary app instance, sign it out first
		// so it doesn't linger as an authenticated session anywhere.
		await signOut(tempAuth).catch(() => {});
		await deleteApp(tempApp).catch(() => {});
	}
}

// Updates the profile fields we're allowed to touch from the client
// (username / role). Changing another user's email or password requires
// the Firebase Admin SDK running on a server (e.g. a Cloud Function) —
// see /functions/README.md for a ready-to-deploy example.
export async function updateUserProfile(uid, { username, role }) {
	const userRef = doc(db, "users", uid);
	const updates = {};
	if (username !== undefined) updates.username = username;
	if (role !== undefined) updates.role = role;
	return updateDoc(userRef, updates);
}

// Deletes the Firestore profile doc. This removes the user from the
// dashboard list, but the underlying Firebase Auth account still exists —
// deleting an Auth account that isn't the currently signed-in user is an
// Admin SDK-only operation. Wire this up to a Cloud Function
// (deleteUserAccount in /functions) once you deploy one; the client-side
// call is stubbed in adminDeleteUserAccount below.
export async function deleteUserProfile(uid) {
	const userRef = doc(db, "users", uid);
	return deleteDoc(userRef);
}
