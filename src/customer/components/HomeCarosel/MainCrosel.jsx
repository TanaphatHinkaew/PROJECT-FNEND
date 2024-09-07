import React from "react";
import { mainCarouselData } from './MainCroselData';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import PropTypes from 'prop-types';

const MainCrosel = () => {
    const items = mainCarouselData.map((item) => (
        <img
            className='cursor-pointer -z-10'
            role='presentation'
            src={item.image}
            alt=""
        />
    ));

    return (
        <AliceCarousel
            items={items}
            disableButtonsControls
            autoPlay
            autoPlayInterval={1000}
            infinite
        />
    );
}

MainCrosel.propTypes = {
    mainCarouselData: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default MainCrosel;
