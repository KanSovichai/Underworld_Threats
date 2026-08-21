// Uploads an image file straight from the browser to Cloudinary using an
// UNSIGNED upload preset (no API secret exposed on the client). Returns the
// hosted `secure_url`, which is what gets saved on the product document in
// Firestore.
//
// Setup (free Cloudinary account):
// 1. Sign up at https://cloudinary.com
// 2. Dashboard -> note your "Cloud Name"
// 3. Settings -> Upload -> Upload presets -> Add upload preset
//    - Set "Signing Mode" to "Unsigned"
//    - (optional) set a folder name like "underworld-threats/products"
// 4. Put the cloud name + preset name in .env.local (see .env.example)

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export async function uploadImageToCloudinary(file) {
	if (!CLOUD_NAME || !UPLOAD_PRESET) {
		throw new Error(
			"Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env.local"
		);
	}

	const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", UPLOAD_PRESET);
	formData.append("folder", "underworld-threats/products");

	const response = await fetch(url, {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		const errorBody = await response.json().catch(() => null);
		throw new Error(
			errorBody?.error?.message || "Cloudinary upload failed"
		);
	}

	const data = await response.json();
	// secure_url is the permanent hosted https link for the image
	return { url: data.secure_url, publicId: data.public_id };
}
