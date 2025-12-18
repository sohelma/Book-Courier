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


▶️ Flow chart

server/
│
├── index.js                 ← main server entry
│
├── config/
│   └── db.js                ← MongoDB connection (optional)
│
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── book.routes.js
│   ├── order.routes.js
│   ├── wishlist.routes.js
│   └── admin.routes.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── book.controller.js
│   ├── order.controller.js
│   ├── wishlist.controller.js
│   └── admin.controller.js
│
├── middlewares/
│   ├── verifyToken.js
│   ├── verifyAdmin.js
│   └── verifyLibrarian.js
│
├── models/
│   ├── User.js
│   ├── Book.js
│   └── Order.js
│
├── utils/
│   └── generateToken.js
│
└── .env
