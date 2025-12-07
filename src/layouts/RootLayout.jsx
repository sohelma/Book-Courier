//layouts/Rootlayouts.jsx
import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/Shared/Footer';
import Navbar from '../pages/Shared/Navbar'
import { Toaster } from 'react-hot-toast';



const RootLayout = () => {
    return (                      //Navbar ও Footer সব page a থাকবে, কারণ তারা <Outlet /> এর বাইরে।
        <div className='max-w-7xl mx-auto'>  
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>

            {/* Toaster globally visible */}
            <Toaster position="top-right" />
        </div>
    );
};

export default RootLayout;  