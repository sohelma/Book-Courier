import React from 'react';
import Banner from './Banner/Banner';
import Brands from './Brands/Brands';
import Coverage from '../Coverage/Coverage';

const Home = () => {
    return (
        <div>
        <Banner></Banner> 
        <Brands></Brands>  
        <Coverage></Coverage>      
        </div>
    );
};

export default Home;