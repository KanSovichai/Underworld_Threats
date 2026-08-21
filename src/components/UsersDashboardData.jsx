import "../styles/UsersDashboardData.css";
import { useEffect, useState } from "react";
import {
	subscribeToUsers,
	adminCreateUser,
	updateUserProfile,
	deleteUserProfile,
} from "../firebase/users";

const emptyForm = { username: "", email: "", password: "" };

const UsersDashboardData = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [loadError, setLoadError] = useState("");

	const [showForm, setShowForm] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [form, setForm] = useState(emptyForm);
	const [saving, setSaving] = useState(false);
	const [formError, setFormError] = useState("");

	useEffect(() => {
		const unsubscribe = subscribeToUsers(
			(items) => {
				setUsers(items);
				setLoading(false);
			},
			(err) => {
				setLoadError(err.message || "Failed to load users.");
				setLoading(false);
			}
		);
		return unsubscribe;
	}, []);

	const openAddForm = () => {
		setEditingId(null);
		setForm(emptyForm);
		setFormError("");
		setShowForm(true);
	};

	const openEditForm = (user) => {
		setEditingId(user.id);
		setForm({ username: user.username || "", email: user.email || "", password: "" });
		setFormError("");
		setShowForm(true);
	};

	const closeForm = () => {
		setShowForm(false);
		setEditingId(null);
		setForm(emptyForm);
		setFormError("");
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormError("");

		if (editingId !== null) {
			if (!form.username.trim()) {
				setFormError("Username is required.");
				return;
			}
			setSaving(true);
			try {
				await updateUserProfile(editingId, { username: form.username.trim() });
				closeForm();
			} catch (err) {
				setFormError(err.message || "Failed to update user.");
			} finally {
				setSaving(false);
			}
			return;
		}

		// Adding a brand-new user creates a real Firebase Auth account.
		if (!form.username.trim() || !form.email.trim() || !form.password) {
			setFormError("Username, email, and password are all required.");
			return;
		}
		if (form.password.length < 6) {
			setFormError("Password must be at least 6 characters.");
			return;
		}

		setSaving(true);
		try {
			await adminCreateUser(form.email.trim(), form.password, form.username.trim());
			closeForm();
		} catch (err) {
			setFormError(friendlyAuthError(err));
		} finally {
			setSaving(false);
		}
	};

	const handleDelete = async (id) => {
		try {
			await deleteUserProfile(id);
		} catch (err) {
			setLoadError(err.message || "Failed to delete user.");
		}
	};

	return (
		<div className="users_data_container">
			<div className="users_data_toolbar">
				<button id="add_user_button" onClick={openAddForm}>
					+ Add User
				</button>
			</div>

			<div className="user_data_header">
				<p>USERNAME</p>
				<p>EMAIL</p>
				<p>ACTIONS</p>
			</div>

			{loading && <div className="no_users_row">Loading users...</div>}
			{!loading && loadError && <div className="no_users_row error_row">{loadError}</div>}
			{!loading && !loadError && users.length === 0 && (
				<div className="no_users_row">No users yet.</div>
			)}

			{users.map((user) => (
				<div className="user_data_row" key={user.id}>
					<h4>{user.username}</h4>
					<p>{user.email}</p>
					<div className="action_buttons">
						<div id="user_edit_button" onClick={() => openEditForm(user)}>
							Edit
						</div>
						<div id="user_delete_button" onClick={() => handleDelete(user.id)}>
							Delete
						</div>
					</div>
				</div>
			))}

			{showForm && (
				<div className="user_form_overlay">
					<form className="user_form" onSubmit={handleSubmit}>
						<h3>{editingId !== null ? "Edit User" : "Add User"}</h3>

						<div className="form_item_container">
							<label>Username</label>
							<input
								type="text"
								name="username"
								placeholder="username"
								value={form.username}
								onChange={handleChange}
							/>
						</div>

						{editingId === null && (
							<>
								<div className="form_item_container">
									<label>Email</label>
									<input
										type="email"
										name="email"
										placeholder="email"
										value={form.email}
										onChange={handleChange}
									/>
								</div>

								<div className="form_item_container">
									<label>Password</label>
									<input
										type="password"
										name="password"
										placeholder="password (min 6 characters)"
										value={form.password}
										onChange={handleChange}
									/>
								</div>
							</>
						)}

						{editingId !== null && (
							<p className="form_note">
								Email and password can't be changed from here — only the display
								username.
							</p>
						)}

						{formError && <p className="form_error">{formError}</p>}

						<div className="user_form_buttons">
							<button type="submit" id="save_user_button" disabled={saving}>
								{saving ? "Saving..." : editingId !== null ? "Save Changes" : "Add User"}
							</button>
							<button
								type="button"
								id="cancel_user_button"
								onClick={closeForm}
								disabled={saving}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

function friendlyAuthError(err) {
	switch (err?.code) {
		case "auth/email-already-in-use":
			return "An account with that email already exists.";
		case "auth/invalid-email":
			return "That email address doesn't look right.";
		case "auth/weak-password":
			return "Password is too weak. Use at least 6 characters.";
		default:
			return err?.message || "Something went wrong. Please try again.";
	}
}

export default UsersDashboardData;
