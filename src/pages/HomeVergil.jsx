import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Intro from "../assets/resource/judgement_cut_end.mp4"
import "../styles/HomeVergil.css";
const HomeVergil = (props) => {
	const videoRef = useRef(null);
	const containerRef = useRef(null)
	useEffect(() => {
		const video = videoRef.current;
		const container = containerRef.current;
		if (!video || !container) return;

		const handleEnded = () => {
			video.style.display = "none";
			container.style.animation = "fadeIn 2s ease-in-out";
		};

		video.addEventListener("ended", handleEnded);
		return () => video.removeEventListener("ended", handleEnded);
	}
		
	,[]);


	return (
		<div ref={ containerRef } id="vergil_main_container">
			<div className="hero_vergil_container">

				<video ref={videoRef} src={ Intro } autoPlay muted playsInline id="intro_mp4"></video>	

				<div className="vergil_navbar_wrapper">
					<Navbar status={props.status}></Navbar>
				</div>
				<div className="hero_vergil_contents">
					<div className="slash_effect"></div>
					<div className="hero_vergil_text">
						<h1>The Alpha & Omega</h1>
					</div>
					<div className="hero_vergil_img"></div>
				</div>
			</div>
			<div className="vergil_container">
				<div className="vergil_description_container">
					<h1>Vergil</h1>
					<p>
						Vergil is Dante's twin brother and one of the most compelling
						antagonists in the Devil May Cry series—a tragic figure consumed by
						an obsession with power and an unyielding pursuit of his demonic
						heritage. Where Dante embraces his humanity, Vergil rejects it,
						viewing compassion as weakness and seeking to transcend the
						limitations of his mixed bloodline.
					</p>
				</div>
			</div>

			<div className="vergil_feature_items_container">
				<div className="vergil_items_container">


					<div className="vergil_item_card">
                        <div className="vergil_item_content">
                            <div className="vergil_item_img">
                                <img src="https://i.ebayimg.com/images/g/oJYAAeSwK~pog0vU/s-l1200.jpg" alt="" />
                            </div>
                            <div className="vergil_item_title">
                                <h1>Vergil Jacket</h1>
                            </div>
                            <button className="vergil_view_button">
                                VIEW
                            </button>
                        </div>
                    </div>
					<div className="vergil_item_card">
                        <div className="vergil_item_content">
                            <div className="vergil_item_img">
                                <img src="https://i.ebayimg.com/images/g/oJYAAeSwK~pog0vU/s-l1200.jpg" alt="" />
                            </div>
                            <div className="vergil_item_title">
                                <h1>Vergil Jacket</h1>
                            </div>
                            <button className="vergil_view_button">
                                VIEW
                            </button>
                        </div>
                    </div>
					<div className="vergil_item_card">
                        <div className="vergil_item_content">
                            <div className="vergil_item_img">
                                <img src="https://i.ebayimg.com/images/g/oJYAAeSwK~pog0vU/s-l1200.jpg" alt="" />
                            </div>
                            <div className="vergil_item_title">
                                <h1>Vergil Jacket</h1>
                            </div>
                            <button className="vergil_view_button">
                                VIEW
                            </button>
                        </div>
                    </div>
					<div className="vergil_item_card">
                        <div className="vergil_item_content">
                            <div className="vergil_item_img">
                                <img src="https://i.ebayimg.com/images/g/oJYAAeSwK~pog0vU/s-l1200.jpg" alt="" />
                            </div>
                            <div className="vergil_item_title">
                                <h1>Vergil Jacket</h1>
                            </div>
                            <button className="vergil_view_button">
                                VIEW
                            </button>
                        </div>
                    </div>
				</div>
			</div>
			
			<div className="vergil_footer_wrapper">
				<Footer></Footer>
			</div>

			

		</div>
	);
};

export default HomeVergil;
