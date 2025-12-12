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
import PaymentList from "../pages/Dashboard/PaymentList";
import MyBooks from "../pages/Dashboard/MyBooks";
import PaymentPage from "../pages/Dashboard/PaymentPage";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "books", Component: AllBooks },
      { path: "books/latest", Component: LatestBooks }, // <-- changed
      { path: "coverage", Component: Coverage },
      { path: "contact", Component: Contact },
      { path: "books/:id", Component: BookDetails },

      {
        path: "dashboard",
        Component: () => (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          { index: true, Component: MyProfile },
          { path: "profile", Component: MyProfile },
          { path: "orders", Component: MyOrders },
          { path: "my-books", Component: MyBooks },
          { path: "add-book", Component: AddBook },
          { path: "overview", Component: Overview },
          { path: "sidebar", Component: Sidebar },    
          { path: "payments", Component: PaymentList },
          { path: "payment/:id", Component: PaymentPage }, // Pay Now route
          { path: "wishlist", Component: MyWishlist },


     

        ],
      },
    ],
  },
]);
