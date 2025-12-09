//src/Home/Home.jsx
import React from 'react';
import Banner from './Banner/Banner';
import Brands from './Brands/Brands';
import Coverage from '../Coverage/Coverage';
import AllBooks from '../Books/AllBooks';
import LatestBooks from '../Books/LatestBooks';
import WhyChoose from '../Books/WhyChoose';


const Home = () => {
    return (
        <div>
        <Banner></Banner> 
        <AllBooks></AllBooks>
        <LatestBooks></LatestBooks>
        <Brands></Brands> 
        <WhyChoose></WhyChoose> 
        <Coverage></Coverage>      
        </div>
    );
};

export default Home;