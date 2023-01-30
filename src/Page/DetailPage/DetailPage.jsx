import { Tabs } from "antd";
import axios from "axios";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import "../../assets/styles/circleRatting.scss";
import { ManageDetailMovie } from "../../Redux/Actions/ManageTheatre";
import { Rate } from "antd";
import "../../assets/styles/detail.css";
import TabPane from "antd/lib/tabs/TabPane";

export default function DetailPage(props) {
  let img = {
    display: " block",
    position: "relative",
    borderRadius: "4px",
    backgroundSize: "100%",
    backgroundRepeat: " no-repeat",
    backgroundPosition: "center",
  };

  let ratting = {
    marginLeft: 200,
    marginTop: 20,
    fontSize: 50,
  };

  let { detailMovie } = useSelector((state) => state.reducerManageMovie);

  let dispatch = useDispatch();

  let { id } = useParams();

  useEffect(() => {
    dispatch(ManageDetailMovie(id));
  }, []);

  return (
    <div className="bg-gray-800 pb-5" style={{ minHeight: "100vh" }}>
      <div
        className="grid grid-cols-12 pt-5 detail_page"
        style={{ marginRight: 150 }}
      >
        <div
          className="grid grid-cols-2 cols-span-4 col-start-4 pt-40 width_detail"
          style={{ width: 850 }}
        >
          <div className="grid grid-cols-2">
            <img
              className="h-80 object-cover rounded-md shadow-2xl img_detail"
              style={img}
              src={detailMovie.hinhAnh}
              alt=""
            />
            <div className="ml-4">
              <p className="text-red-400 text-2xl font-serif">
                {detailMovie.tenPhim}
              </p>
              <p className="text-white p-3 rounded bg-red-600 time_detail">
                {moment(detailMovie.ngayKhoiChieu).format("DD-MM-YYYY ~ hh:mm")}
              </p>
              <p className="text-white w-80 decr_detail">{detailMovie.moTa}</p>
              <p className="text-white">{detailMovie.thoiLuong}</p>
              <a href="#muaVe" className="btn btn-danger">
                Mua Vé
              </a>
            </div>
            <br />
          </div>
          <div className="grid grid-cols-4 ratting" style={ratting}>
            <div className="pacss-wrapper">
              <span className="pacss-foreground">
                <span className="pacss-number text-xs mt-3">
                  {detailMovie.danhGia * 10}%
                </span>
              </span>
              <span className="pacss pacss-100 pacss-big" />
              <h1 style={{ marginTop: -112, marginLeft: 11 }}>
                <Rate allowHalf value={detailMovie.danhGia / 2} />
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/3 container px-5 py-2 bg-white">
        <Tabs className="flex justify-center" defaultActiveKey="1">
          <Tabs.TabPane
            tab={
              <h1 id="muaVe" className="text-dark">
                Lịch Chiếu
              </h1>
            }
            key="1"
          >
            <div
              style={{ overflowY: "scroll" }}
              className="flex flex-row justify-left justify-items-center scrollbar scrollbar-thumb-blue-700 scrollbar-track-blue-300 overflow-y-scroll hover:scrollbar-thumb-green-700"
            >
              <Tabs
                className="duration-500 text-left"
                style={{ height: 500 }}
                tabPosition="left"
              >
                {detailMovie.heThongRapChieu?.map((htr, index) => {
                  return (
                    <Tabs.TabPane
                      tab={
                        <div>
                          <img className="w-16 h-16" src={htr.logo} alt="" />
                        </div>
                      }
                      key={index}
                    >
                      {htr.cumRapChieu?.map((cumRap, index) => {
                        return (
                          <div
                            key={index}
                            className="text-left"
                            style={{ borderTop: "1px solid red" }}
                          >
                            <p className="text-green-700 truncate font-bold">
                              {cumRap.tenCumRap}
                            </p>
                            <p className="truncate text-blue-500">
                              {cumRap.diaChi}
                            </p>
                            <div className="flex-grow">
                              <div className="grid grid-cols-3">
                                {cumRap.lichChieuPhim?.map(
                                  (lichChieu, index) => {
                                    return (
                                      <div key={index}>
                                        <NavLink
                                          to={`/checkout/${lichChieu.maLichChieu}`}
                                        >
                                          <div className="w-36 mr-4">
                                            <p
                                              className="p-3 rounded bg-red-600 text-white"
                                              style={{ width: "155px" }}
                                            >
                                              {moment(
                                                lichChieu.ngayChieuGioChieu
                                              ).format("DD-MM-YYYY ~ hh:mm")}
                                            </p>
                                          </div>
                                        </NavLink>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </Tabs.TabPane>
                  );
                })}
              </Tabs>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab={<h1 className="text-dark">Thông Tin</h1>} key="2">
            Thông Tin
          </Tabs.TabPane>
          <Tabs.TabPane tab={<h1 className="text-dark">Đánh Giá</h1>} key="3">
            Đánh Giá
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}
