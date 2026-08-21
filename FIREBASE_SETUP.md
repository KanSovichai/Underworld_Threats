# Firebase + Cloudinary Setup Guide

This project is fully wired for Firebase Auth, Firestore, and Cloudinary
image hosting — you just need to plug in your own project's keys. Nothing
will work (login, register, dashboard CRUD) until you complete the steps
below.

## 1. Create a Firebase project

1. Go to https://console.firebase.google.com and click **Add project**.
2. Name it (e.g. "underworld-threats"), finish the wizard (Google
   Analytics is optional, you can skip it).

## 2. Register a Web App

1. In the project overview, click the **</>** (web) icon to add a web app.
2. Give it a nickname, skip Firebase Hosting for now.
3. Firebase will show you a `firebaseConfig` object — copy the values into
   `.env.local` (create this file by copying `.env.example`):

   ```
   VITE_FIREBASE_API_KEY=AIza...
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

## 3. Enable Authentication

1. In the Firebase Console sidebar: **Build -> Authentication -> Get started**.
2. Under **Sign-in method**, enable **Email/Password**.

## 4. Enable Firestore

1. **Build -> Firestore Database -> Create database**.
2. Start in **production mode** (we supply real rules below).
3. Pick a region close to your users.
4. Once created, go to the **Rules** tab, paste in the contents of
   `firestore.rules` from this project's root, and click **Publish**.

## 5. Make your first admin

Registering through `/auth/register` creates a Firestore profile with
`role: "user"` by default — nobody can reach `/dashboard` until at least
one account is an admin (the dashboard route requires `role === "admin"`).

1. Register a normal account from the app once (`/auth/register`).
2. In Firebase Console -> Firestore Database -> `users` collection, find
   that account's document (its ID is the user's UID — cross-check the
   email field).
3. Edit the document and change `role` from `"user"` to `"admin"`.
4. Log out and back in (or just refresh) — you'll now see a **Dashboard**
   link in the navbar and `/dashboard` will load.

From then on, that admin can use the "+ Add User" button in the dashboard
to create more accounts (still `role: "user"` by default — promote more
admins the same way as step 5.3 if needed).

## 6. Set up Cloudinary (free image hosting)

1. Sign up at https://cloudinary.com (free tier: 25GB storage/bandwidth).
2. On your Dashboard home page, copy your **Cloud Name**.
3. Go to **Settings (gear icon) -> Upload -> Upload presets -> Add upload preset**.
   - Set **Signing Mode** to **Unsigned** (required — this lets the
     browser upload directly without exposing your API secret).
   - Optionally set a folder name, or leave the default; the app also
     passes `folder: "underworld-threats/products"` per upload.
   - Save, and copy the preset's name.
4. Add both to `.env.local`:

   ```
   VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
   VITE_CLOUDINARY_UPLOAD_PRESET=your-preset-name
   ```

## 7. Install and run

```bash
npm install
npm run dev
```

Try registering an account, promoting it to admin (step 5), logging in,
and adding a product with an image from the dashboard.

## What's wired up

- **Auth**: real Firebase email/password login & register (`src/pages/LogInPage.jsx`,
  `src/pages/RegisterPage.jsx`, `src/firebase/users.js`).
- **Route protection**: `/dashboard` requires a logged-in admin
  (`src/components/ProtectedRoute.jsx`).
- **Users CRUD**: live Firestore list of user profiles, add (creates a
  real Auth account), edit username, delete profile
  (`src/components/UsersDashboardData.jsx`).
- **Products CRUD**: live Firestore list of products, add/edit/delete,
  each with an optional image (`src/components/ProductsDashboardData.jsx`).
- **Images**: uploaded straight from the browser to Cloudinary
  (`src/firebase/cloudinary.js`); only the returned URL is stored in the
  Firestore product document (`image` field) — Firestore never touches
  the actual image bytes.
- **Navbar**: shows Login when signed out; shows username, a Dashboard
  link (admins only), and Logout when signed in.

## Known limitation

Deleting a user from the dashboard removes their Firestore profile (so
they disappear from the list and lose admin-gated access checks tied to
that doc), but their actual Firebase Auth login still works unless you
deploy the optional Cloud Function in `functions/README.md` — deleting
*another* person's Auth account isn't possible from client-side code, only
from a trusted server (Admin SDK).
