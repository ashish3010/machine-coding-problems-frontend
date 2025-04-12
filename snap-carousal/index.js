import React, { useRef, useState, useEffect } from "react";
import "./styles.css";
import { data } from "./utils.js"

const ITEM_SPACING = 8;
const ITEM_WIDTH_PERCENT = 0.83;

const CustomCarousel = ({ data, renderItem, getCurrentIndex }) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const fullItemWidth =
        window.innerWidth * ITEM_WIDTH_PERCENT + ITEM_SPACING;
      const newIndex = Math.round(scrollLeft / fullItemWidth);
      setCurrentIndex(newIndex);
      getCurrentIndex(newIndex); // ✅ fixed this line
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const fullItemWidth =
          window.innerWidth * ITEM_WIDTH_PERCENT + ITEM_SPACING;
        containerRef.current.scrollTo({
          left: currentIndex * fullItemWidth,
          behavior: "smooth",
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex]);

  return (
    <div
      ref={containerRef}
      className="carousel-container"
      onScroll={handleScroll}
    >
      {data.map((item) => (
        <div key={item.id} className="carousel-item">
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [activeIndex, SetActiveIndex] = useState(0);

  return (
    <div className="wrapper">
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${data[activeIndex].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(20px)",
          zIndex: -1, // Keep it behind the content
        }}
      />

      {/* Carousel */}
      <CustomCarousel
        data={data}
        getCurrentIndex={(index) => SetActiveIndex(index)}
        renderItem={(item) => (
          <div style={{ textAlign: "center" }}>
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                borderRadius: 10,
              }}
            />
          </div>
        )}
      />
    </div>
  );
};

export default App;
