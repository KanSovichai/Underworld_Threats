import "../styles/ShopPage.css";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { subscribeToProducts } from "../firebase/products";

const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

// The product form always saves a Cloudinary `image` URL directly, so this
// is mostly a defensive fallback for older/hand-edited documents that only
// have an `imagePublicId` on them.
function getProductImage(product) {
	if (typeof product.image === "string" && product.image.trim()) {
		return product.image.trim();
	}
	if (product.imagePublicId && cloudinaryCloudName) {
		return `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/f_auto,q_auto/${product.imagePublicId}.jpg`;
	}
	return "";
}

const ShopPage = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [loadError, setLoadError] = useState("");
	const [brokenImageIds, setBrokenImageIds] = useState(() => new Set());

	useEffect(() => {
		const unsubscribe = subscribeToProducts(
			(items) => {
				setProducts(items);
				setLoading(false);
			},
			(err) => {
				setLoadError(err.message || "Failed to load products.");
				setLoading(false);
			},
		);
		return unsubscribe;
	}, []);

	const getProductsByCategory = (category) =>
		products.filter(
			(product) => product.category?.toLowerCase() === category.toLowerCase(),
		);

	const renderProducts = (items, cardClass, buttonClass) => {
		if (loading) {
			return <div className="shop_status">Loading products...</div>;
		}
		if (loadError) {
			return <div className="shop_status shop_error">{loadError}</div>;
		}
		if (items.length === 0) {
			return <div className="shop_status">No products available yet.</div>;
		}

		return items.map((item) => {
			const imageUrl = getProductImage(item);
			const imageBroken = brokenImageIds.has(item.id);

			return (
				<div className={`shop_item_card ${cardClass}`} key={item.id}>
					<div className="item_image_wrapper">
						{imageUrl && !imageBroken ? (
							<img
								src={imageUrl}
								alt={item.name}
								onError={() => {
									// Logged so a failed load is visible in devtools instead
									// of just silently disappearing.
									console.error(
										`Image failed to load for "${item.name}":`,
										imageUrl,
									);
									setBrokenImageIds((prev) => new Set(prev).add(item.id));
								}}
							/>
						) : (
							<span className="no_image">
								{imageBroken ? "Image failed to load" : "No image available"}
							</span>
						)}
					</div>
					<h3>{item.name}</h3>
					<p className="item_price">${item.price}</p>
					<button className={`buy_button ${buttonClass}`}>Add to Cart</button>
				</div>
			);
		});
	};

	return (
		<div>
			<div className="shop_page_container">
				<div className="shop_navbar_wrapper">
					<Navbar></Navbar>
				</div>

				<div className="shop_header">
					<h1>SHOP</h1>
					<p>Gear worthy of the Sons of Sparda.</p>
				</div>

				<div className="shop_category dante_category">
					<h2 className="category_title dante_title">Dante Items</h2>
					<div className="items_grid">
						{renderProducts(
							getProductsByCategory("Dante"),
							"dante_card",
							"dante_buy",
						)}
					</div>
				</div>

				<div className="shop_category vergil_category">
					<h2 className="category_title vergil_title">Vergil Items</h2>
					<div className="items_grid">
						{renderProducts(
							getProductsByCategory("Vergil"),
							"vergil_card",
							"vergil_buy",
						)}
					</div>
				</div>
			</div>

			<div className="shop_footer_wrapper">
				<Footer></Footer>
			</div>
		</div>
	);
};

export default ShopPage;
