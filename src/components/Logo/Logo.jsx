import React from 'react';
import logoImg from '../../assets/logo.png';

// Component name must be Capital (Logo)
const Logo = () => {
    return (
        <div className='flex items-center gap-6 '>
            <img src={logoImg} alt="Logo" className="h-10 w-10" />
            <h1 className='font-bold text-xl -ms-4 text-indigo-500'>Book-Courier</h1>
        </div>
    );
};

export default Logo;
