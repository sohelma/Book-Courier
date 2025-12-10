// src/routes/router.jsx
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import RootLayout from "../layouts/RootLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import Coverage from "../pages/Coverage/Coverage";
import Contact from "../pages/Contact/Contact";

// Dashboard pages
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import MyProfile from "../pages/Dashboard/MyProfile";
import MyOrders from "../pages/Dashboard/MyOrders";
import MyWishlist from "../pages/Dashboard/MyWishlist";
import AddBook from "../pages/Dashboard/AddBook";
import Overview from "../pages/Dashboard/Overview";
import Sidebar from "../pages/Dashboard/Sidebar";
import AllBooks from "../pages/Books/AllBooks";
import BookDetails from "../pages/Books/BookDetails";
import LatestBooks from "../pages/Books/LatestBooks";
import MyPayment from "../pages/Dashboard/MyPayment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home }, // Public home page
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "books", Component: AllBooks },
      { path: "coverage", Component: Coverage },
      { path: "contact", Component: Contact },
      { path: "books/:id",Component: BookDetails},
      { path: "books", Component: LatestBooks },
    
      // Dashboard route protected
      {
        path: "dashboard",
        Component: () => (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          { index: true, Component: MyProfile }, // Default dashboard page
          { path: "profile", Component: MyProfile },
          { path: "orders", Component: MyOrders },
          { path: "wishlist", Component: MyWishlist },
          { path: "addbook", Component: AddBook },
          { path: "overview", Component: Overview },
          { path: "sidebar", Component: Sidebar },
          { path: "payment/:id",Component: MyPayment},

        ],
      },
    ],
  },
]);
