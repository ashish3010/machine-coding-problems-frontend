import React, { useEffect, useState, useRef } from "react";
import { data } from "./data";
import "./styles.css";
import Lottie from "react-lottie";
import animationData from "./confetti.json";

const App = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [count, setCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const lockRef = useRef(false);
  const [gameOver, setGameOver] = useState(false);

  const imageGridRef = useRef(null);
  const [height, setHeight] = useState(0);

  const measureHeight = () => {
    if (imageGridRef.current) {
      setHeight(imageGridRef.current.clientHeight);
    }
  };

  const confettiOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    requestAnimationFrame(measureHeight);
    window.addEventListener("resize", measureHeight);
    return () => window.removeEventListener("resize", measureHeight);
  }, [cards]);

  useEffect(() => {
    const duplicated = [...data, ...data].map((item, index) => ({
      ...item,
      uid: `${item.type}-${index}`,
    }));
    const shuffled = duplicated.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  const restartGame = () => {
    setCount(0);
    setViewCount(0);
    setMatched([]);
    setFlipped([]);
    setGameOver(false);
    const duplicated = [...data, ...data].map((item, index) => ({
      ...item,
      uid: `${item.type}-${index}`,
    }));
    const shuffled = duplicated.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  const handleClick = (card) => {
    if (lockRef.current) return;
    if (flipped.find((f) => f.uid === card.uid)) return;
    if (matched.includes(card.type)) return;

    const newFlipped = [...flipped, card];
    setFlipped(newFlipped);
    setCount((prev) => prev + 1);

    if (newFlipped.length === 2) {
      lockRef.current = true;
      const [first, second] = newFlipped;

      if (first.type === second.type) {
        setMatched((prev) => [...prev, first.type]);
        setTimeout(() => {
          setFlipped([]);
          lockRef.current = false;
        }, 600);
      } else {
        setTimeout(() => {
          setFlipped([]);
          lockRef.current = false;
        }, 900);
      }
    }
  };

  useEffect(() => {
    if (matched.length > 0 && matched.length === data.length) {
      setGameOver(true);
    }
  }, [matched]);

  const handleSeeAll = () => {
    if (viewCount >= 3) return;

    setViewCount((prev) => prev + 1);
    lockRef.current = true;
    const tempFlips = cards.filter((c) => !matched.includes(c.type));
    setFlipped(tempFlips);

    setTimeout(() => {
      setFlipped([]);
      lockRef.current = false;
    }, 1000);
  };

  const isFlipped = (card) =>
    flipped.some((c) => c.uid === card.uid) || matched.includes(card.type);

  return (
    <div className="App">
      <div className="wrapper">
        {gameOver && (
          <div className="confetti-container">
            <Lottie options={confettiOptions} height="80%" width="80%" />
            <div className="gameOverWrapper">
              <div className="gameOverTxt">You Won</div>
              <button onClick={restartGame} className="restart-button">
                Restart Game
              </button>
            </div>
          </div>
        )}
        <div ref={imageGridRef} className="image-grid">
          {cards.map((card) => (
            <div
              key={card.uid}
              className={`card ${isFlipped(card) ? "flipped" : ""}`}
              onClick={() => handleClick(card)}
            >
              <div className="card-inner">
                <div className="card-front">
                  <img src={card.image} alt={card.type} />
                </div>
                <div className="card-back"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="footer" style={{ height: height }}>
          <div className="atempts-wrapper">
            <div className="atempts-count">{count}</div>
            <div>attempts taken</div>
          </div>
          <div onClick={handleSeeAll} className="view-wrapper">
            <img
              src="https://cdn-icons-png.freepik.com/256/5951/5951054.png?semt=ais_hybrid"
              style={{ width: 48, height: 48 }}
              alt="View all"
            />
            <p className="view-count">{3 - viewCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
