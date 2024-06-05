import React, { useState } from "react";
import CarouselComponent from "../components/carousel/CarouselComponent";
import FlashSales from "../components/flashSales/FlashSales";

const page = () => {
  return (
    <div>
      <CarouselComponent />
      <FlashSales />
    </div>
  );
};

export default page;
