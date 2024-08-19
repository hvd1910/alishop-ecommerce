import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { mainCarouselData } from './MainCaroselData';




const MainCrosel = () => {

    const items = mainCarouselData.map((item)=> <img className='cursor-pointer' 
    role='presentation' src={item.image} alt='image'/>)
   return (
    <AliceCarousel
    items={items}
    disableButtonsControls
    autoPlay
    autoPlayInterval={1500}
    infinite
    
/>
   )
};

export default MainCrosel;