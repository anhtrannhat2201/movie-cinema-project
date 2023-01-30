import React, { Component } from "react";
import Slider from "react-slick";
import ItemMovies from "../../Page/HomePage/ItemMovies";
import "../../assets/styles/MultipleRowsSlick.css";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_PHIM_DANG_CHIEU,
  SET_PHIM_SAP_CHIEU,
} from "../../Redux/Constants/ManageFilms";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block ", left: "-52px" }}
      onClick={onClick}
    />
  );
}

const MultipleRowsSlick = (props) => {
  const dispatch = useDispatch();
  const { dangChieu, sapChieu } = useSelector(
    (state) => state.reducerManageMovie
  );

  let activeClassDC = dangChieu === true ? "active_Film" : "none_active_Film";
  let activeClassSC = sapChieu === true ? "active_Film" : "none_active_Film";

  const renderFilms = () => {
    return props.arrFilms.slice(0, 12).map((item, index) => {
      return (
        <div className={`width-item`} key={index}>
          <ItemMovies item={item} />
        </div>
      );
    });
  };

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    rows: 1,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="container">
      <div className="button_row-slick container">
        <button
          type="button"
          className={`${activeClassDC} px-4 py-1 font-semibold rounded bg-gray-800 text-white mr-2 button_1`}
          onClick={() => {
            const action = {
              type: SET_PHIM_DANG_CHIEU,
            };
            dispatch(action);
          }}
        >
          PHIM ĐANG CHIẾU
        </button>

        <button
          type="button"
          className={`${activeClassSC} px-3 py-1 font-semibold rounded bg-white text-gray-800 border-gray-800 border button_2`}
          onClick={() => {
            const action = {
              type: SET_PHIM_SAP_CHIEU,
            };
            dispatch(action);
          }}
        >
          {" "}
          PHIM SẮP CHIẾU
        </button>
      </div>
      <div className="container slider_slick">
        <Slider {...settings}>{renderFilms()}</Slider>
      </div>
      <div className="slider_slick_res">{renderFilms()}</div>
    </div>
  );
};

export default MultipleRowsSlick;
