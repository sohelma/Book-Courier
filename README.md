BookCourier – Client Side

🎯 Project Purpose

BookCourier client is a React-based frontend application that allows users to browse books, place orders, manage wishlist, make payments, and access role-based dashboards with a modern and responsive UI.

⚙️ Technologies Used

React.js

React Router DOM

Tailwind CSS

Firebase Authentication

Axios

React Hot Toast

Chart.js / Recharts (Dashboard charts)

✨ Key Features

Email & Google authentication

Private & role-based routes

Responsive UI (Mobile / Tablet / Desktop)

Light & Dark mode

Book listing & details

Order, wishlist & payment system

Profile update with image upload

Skeleton loaders for better UX

Modern dashboard with charts

🔐 Environment Variables

Create a .env file in the root directory:

VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_sender_id
VITE_appId=your_firebase_app_id

▶️ Run Locally
npm install
npm run dev

📦 NPM Packages

react

react-router-dom

axios

firebase

react-hot-toast

⚠️ Notes

Firebase config secured with environment variables

Reloading private routes does not redirect to login

Domain added in Firebase for production deployment