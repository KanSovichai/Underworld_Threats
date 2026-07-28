import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/AboutPage.css";
const About = () => {
	return (
		<div>
			<div className="about_page_container">
				<div className="about_us_navbar_wrapper">
					<Navbar></Navbar>
				</div>
				<div className="about_us_text">
					<p>
						Power, precision, and a little bit of style. We sell merges worthy
						of the Sons of Sparda.
					</p>
				</div>
			</div>

			<div className="questions_container">
				<div className="left_answer_container">
					<div className="question_answer_container">
						<h2>WHO ARE WE?</h2>
						<p>
							We are an unofficial Devil May Cry merch E commerce store. We are
							based in Cambodia. We're the first ever Devil May Cry-only's E
							store in Cambodia.
						</p>
					</div>
				</div>
				<div className="right_answer_container">
					<div className="question_answer_container">
						<h2>WHAT IS OUR PURPOSE?</h2>
						<p>
							We exist to cut out the grind and hand you power on a silver
							platter. Like Vergil, we believe strength shouldn't require
							endless struggle. Like Dante, we know you want to look damn good
							getting it. That's our purpose. Now go show the underworld why
							they should fear you.
						</p>
					</div>
				</div>
			</div>

            <div className="about_us_footer_wrapper">
                <Footer></Footer>
            </div>
		</div>
	);
};

export default About;
