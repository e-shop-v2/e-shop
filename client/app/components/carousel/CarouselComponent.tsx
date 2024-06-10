"use client";
import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./carroussa.css";
const CarouselComponent = () => {
  return (
    <div className="lfou9">
      <div className="sideBar" style={{ marginRight: "30px" }}>
        <ul>
          <li>Man's Clothing</li>
          <li>Women's Clothing </li>
          <li> Electronics</li>
          <li>Medecine</li>
          <li>Sport</li>
          <li>toys</li>
          <li>Health And Beauty</li>
          <li>Grociries</li>
          <li>Pets</li>
        </ul>
      </div>
      <Carousel className="custom-carousel">
        <Carousel.Item>
          <div className="video-container">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/XHTrLYShBRQ"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="First video"
            ></iframe>
          </div>
          <Carousel.Caption>
            <h5>Iphone</h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.ytimg.com/vi/TppeEN7gnsA/maxresdefault.jpg"
            alt="First slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.ytimg.com/vi/FT3ODSg1GFE/maxresdefault.jpg"
            alt="Third slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
