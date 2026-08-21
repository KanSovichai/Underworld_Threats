# Optional: full user deletion (Cloud Function)

The client SDK can delete a user's Firestore *profile document*
(`deleteUserProfile` in `src/firebase/users.js`), but it cannot delete
*another user's* Firebase Auth account — only a signed-in user can delete
their own account from the client. Fully removing someone's login when the
admin clicks "Delete" in the dashboard requires the Admin SDK running on a
server, which Cloud Functions gives you for free (Spark plan includes a
generous free tier for callable functions).

This is optional — the app works fully without it, the account just stays
able to log in even after its profile row is removed from the dashboard
table. Deploy this if you want "Delete" to be a real, permanent account
removal.

## Setup

```bash
npm install -g firebase-tools
firebase login
firebase init functions   # choose your existing project, JavaScript or TypeScript
cd functions
npm install firebase-admin firebase-functions
```

## `functions/index.js`

```js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Callable function — only an admin (checked via Firestore role field)
// may delete another user's Auth account.
exports.deleteUserAccount = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Must be signed in.");
  }

  const callerDoc = await admin.firestore().doc(`users/${context.auth.uid}`).get();
  if (callerDoc.data()?.role !== "admin") {
    throw new functions.https.HttpsError("permission-denied", "Admins only.");
  }

  const { uid } = data;
  await admin.auth().deleteUser(uid);
  await admin.firestore().doc(`users/${uid}`).delete();
  return { success: true };
});
```

## Deploy

```bash
firebase deploy --only functions
```

## Call it from the client

```js
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();
const deleteUserAccount = httpsCallable(functions, "deleteUserAccount");
await deleteUserAccount({ uid });
```

You'd swap this in for (or call it alongside) `deleteUserProfile` in
`src/components/UsersDashboardData.jsx`.
