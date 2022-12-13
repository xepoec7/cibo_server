import React from 'react'
import {Container} from 'reactstrap';
import HeroComponent from '../components/Home/HeroComponent';
import DishComponent from '../components/Home/DishComponent';
import SectionComponent from '../components/Home/SectionComponent';
import MapComponent from '../components/Home/MapComponent';

const Homepage = () => {

  return (
    <main>
      <HeroComponent />
      <Container>
        <SectionComponent />
        <DishComponent />
      </Container>
      <MapComponent />
    </main>
  )
}

export default Homepage;