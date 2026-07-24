import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/HomeDante.css";
import GothicDante from "../assets/resource/Gothic_not_dante.webp";
import DanteSword from "../assets/resource/Dante_sword.jpg";

const Home = (props) => {
	return (
		<div className="container">
			<div className="hero_container">
				<div className="nav_wrapper">
					<Navbar status={props.status}></Navbar>
				</div>
				<div className="hero_text_container">
					<h1>The devil Hunter</h1>
				</div>
			</div>
			<div className="description_container">
				<img src={GothicDante} id="gothic_dante_img" alt="" />
				<div className="context_container">
					<div className="dante_bg_wrapper">
						<div className="text_container">
							<h1>Dante</h1>
							<p>
								Dante is the iconic protagonist of Capcom's Devil May Cry action
								series—a half-human, half-demon demon hunter who operates out of
								a gothic, demon-plagued city. As the son of the legendary Dark
								Knight Sparda (a demon who rebelled against his own kind) and
								the human Eva, Dante inherited immense supernatural power while
								retaining his humanity.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="feature_dante_container">
				<div className="broken_wood_wrapper"></div>
			</div>

			<div className="banner_wrapper">
				<div className="dante_sword_wrapper">
					<img src={DanteSword} alt="" />
				</div>
                <h1 className="banner_text">Get the son of sparda's items today.</h1>
			</div>

            <div className="items_container">
                <div className="items">


                    <div className="item_card">
                        <div className="frame_style"></div>
                        <div className="content">
                            <div className="item_img">
                                <img src="https://m.media-amazon.com/images/I/71gt1HB3kDL._AC_UY350_.jpg" alt="" />
                            </div>
                            <div className="item_title">
                                <h1>Dante Sword</h1>
                            </div>
                            <button className="view_button">
                                VIEW
                            </button>
                        </div>
                    </div>

					<div className="item_card">
                        <div className="frame_style"></div>
                        <div className="content">
                            <div className="item_img">
                                <img src="https://m.media-amazon.com/images/I/71gt1HB3kDL._AC_UY350_.jpg" alt="" />
                            </div>
                            <div className="item_title">
                                <h1>Dante Sword</h1>
                            </div>
                            <button className="view_button">
                                VIEW
                            </button>
                        </div>
                    </div>

					<div className="item_card">
                        <div className="frame_style"></div>
                        <div className="content">
                            <div className="item_img">
                                <img src="https://m.media-amazon.com/images/I/71gt1HB3kDL._AC_UY350_.jpg" alt="" />
                            </div>
                            <div className="item_title">
                                <h1>Dante Sword</h1>
                            </div>
                            <button className="view_button">
                                VIEW
                            </button>
                        </div>
                    </div>

					<div className="item_card">
                        <div className="frame_style"></div>
                        <div className="content">
                            <div className="item_img">
                                <img src="https://m.media-amazon.com/images/I/71gt1HB3kDL._AC_UY350_.jpg" alt="" />
                            </div>
                            <div className="item_title">
                                <h1>Dante Sword</h1>
                            </div>
                            <button className="view_button">
                                VIEW
                            </button>
                        </div>
                    </div>

                    
                
                
                </div>
                <div className="dante_pic_right_banner">
                </div>
            </div>

            <div className="footer_wrapper">
                <Footer></Footer>
            </div>

		</div>
	);
};
export default Home;
