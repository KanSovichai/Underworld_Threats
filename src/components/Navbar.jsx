import { Link } from "react-router-dom";
import "../styles/Navbar.css";
// import "../scripts/Navbar.js";
import Logo from "../assets/resource/Underworld_threats_logo.png";
const Navbar = (props) => {
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
				</ul>
				<input
						id="toggle-input"
						aria-expanded="false"
						type="checkbox"
						aria-controls="nav-links"
						class="toggle-input"
					/>
				<label for="toggle-input" class="toggle-label">☰</label>
			</nav>

			<div className="profile_wrapper">
				<ul>
					<li><Link to='/aboutus' ><a href="">About Us</a></Link></li>
					<li><Link to="/contactus" ><a href="">Contact Us</a></Link></li>
				</ul>

				<div className="profile">
					<div className="username">Guess</div>
					<div className="profile_picture">
						<h2>G</h2>
					</div>
				</div>
			</div>
		</header>
	);
};
export default Navbar;
