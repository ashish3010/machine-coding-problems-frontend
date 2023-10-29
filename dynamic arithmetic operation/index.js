import { useState } from "react";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState({
    firstInput: " ",
    secondInput: " "
  });
  const [operation, setOperation] = useState("+");
  const [result, setResult] = useState();
  const [totalOperations, setTotalOperations] = useState(0);

  const { firstInput = "", secondInput = "" } = input || {};

  const allOperations = ["+", "-", "*", "/"];

  const onResetClick = () => {
    setInput(null);
    setOperation("+");
    setResult(null);
  };

  const onInputChange = (e) => {
    const { name, value } = e.target || {};
    setInput({ ...input, [name]: value });
  };

  const onResultClick = () => {
    setTotalOperations(totalOperations + 1);
    // we can either use eval or switch, but we should avoid eval()
    // setResult(eval(`${firstInput} ${operation} ${secondInput}`));
    switch (operation) {
      case "+":
        setResult(+firstInput + +secondInput);
        break;
      case "-":
        setResult(+firstInput - +secondInput);
        break;
      case "*":
        setResult(+firstInput * +secondInput);
        break;
      case "/":
        setResult(+firstInput / +secondInput);
        break;
    }
  };

  return (
    <div className="App">
      <p>Total Operation: {totalOperations} </p>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <input name="firstInput" value={firstInput} onChange={onInputChange} />
        <p>{operation}</p>
        <input
          name="secondInput"
          value={secondInput}
          onChange={onInputChange}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
          marginTop: 24
        }}
      >
        {allOperations.map((item) => (
          <button onClick={() => setOperation(item)}>{item}</button>
        ))}
      </div>
      <div
        style={{
          marginTop: 24,
          display: "flex",
          justifyContent: "space-around"
        }}
      >
        <button onClick={onResetClick}>Reset</button>
        <button onClick={onResultClick}>Result</button>
        <p>result: {result}</p>
      </div>
    </div>
  );
}
