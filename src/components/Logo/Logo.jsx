import React from 'react';
import logoImg from '../../assets/logo.png';

// Component name must be Capital (Logo)
const Logo = () => {
    return (
        <div className='flex items-end '>
            <img src={logoImg} alt="Logo" />
            <h1 className='font-bold text-xl -ms-4'>Book-Courier</h1>
        </div>
    );
};

export default Logo;
