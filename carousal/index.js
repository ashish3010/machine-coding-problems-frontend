// Sandbox link
// https://codesandbox.io/s/carousal-xm3lhl

import { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function App({ autoplay = true, loop = true }) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [count, setCount] = useState();
  const autoplayRef = useRef();

  useEffect(() => {
    setCount(document.querySelectorAll(".item").length);
  }, [document.querySelectorAll(".item").length]);

  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        if (currentSlide === count) {
          loop ? setCurrentSlide(1) : setCurrentSlide(count);
        } else {
          setCurrentSlide((prev) => prev + 1);
        }
      }, 2000);
    }
    document
      .querySelector(`.item:nth-of-type(${currentSlide})`)
      .classList.add("active");

    return () => {
      clearInterval(autoplayRef.current);
      document
        .querySelector(`.item:nth-of-type(${currentSlide})`)
        .classList.remove("active");
    };
  }, [currentSlide]);

  return (
    <div className="App">
      <div className="carousal-wrapper">
        <button
          className="button"
          disabled={!loop && currentSlide === 1}
          onClick={() => {
            currentSlide > 1
              ? setCurrentSlide((prev) => prev - 1)
              : loop
              ? setCurrentSlide(count)
              : setCurrentSlide(1);
          }}
        >
          Prev
        </button>

        <div className="carousal">
          <div className="item">
            <img src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg" />
          </div>
          <div className="item">
            <img src="https://media.istockphoto.com/id/1146517111/photo/taj-mahal-mausoleum-in-agra.jpg?s=612x612&w=0&k=20&c=vcIjhwUrNyjoKbGbAQ5sOcEzDUgOfCsm9ySmJ8gNeRk=" />
          </div>
          <div className="item">
            <img src="https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg" />
          </div>
          <div className="item">
            <img src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg" />
          </div>
          <div className="item">
            <img src="https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true" />
          </div>
        </div>

        <button
          className="button"
          disabled={!loop && currentSlide === count}
          onClick={() => {
            currentSlide !== count
              ? setCurrentSlide((prev) => prev + 1)
              : loop
              ? setCurrentSlide(1)
              : setCurrentSlide(count);
          }}
        >
          Next
        </button>
      </div>
      <div
        style={{
          display: "flex",
          gap: 16,
          justifyContent: "center",
          marginTop: 20
        }}
      >
        {Array.from({ length: count }, (_, index) => (
          <div
            key={index + 1}
            className={`pagination ${
              index + 1 === currentSlide ? "activeSlide" : ""
            }`}
            onClick={() => setCurrentSlide(index + 1)}
          >
            <p className="star">*</p>
          </div>
        ))}
      </div>
    </div>
  );
}
