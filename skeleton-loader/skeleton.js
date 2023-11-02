import React from "react";
import "./styles.css";

const Skeleton = ({ width, height, radius }) => {
  return (
    <div className="skeleton" style={{ width, height, borderRadius: radius }} />
  );
};

export default Skeleton;
