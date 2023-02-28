import React, { useLayoutEffect, useState } from "react";
import HeroComponent from '../components/home/HeroComponent';
import AboutComponent from '../components/home/AboutComponent';
import DishesComponent from '../components/home/DishesComponent';
import MapComponent from '../components/home/MapComponent';
import Api from '../service/ApiService';

const HomePage = () => {

    const API = new Api();
    const [pageSettings, setPageSettings] = useState();


    useLayoutEffect(() => {
        API.getPageSettings()
            .then((res) => {
                let data = res.data;
                setPageSettings(data)
            });
    }, [])


    const unHide = (inView, entry) => {
        if (inView) {
            entry.target.classList.add("unHide");
        }
    }

    return (
       <>
            {pageSettings ? <HeroComponent pageSettings={pageSettings}/> : null}
            {pageSettings ? <AboutComponent pageSettings={pageSettings} unHide={unHide} /> : null}
            {pageSettings ? <DishesComponent pageSettings={pageSettings} unHide={unHide} /> : null}
            {pageSettings ? <MapComponent pageSettings={pageSettings}/> : null}
       </>
    )
}

export default HomePage;