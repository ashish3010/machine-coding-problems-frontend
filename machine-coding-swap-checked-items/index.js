import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [leftSideList, setleftSideList] = useState([]);
  const [rightSideList, setRightSideList] = useState([]);
  const [selected, setSelected] = useState([]);

  const payment = ["Paytm", "GPay", "phonePe", "Apay"];
  const social = ["WhatsApp", "facebook", "instagram", "twitter"];

  useEffect(() => {
    setleftSideList(payment);
    setRightSideList(social);
  }, []);

  const findDuplicates = (arr, setArr) => {
    let a = arr;
    for (let i = 0; i < arr?.length; i++) {
      if (selected?.includes(arr[i])) {
        a = a?.filter((item) => item !== arr[i]);
      }
    }
    return setArr(a);
  };

  const onButtonClick = (kind) => {
    if (kind === "right") {
      const newArr = new Set([...rightSideList, ...selected]);
      setRightSideList([...newArr]);
      findDuplicates(leftSideList, setleftSideList);
    }
    if (kind === "left") {
      const newArr = new Set([...leftSideList, ...selected]);
      findDuplicates(rightSideList, setRightSideList);
      setleftSideList([...newArr]);
    }
    setSelected([]);
  };

  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked && !selected?.filter((item) => item === value).length) {
      setSelected((prev) => [...prev, value]);
    } else {
      setSelected(selected?.filter((item) => item !== value));
    }
  };

  return (
    <div
      className="App"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div style={{ border: "2px solid black", padding: 24 }}>
        {leftSideList?.map((item = " ") => (
          <div key={item} style={{ display: "flex" }}>
            <input
              type="checkbox"
              value={item}
              onChange={handleChange}
              checked={selected?.find((selectedItem) => selectedItem === item)}
            />
            <p>{item}</p>
          </div>
        ))}
      </div>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 100
          }}
        >
          <button onClick={() => onButtonClick("right")}> → </button>
          <button onClick={() => onButtonClick("left")}> ← </button>
        </div>
      </div>
      <div style={{ border: "2px solid black", padding: 24 }}>
        {rightSideList?.map((item) => (
          <div key={item} style={{ display: "flex" }}>
            <input
              type="checkbox"
              value={item}
              onChange={handleChange}
              checked={selected?.find((selectedItem) => selectedItem === item)}
            />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
