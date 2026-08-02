import "../styles/Register.css";
// import Navbar from "../components/Navbar";
import Logo from "../assets/resource/Underworld_threats_logo.png";
import { Link } from "react-router-dom";
// import Footer from "../components/Footer";

const Login = () => {
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
				<form action="" className="register_form">
					<h3>Register</h3>
					<div className="label_input_wrapper">
						<label htmlFor="">Email</label>
						<input type="email" />
					</div>

					<div className="label_input_wrapper">
						<label htmlFor="">Password</label>
						<input type="password" />
					</div>

                    <div className="label_input_wrapper">
						<label htmlFor="">Confirm Password</label>
						<input type="password" />
					</div>

					<div className="login_prompt">
						<p>
							Already have an account? <Link to='/auth/login' >Login</Link>
						</p>
					</div>

					<button className="register">Register</button>
					<p></p>
				</form>
			</div>
		</div>
	);
};

export default Login;
