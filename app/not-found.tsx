import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Image width={500} height={500} src="/NotFound.jpg" alt="not found image" />
      <p className="font-bold tracking-wide text-3xl uppercase text-primary">page not found!</p>
    </div>
  );
};

export default NotFound;
