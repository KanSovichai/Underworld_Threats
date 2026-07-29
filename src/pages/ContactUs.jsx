import "../styles/ContactUs.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
	return (
		<div>
			<div className="contact_container">
				<div className="contact_navbar_wrapper">
					<Navbar></Navbar>
				</div>
				<div class="contact_form_container">
					<form action="">
						<h1>Send Us a Message</h1>
						<div class="form_item_container">
							<label for="">Name</label>
							<input type="text" placeholder="your name" />
						</div>
						<div class="form_item_container">
							<label for="">Email</label>
							<input type="email" placeholder="your email" />
						</div>
						<div class="form_item_container">
							<label for="">Message</label>
							<textarea placeholder="your message"></textarea>
						</div>
						<button>Send</button>
					</form>
				</div>
			</div>

			<div className="contact_footer_wrapper">
				<Footer></Footer>
			</div>
		</div>
	);
};

export default Contact;
