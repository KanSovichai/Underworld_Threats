import "../styles/Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
	return (
		<footer>
			<div className="Footer_container">
				<div className="left_container"></div>
				<div className="right_container">
					<div className="about_us_container">
						<h2>ABOUT US</h2>
						<ul>
							<li>
								<Link to="/aboutus"><a>About Us</a></Link>
							</li>
							<li>Terms & Conditions</li>
							<li>EULA</li>
							<li>Privacy Policy</li>
						</ul>
					</div>
					<div className="contact_us_container">
						<h2>CONTACT US</h2>
						<ul>
							<li>
								<a>
									Contact Us
								</a>
							</li>
							<li>Email</li>
							<li>Phone</li>
						</ul>
					</div>
				</div>
			</div>
			<hr />
			<div className="copyright">
                <h3>©2026 copyright all reserve Underworld Threats</h3>
            </div>
		</footer>
	);
};
export default Footer;
