import React from "react";
import { useSelector } from "react-redux";
import { ClimbingBoxLoader } from "react-spinners";

export default function Spinner() {
  let { isLoading } = useSelector((state) => state.reducerSpinner);

  return isLoading ? (
    <div className="h-screen w-screen fixed top-0 left-0 bg-slate-800 z-50 flex justify-center items-center">
      <ClimbingBoxLoader size={50} color="#fcfcfc" />
    </div>
  ) : (
    <></>
  );
}
