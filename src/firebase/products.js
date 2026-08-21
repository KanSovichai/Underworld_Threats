import {
	collection,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
	onSnapshot,
	serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

const productsCollection = collection(db, "products");

// Subscribes to the products collection in real time. Returns an
// unsubscribe function — call it in a useEffect cleanup.
//
// NOTE: this intentionally does NOT use a Firestore `orderBy("createdAt")`
// query. Firestore's orderBy silently excludes any document that's
// missing the ordered field (e.g. a product added by hand through the
// Firestore console, or an older doc from before this field existed) —
// it looks like "no products" instead of erroring, which is a nasty trap.
// Instead we fetch everything and sort client-side, which is safe either
// way.
export function subscribeToProducts(onChange, onError) {
	return onSnapshot(
		productsCollection,
		(snapshot) => {
			const products = snapshot.docs.map((docSnap) => ({
				id: docSnap.id,
				...docSnap.data(),
			}));
			products.sort((a, b) => {
				const aTime = a.createdAt?.toMillis?.() ?? 0;
				const bTime = b.createdAt?.toMillis?.() ?? 0;
				return bTime - aTime;
			});
			onChange(products);
		},
		onError
	);
}

export async function createProduct({ name, price, category, image, imagePublicId }) {
	return addDoc(productsCollection, {
		name,
		price,
		category,
		image: image || "",
		imagePublicId: imagePublicId || "",
		createdAt: serverTimestamp(),
	});
}

export async function updateProduct(id, { name, price, category, image, imagePublicId }) {
	const productRef = doc(db, "products", id);
	return updateDoc(productRef, {
		name,
		price,
		category,
		image: image || "",
		imagePublicId: imagePublicId || "",
	});
}

export async function deleteProduct(id) {
	const productRef = doc(db, "products", id);
	return deleteDoc(productRef);
}
