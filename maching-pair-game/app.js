// https://codesandbox.io/s/matching-pair-game-p2y85n

import React, { useEffect, useRef, useState } from "react";
import { data } from "./data";
import "./styles.css";

const App = () => {
  const [dataList, setDataList] = useState([]);
  const [x, setX] = useState();
  const [count, setCount] = useState(0);
  const [activeState, setActiveState] = useState();
  const selectedRef = useRef();
  const selectedRefId = useRef();
  const { viewCount = 0, activeClass = "" } = activeState || {};

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const updatedData = data.map((item) => {
      return { ...item, closed: "closed" };
    });
    setDataList(shuffle(updatedData));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setActiveState({ ...activeState, activeClass: "" });
    }, 400);
  }, [viewCount]);

  const onClickTile = ({ type, id }) => {
    if (selectedRefId.current === id) {
      return;
    }
    setCount((prev) => prev + 1);
    selectedRef.current = type;
    selectedRefId.current = id;
    if (!x) {
      setX(selectedRef.current);
    }
    document.getElementById(id).classList.add("active");
    setTimeout(() => {
      if (x && selectedRef.current) {
        document.querySelectorAll("*").forEach((element) => {
          element.classList.remove("active");
        });
        setX(null);
        selectedRef.current = null;
        selectedRefId.current = null;
      }
    }, 500);

    const updatedList = dataList?.map((item) => {
      if (x === item?.type && selectedRef.current === item?.type) {
        setX(null);
        return { ...item, closed: "" };
      }
      return item;
    });
    setDataList(updatedList);
  };

  return (
    <div className="App">
      <div className="image-grid">
        {dataList?.map(({ id, image = "", type = "", closed = "" }) => (
          <div
            id={id}
            key={id}
            className={`image ${activeClass} ${closed}`}
            onClick={(e) => onClickTile({ e, type, id })}
          >
            <img src={image} />
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          gap: 24,
          justifyContent: "center",
          marginTop: 24
        }}
      >
        <p>{`${3 - viewCount} views available`}</p>
        <button
          disabled={viewCount === 3}
          onClick={() =>
            setActiveState({
              ...activeState,
              activeClass: "active",
              viewCount: viewCount + 1
            })
          }
        >
          see all
        </button>
        <p>{`Attempts: ${count}`}</p>
      </div>
      {!!(count && !dataList?.find((item) => item?.closed)) && <p>Game Over</p>}
    </div>
  );
};

export default App;
