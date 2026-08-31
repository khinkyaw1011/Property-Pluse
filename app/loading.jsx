"use client";
import { ClipLoader } from "react-spinners";
const Loading = () => {
  const override = {
    display: "block",
    margin: "100px auto",
  };
  return (
    <ClipLoader
      color="#3b82f6"
      cssOverride={override}
      size={50}
      aria-label="Loading Spinner"
    />
  );
};

export default Loading;
