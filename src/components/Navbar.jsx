import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
// import "../scripts/Navbar.js";
import Logo from "../assets/resource/Underworld_threats_logo.png";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../firebase/users";

const Navbar = (props) => {
	const { currentUser, profile, isAdmin } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logoutUser();
		navigate("/");
	};

	return (
		<header>
			<div className="logo_wrapper">
				<img src={Logo} alt="" />
			</div>
			<nav className="nav_container">
				<ul>
					<li>
						<a
							href=""
							id="Dante_A_Tag"
							className={props.status == "activeDante" ? "activeDante" : ""}
						>
							<Link to="/">Dante</Link>
						</a>
					</li>
					<li>
						<a
							href=""
							id="Vergil_A_Tag"
							className={props.status == "activeVergil" ? "activeVergil" : ""}
						>
							<Link to="/vergil">Vergil</Link>
						</a>
					</li>
					{!currentUser && (
						<li className="mobile_login_item">
							<Link to="/auth/login" className="login_button">
								Login
							</Link>
						</li>
					)}
				</ul>
				<input
					id="toggle-input"
					aria-expanded="false"
					type="checkbox"
					aria-controls="nav-links"
					class="toggle-input"
				/>
				<label for="toggle-input" class="toggle-label">
					☰
				</label>
			</nav>

			<div className="profile_wrapper">
				<ul>
					<li>
						<Link to="/aboutus">
							<a href="">About Us</a>
						</Link>
					</li>
					<li>
						<Link to="/contactus">
							<a href="">Contact Us</a>
						</Link>
					</li>
					<li>
						<Link to="/shop">
							<a href="">Shop</a>
						</Link>
					</li>
				</ul>

				<div className="profile">
					{currentUser ? (
						<>
							<div className="username">
								{profile?.username || currentUser.email}
							</div>
							<div className="profile_picture">
								<h2>
									{(profile?.username || currentUser.email || "?")
										.charAt(0)
										.toUpperCase()}
								</h2>
							</div>
							{isAdmin && (
								<Link to="/dashboard" className="login_button">
									Dashboard
								</Link>
							)}
							<button
								onClick={handleLogout}
								className="login_button logout_button"
							>
								Logout
							</button>
						</>
					) : (
						<Link to="/auth/login" className="login_button">
							Login
						</Link>
					)}
				</div>
			</div>
		</header>
	);
};
export default Navbar;
