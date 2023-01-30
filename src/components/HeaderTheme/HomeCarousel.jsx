import React from "react";
import { Carousel, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../Services/ConfigURL";
import { movieServ } from "../../Services/CarouselService";
import { useState } from "react";
import "../../assets/styles/HomeCarousel.css";

export default function HomeCarousel(props) {
  const { arrImgCarousel } = useSelector((state) => state.reducerCarousel);

  let dispatch = useDispatch([]);

  useEffect(() => {
    movieServ
      .getItemBannerCarousel()
      .then((res) => {
        dispatch({
          type: "DISPATCH_CAROUSEL",
          arrImgCarousel: res.data.content,
        });
      })
      .catch((err) => {
        message.error(err.response?.data);
      });
  }, []);

  const renderImgCarousel = () => {
    return arrImgCarousel.map((item, index) => {
      const contentStyle = {
        height: "680px",
        color: "#fff",
        lineHeight: "160px",
        textAlign: "center",
        background: "#364d79",
        paddingTop: "79px",
      };
      return (
        <div key={index} className="">
          <h3 className="h3_carousel" style={contentStyle}>
            <img
              className="w-full img_carousel h-full "
              src={item.hinhAnh}
              alt
            />
          </h3>
        </div>
      );
    });
  };

  return (
    <div className="carousel">
      <Carousel autoplay>{renderImgCarousel()}</Carousel>
    </div>
  );
}
