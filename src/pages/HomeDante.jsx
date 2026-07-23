import Navbar from "../components/Navbar";
import "../styles/HomeDante.css";
import GothicDante from "../assets/resource/Gothic_not_dante.webp";
const Home = (props) => {
	return (
		<div className="container">
			<div className="nav_wrapper">
				<Navbar status={props.status}></Navbar>
			</div>
			<div className="hero_text_container">
				<h1>The devil Hunter</h1>
			</div>
			<div className="description_container">
				<img src={GothicDante} alt="" />
				<div className="context_container">
					<div className="text_container">
						<h1>Dante</h1>
						<p>
							Dante is the iconic protagonist of Capcom's Devil May Cry action
							series—a half-human, half-demon demon hunter who operates out of a
							gothic, demon-plagued city. As the son of the legendary Dark
							Knight Sparda (a demon who rebelled against his own kind) and the
							human Eva, Dante inherited immense supernatural power while
							retaining his humanity.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Home;
