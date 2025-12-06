//src/routes/router
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import RootLayout from "../layouts/RootLayout";
import Coverage from "../pages/Coverage/Coverage";



export const router = createBrowserRouter([
  {
    path: "/",
 Component: RootLayout,
    children: [
      { index: true,
        Component:Home},

      { path: "coverage",
        Component:Coverage,
        loader:()=>fetch('/serviceCenters.json').then (res=>res.json())
    }
    ]
  }


]);




