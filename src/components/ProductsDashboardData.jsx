import "../styles/ProductsDashboardData.css";
import { useEffect, useState } from "react";
import {
	subscribeToProducts,
	createProduct,
	updateProduct,
	deleteProduct,
} from "../firebase/products";
import { uploadImageToCloudinary } from "../firebase/cloudinary";

const emptyForm = { name: "", price: "", category: "Dante", image: "", imagePublicId: "" };

const ProductsDashboardData = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [loadError, setLoadError] = useState("");

	const [showForm, setShowForm] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [form, setForm] = useState(emptyForm);
	const [imageFile, setImageFile] = useState(null);
	const [imagePreview, setImagePreview] = useState("");
	const [uploading, setUploading] = useState(false);
	const [saving, setSaving] = useState(false);
	const [formError, setFormError] = useState("");

	useEffect(() => {
		const unsubscribe = subscribeToProducts(
			(items) => {
				setProducts(items);
				setLoading(false);
			},
			(err) => {
				setLoadError(err.message || "Failed to load products.");
				setLoading(false);
			}
		);
		return unsubscribe;
	}, []);

	const openAddForm = () => {
		setEditingId(null);
		setForm(emptyForm);
		setImageFile(null);
		setImagePreview("");
		setFormError("");
		setShowForm(true);
	};

	const openEditForm = (product) => {
		setEditingId(product.id);
		setForm({
			name: product.name,
			price: product.price,
			category: product.category,
			image: product.image || "",
			imagePublicId: product.imagePublicId || "",
		});
		setImageFile(null);
		setImagePreview(product.image || "");
		setFormError("");
		setShowForm(true);
	};

	const closeForm = () => {
		setShowForm(false);
		setEditingId(null);
		setForm(emptyForm);
		setImageFile(null);
		setImagePreview("");
		setFormError("");
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleImageChange = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setImageFile(file);
		setImagePreview(URL.createObjectURL(file));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormError("");

		if (!form.name.trim() || !form.price.trim()) {
			setFormError("Name and price are required.");
			return;
		}

		setSaving(true);
		try {
			let imageUrl = form.image;
			let imagePublicId = form.imagePublicId;

			// Only hits Cloudinary if the admin actually picked a new file.
			if (imageFile) {
				setUploading(true);
				const uploaded = await uploadImageToCloudinary(imageFile);
				imageUrl = uploaded.url;
				imagePublicId = uploaded.publicId;
				setUploading(false);
			}

			const payload = {
				name: form.name.trim(),
				price: form.price.trim(),
				category: form.category,
				image: imageUrl,
				imagePublicId,
			};

			if (editingId !== null) {
				await updateProduct(editingId, payload);
			} else {
				await createProduct(payload);
			}
			closeForm();
		} catch (err) {
			setUploading(false);
			setFormError(err.message || "Something went wrong while saving.");
		} finally {
			setSaving(false);
		}
	};

	const handleDelete = async (id) => {
		try {
			await deleteProduct(id);
		} catch (err) {
			setLoadError(err.message || "Failed to delete product.");
		}
	};

	return (
		<div className="products_data_container">
			<div className="products_data_toolbar">
				<button id="add_product_button" onClick={openAddForm}>
					+ Add Product
				</button>
			</div>

			<div className="products_data_header">
				<p className="col_image">IMAGE</p>
				<p>NAME</p>
				<p>PRICE</p>
				<p>CATEGORY</p>
				<p>ACTIONS</p>
			</div>

			{loading && <div className="no_products_row">Loading products...</div>}
			{!loading && loadError && (
				<div className="no_products_row error_row">{loadError}</div>
			)}
			{!loading && !loadError && products.length === 0 && (
				<div className="no_products_row">No products yet.</div>
			)}

			{products.map((product) => (
				<div className="products_data_row" key={product.id}>
					<div className="col_image product_thumb">
						{product.image ? (
							<img src={product.image} alt={product.name} />
						) : (
							<span className="no_image">No image</span>
						)}
					</div>
					<h4>{product.name}</h4>
					<p>${product.price}</p>
					<p>{product.category}</p>
					<div className="action_buttons">
						<div id="product_edit_button" onClick={() => openEditForm(product)}>
							Edit
						</div>
						<div id="product_delete_button" onClick={() => handleDelete(product.id)}>
							Delete
						</div>
					</div>
				</div>
			))}

			{showForm && (
				<div className="product_form_overlay">
					<form className="product_form" onSubmit={handleSubmit}>
						<h3>{editingId !== null ? "Edit Product" : "Add Product"}</h3>

						<div className="form_item_container">
							<label>Product Name</label>
							<input
								type="text"
								name="name"
								placeholder="product name"
								value={form.name}
								onChange={handleChange}
							/>
						</div>

						<div className="form_item_container">
							<label>Price</label>
							<input
								type="number"
								step="0.01"
								name="price"
								placeholder="0.00"
								value={form.price}
								onChange={handleChange}
							/>
						</div>

						<div className="form_item_container">
							<label>Category</label>
							<select name="category" value={form.category} onChange={handleChange}>
								<option value="Dante">Dante</option>
								<option value="Vergil">Vergil</option>
							</select>
						</div>

						<div className="form_item_container">
							<label>Product Image</label>
							<input type="file" accept="image/*" onChange={handleImageChange} />
							{imagePreview && (
								<div className="image_preview_wrapper">
									<img src={imagePreview} alt="preview" />
								</div>
							)}
							{uploading && <p className="upload_status">Uploading image...</p>}
						</div>

						{formError && <p className="form_error">{formError}</p>}

						<div className="product_form_buttons">
							<button type="submit" id="save_product_button" disabled={saving}>
								{saving
									? "Saving..."
									: editingId !== null
									? "Save Changes"
									: "Add Product"}
							</button>
							<button
								type="button"
								id="cancel_product_button"
								onClick={closeForm}
								disabled={saving}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default ProductsDashboardData;
