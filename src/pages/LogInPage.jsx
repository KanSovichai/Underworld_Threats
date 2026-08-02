import "../styles/LogInPage.css";
// import Navbar from "../components/Navbar";
import Logo from "../assets/resource/Underworld_threats_logo.png";
import { Link } from "react-router-dom";
// import Footer from "../components/Footer";

const Login = () => {
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
				<form action="" className="login_form">
					<h3>Login</h3>
					<div className="label_input_wrapper">
						<label htmlFor="">Email</label>
						<input type="email" />
					</div>

					<div className="label_input_wrapper">
						<label htmlFor="">Password</label>
						<input type="password" />
					</div>

					<div className="register_prompt">
						<p>
							Don't have an account? <Link to='/auth/register' >Register</Link>
						</p>
					</div>

					<button className="login">Login</button>
					<p></p>
				</form>
			</div>
		</div>
	);
};

export default Login;
