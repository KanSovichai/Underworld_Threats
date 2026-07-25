import Navbar from "../components/Navbar";
import "../styles/HomeVergil.css";
const HomeVergil = (props) => {
	return (
		<div>
            <div className="hero_vergil_container">
                <div className="vergil_navbar_wrapper">
					<Navbar status={props.status}></Navbar>
				</div>
				<div className="hero_vergil_contents">
					<div className="slash_effect">
							
					</div>
					<div className="hero_vergil_text">
						<h1>The Alpha & Omega</h1>
					</div>
					<div className="hero_vergil_img">
						
					</div>
				</div>
            </div>
			<div className="vergil_container">
				
			</div>
		</div>
	);
};

export default HomeVergil;
