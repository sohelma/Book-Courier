import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router";
import './index.css'
import App from './App.jsx'
import { router } from './routes/router.jsx';  //  router import by click r (router) below line

// React Router Provider use করা হয়েছে--paste from router web site
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} /> 
  </StrictMode>,
)
