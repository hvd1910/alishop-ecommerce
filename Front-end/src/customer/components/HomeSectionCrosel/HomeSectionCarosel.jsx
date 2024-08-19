import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import HomeProductCard from "../HomeProductCard/HomeProductCard";

const HomeSectionCarosel = ({ data, sectionName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = React.useRef(null);

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5 },
  };

  const slidePrev = () => {
    const newIndex = activeIndex - 1;
    if (newIndex >= 0) {
      setActiveIndex(newIndex);
      carouselRef.current.slidePrev();
    }
  };

  const slideNext = () => {
    const newIndex = activeIndex + 1;
    if (newIndex <= data.length - 1) {
      setActiveIndex(newIndex);
      carouselRef.current.slideNext();
    }
  };

  const syncActiveIndex = ({ item }) => {
    console.log('Slide changed to:', item);
    setActiveIndex(item);
  };

  const items = data?.map((item, index) => <HomeProductCard key={index} product={item} />);

  return (
    <div className="border pl-3 pr-3 ">
      <h2 className="text-2xl font-extrabold text-gray-800 pt-5 pb-2">{sectionName}</h2>
      <div className="relative p-5">
        <AliceCarousel
          items={items}
          disableButtonsControls
          responsive={responsive}
          disableDotsControls
          onSlideChange={syncActiveIndex}
          activeIndex={activeIndex}
          ref={carouselRef}
        />

        <Button
          variant="contained"
          className="z-40 bg-white"
          onClick={slideNext}
          sx={{
            position: "absolute",
            top: "8rem",
            right: "0rem",
            transform: "translateX(50%) rotate(90deg)",
            bgcolor: "white",
          }}
          aria-label="next"
        >
          <KeyboardArrowLeftIcon
            sx={{ transform: "rotate(90deg)", color: "black" }}
          />
        </Button>
        
        <Button
          variant="contained"
          className="z-40 bg-white"
          onClick={slidePrev}
          sx={{
            position: "absolute",
            top: "8rem",
            left: "0rem",
            transform: "translateX(-50%) rotate(-90deg)",
            bgcolor: "white",
          }}
          aria-label="prev"
        >
          <KeyboardArrowLeftIcon
            sx={{ transform: "rotate(90deg)", color: "black" }}
          />
        </Button>
      </div>
    </div>
  );
};

export default HomeSectionCarosel;
