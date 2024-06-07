import React from "react";
import CarouselComponent from "../app/components/carousel/CarouselComponent";
import FlashSales from "../app/components/flashSales/FlashSales";
import Categories from "../app/components/categories/Categories";
import List from "../app/components/productList/List";
import TopProducts from "../app/components/TopProducts/TopProducts";
import FeaturedProducts from "../app/components/FeaturedProducts/FeaturedProducts";
import Features from "../app/components/Features/Features";
export default function Home() {
  return <main>
   <CarouselComponent />
      <FlashSales />
      <Categories />
      <List />
      <TopProducts />
      <FeaturedProducts />
      <Features />
  </main>;
}
