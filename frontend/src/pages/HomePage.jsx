import React from "react";
import HeroComponent from '../components/home/HeroComponent';
import AboutComponent from '../components/home/AboutComponent';
import DishesComponent from '../components/home/DishesComponent';
import MapComponent from '../components/home/MapComponent';
const HomePage = () => {

    return (
       <>
            <HeroComponent />
            <AboutComponent />
            <DishesComponent />
            <MapComponent />
       </>
    )
}

export default HomePage;