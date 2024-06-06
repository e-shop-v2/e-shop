import React, { useState } from "react";
import CarouselComponent from "../components/carousel/CarouselComponent";
import FlashSales from "../components/flashSales/FlashSales";
import Categories from "../components/categories/Categories";
import List from "../components/productList/List";
import TopProducts from "../components/TopProducts/TopProducts";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import Features from "../components/Features/Features";
const page = () => {
  return (
    <div>
      <CarouselComponent />
      <FlashSales />
      <Categories />
      <List />
      <TopProducts />
      <FeaturedProducts />
      <Features />
    </div>
  );
};

export default page;
