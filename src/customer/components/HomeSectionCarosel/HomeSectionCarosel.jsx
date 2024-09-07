import React, { useState, useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import Button from '@mui/material/Button';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import PropTypes from 'prop-types';

const HomeSectionCarosel = ({ data, SelectionName }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);

    const responsive = {
        0: { items: 1 },
        720: { items: 3 },
        1024: { items: 5.5 },
    };

    const slidePrev = () => {
        if (carouselRef.current) {
            carouselRef.current.slidePrev();
        }
    };

    const slideNext = () => {
        if (carouselRef.current) {
            carouselRef.current.slideNext();
        }
    };

    const syncActiveIndex = ({ item }) => setActiveIndex(item);

    // ตรวจสอบว่าข้อมูล data เป็นอาร์เรย์หรือไม่
    if (!Array.isArray(data)) {
        console.error("Data is not an array:", data);
        return null; // หรือแสดงข้อความแจ้งเตือน
    }

    const items = data.slice(0, 10).map((item, index) => (
        <HomeSectionCard key={index} product={item} />
    ));

    return (
        <div className="relative px-4 lg:px-8 border ">
            <h2 className="text-3xl font-extrabold text-gray-800 py-5">{SelectionName}</h2>
            <div className="relative p-5 ">
                <AliceCarousel
                    ref={carouselRef}
                    items={items}
                    disableButtonsControls
                    responsive={responsive}
                    disableDotsControls
                    onSlideChange={syncActiveIndex}
                    activeIndex={activeIndex}
                />
                {activeIndex < items.length - 1 && (
                    <Button
                        variant="contained"
                        className="z-50 bg-white"
                        onClick={slideNext}
                        sx={{
                            position: 'absolute',
                            top: "8rem",
                            right: "0rem",
                            transform: "translateX(90%) rotate(90deg)",
                            bgcolor: "white",
                        }}
                        aria-label="next"
                    >
                        <KeyboardArrowLeftIcon sx={{ transform: "rotate(90deg)", color: "black" }} />
                    </Button>
                )}

                {activeIndex !== 0 && (
                    <Button
                        variant="contained"
                        className="z-50 bg-white"
                        onClick={slidePrev}
                        sx={{
                            position: 'absolute',
                            top: "8rem",
                            left: "0rem",
                            transform: "translateX(-90%) rotate(-90deg)",
                            bgcolor: "white",
                        }}
                        aria-label="prev"
                    >
                        <KeyboardArrowLeftIcon sx={{ transform: "rotate(90deg)", color: "black" }} />
                    </Button>
                )}
            </div>
        </div>
    );
};

// เพิ่ม PropTypes เพื่อตรวจสอบ data และ SelectionName
HomeSectionCarosel.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            imageUrl: PropTypes.string.isRequired,
            brand: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
    SelectionName: PropTypes.string.isRequired,
};

export default HomeSectionCarosel;
