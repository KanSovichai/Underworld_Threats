import "../styles/Register.css";
// import Navbar from "../components/Navbar";
import Logo from "../assets/resource/Underworld_threats_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../firebase/users";
// import Footer from "../components/Footer";

const Register = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (!form.username.trim() || !form.email.trim() || !form.password) {
			setError("Please fill in all fields.");
			return;
		}
		if (form.password !== form.confirmPassword) {
			setError("Passwords don't match.");
			return;
		}
		if (form.password.length < 6) {
			setError("Password must be at least 6 characters.");
			return;
		}

		setSubmitting(true);
		try {
			await registerUser(form.email.trim(), form.password, form.username.trim());
			navigate("/dashboard");
		} catch (err) {
			setError(friendlyAuthError(err));
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="register_container">
			<div className="register_logo_container">
				<Link to='/' >
					<div className="register_logo_wrapper">
						<img src={Logo} alt="" />
					</div>
				</Link>
			</div>

			<div className="register_form_container">
				<form className="register_form" onSubmit={handleSubmit}>
					<h3>Register</h3>

					<div className="label_input_wrapper">
						<label htmlFor="register_username">Username</label>
						<input
							id="register_username"
							type="text"
							name="username"
							value={form.username}
							onChange={handleChange}
						/>
					</div>

					<div className="label_input_wrapper">
						<label htmlFor="register_email">Email</label>
						<input
							id="register_email"
							type="email"
							name="email"
							value={form.email}
							onChange={handleChange}
						/>
					</div>

					<div className="label_input_wrapper">
						<label htmlFor="register_password">Password</label>
						<input
							id="register_password"
							type="password"
							name="password"
							value={form.password}
							onChange={handleChange}
						/>
					</div>

					<div className="label_input_wrapper">
						<label htmlFor="register_confirm_password">Confirm Password</label>
						<input
							id="register_confirm_password"
							type="password"
							name="confirmPassword"
							value={form.confirmPassword}
							onChange={handleChange}
						/>
					</div>

					<div className="login_prompt">
						<p>
							Already have an account? <Link to='/auth/login' >Login</Link>
						</p>
					</div>

					<button className="register" type="submit" disabled={submitting}>
						{submitting ? "Creating account..." : "Register"}
					</button>
					<p className="auth_error">{error}</p>
				</form>
			</div>
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

export default Register;
