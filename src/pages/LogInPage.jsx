import "../styles/LogInPage.css";
// import Navbar from "../components/Navbar";
import Logo from "../assets/resource/Underworld_threats_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../firebase/users";
// import Footer from "../components/Footer";

const Login = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (!form.email.trim() || !form.password.trim()) {
			setError("Please fill in both fields.");
			return;
		}

		setSubmitting(true);
		try {
			await loginUser(form.email.trim(), form.password);
			navigate("/dashboard");
		} catch (err) {
			setError(friendlyAuthError(err));
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="login_container">
			<div className="login_logo_container">
				<Link to='/' >
					<div className="login_logo_wrapper">
						<img src={Logo} alt="" />
					</div>
				</Link>
			</div>

			<div className="login_form_container">
				<form className="login_form" onSubmit={handleSubmit}>
					<h3>Login</h3>
					<div className="label_input_wrapper">
						<label htmlFor="login_email">Email</label>
						<input
							id="login_email"
							type="email"
							name="email"
							value={form.email}
							onChange={handleChange}
						/>
					</div>

					<div className="label_input_wrapper">
						<label htmlFor="login_password">Password</label>
						<input
							id="login_password"
							type="password"
							name="password"
							value={form.password}
							onChange={handleChange}
						/>
					</div>

					<div className="register_prompt">
						<p>
							Don't have an account? <Link to='/auth/register' >Register</Link>
						</p>
					</div>

					<button className="login" type="submit" disabled={submitting}>
						{submitting ? "Logging in..." : "Login"}
					</button>
					<p className="auth_error">{error}</p>
				</form>
			</div>
		</div>
	);
};

// Maps common Firebase Auth error codes to plain-language messages.
function friendlyAuthError(err) {
	switch (err?.code) {
		case "auth/invalid-credential":
		case "auth/wrong-password":
		case "auth/user-not-found":
			return "Incorrect email or password.";
		case "auth/invalid-email":
			return "That email address doesn't look right.";
		case "auth/too-many-requests":
			return "Too many attempts. Please wait a moment and try again.";
		default:
			return err?.message || "Something went wrong. Please try again.";
	}
}

export default Login;
