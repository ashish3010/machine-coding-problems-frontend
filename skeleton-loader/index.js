//  https://codesandbox.io/s/skeleton-loader-g9j7l8?file=/src/App.js

import Skeleton from "./skeleton";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Skeleton width="200px" height="200px" radius="100%" />
      <div style={{ height: "10px" }} />
      <Skeleton width="50%" height="50px" radius="24px" />
      <div style={{ height: "10px" }} />
      <Skeleton width="80%" height="100px" radius="24px" />
      <div style={{ height: "10px" }} />
      <Skeleton width="100%" height="300px" radius="24px" />
    </div>
  );
}
