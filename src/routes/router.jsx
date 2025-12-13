import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllBooks from "../pages/Books/AllBooks";
import BookDetails from "../pages/Books/BookDetails";
import Contact from "../pages/Contact/Contact";
import Coverage from "../pages/Coverage/Coverage";

// Dashboard Pages
import MyProfile from "../pages/Dashboard/MyProfile";
import MyOrders from "../pages/Dashboard/MyOrders";
import MyWishlist from "../pages/Dashboard/MyWishlist";
import Overview from "../pages/Dashboard/Overview";
import PaymentList from "../pages/Dashboard/PaymentList";
import PaymentPage from "../pages/Dashboard/PaymentPage";
import AddBook from "../pages/Dashboard/AddBook";
import MyBooks from "../pages/Dashboard/MyBooks";


// ✅ 404 Page
import NotFound from "../pages/NotFound";
import EditBook from "../pages/Dashboard/EditBook";
import LibrarianOrders from "../pages/Dashboard/LibrarianOrders";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "books", Component: AllBooks },
      { path: "books/:id", Component: BookDetails },
      { path: "contact", Component: Contact },
      { path: "coverage", Component: Coverage },

      // ✅ Public 404
      { path: "*", Component: NotFound },
    ],
  },

  {
    path: "/dashboard",
    Component: () => (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: Overview },
      { path: "profile", Component: MyProfile },
      { path: "orders", Component: MyOrders },
      { path: "wishlist", Component: MyWishlist },
      { path: "payments", Component: PaymentList },
      { path: "payment/:id", Component: PaymentPage },
      { path: "overview", Component: Overview },
      { path: "add-book", Component: AddBook}, 
      { path: "my-books",Component: MyBooks},
      { path: "edit-book/:id", Component: EditBook },
     
      { path: "librarian-orders",Component: LibrarianOrders},

      // ✅ Dashboard 404 (important)
      { path: "*", Component: NotFound },
    ],
  },
]);
