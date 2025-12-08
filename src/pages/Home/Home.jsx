//src/Home/Home.jsx
import React from 'react';
import Banner from './Banner/Banner';
import Brands from './Brands/Brands';
import Coverage from '../Coverage/Coverage';
import AllBooks from '../Books/AllBooks';


const Home = () => {
    return (
        <div>
        <Banner></Banner> 
        <AllBooks></AllBooks>
        <Brands></Brands>  
        <Coverage></Coverage>      
        </div>
    );
};

export default Home;