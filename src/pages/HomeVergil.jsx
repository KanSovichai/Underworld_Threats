import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Intro from "../assets/resource/judgement_cut_end.mp4";
import "../styles/HomeVergil.css";
import { subscribeToProducts } from "../firebase/products";

const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

function getProductImage(product) {
	if (typeof product.image === "string" && product.image.trim()) {
		return product.image.trim();
	}
	if (product.imagePublicId && cloudinaryCloudName) {
		return `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/f_auto,q_auto/${product.imagePublicId}.jpg`;
	}
	return "";
}

const HomeVergil = (props) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [loadError, setLoadError] = useState("");
	const videoRef = useRef(null);
	const containerRef = useRef(null);

	useEffect(() => {
		const unsubscribe = subscribeToProducts(
			(items) => {
				setProducts(
					items.filter(
						(product) => product.category?.toLowerCase() === "vergil",
					),
				);
				setLoading(false);
			},
			(err) => {
				setLoadError(err.message || "Failed to load products.");
				setLoading(false);
			},
		);
		return unsubscribe;
	}, []);

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
	}, []);

	return (
		<div ref={containerRef} id="vergil_main_container">
			<div className="hero_vergil_container">
				<video
					ref={videoRef}
					src={Intro}
					autoPlay
					muted
					playsInline
					id="intro_mp4"
				></video>

				<div className="vergil_navbar_wrapper">
					<Navbar status={props.status}></Navbar>
				</div>
				<div className="hero_vergil_contents">
					<div className="hero_vergil_text">
						<h1>The Alpha & Omega</h1>
					</div>
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
					{loading && (
						<div className="vergil_item_title">Loading products...</div>
					)}
					{!loading && loadError && (
						<div className="vergil_item_title">{loadError}</div>
					)}
					{!loading && !loadError && products.length === 0 && (
						<div className="vergil_item_title">
							No Vergil products available yet.
						</div>
					)}
					{products.map((product) => {
						const imageUrl = getProductImage(product);

						return (
							<div className="vergil_item_card" key={product.id}>
								<div className="vergil_item_content">
									<div className="vergil_item_img">
										{imageUrl ? (
											<img src={imageUrl} alt={product.name} />
										) : (
											<span className="no_image">No image available</span>
										)}
									</div>
									<div className="vergil_item_title">
										<h1>{product.name}</h1>
									</div>
									<button className="vergil_view_button">VIEW</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			<div className="vergil_footer_wrapper">
				<Footer></Footer>
			</div>
		</div>
	);
};

export default HomeVergil;
