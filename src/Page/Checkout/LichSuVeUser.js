import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinNguoiDungAction } from "../../Redux/Actions/QuanLyNguoiDungAction";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { ManageDetailMovie } from "../../Redux/Actions/ManageTheatre";
import { movieServ } from "../../Services/TheatreManageService";
import { quanLiDatVeAction } from "../../Redux/Actions/QuanLiDatVeAction";

function LichSuVeUser() {
  const dispatch = useDispatch();

  const { thongTinNguoiDung } = useSelector((state) => state.userReducer);
  const { id } = useParams();
  useEffect(() => {
    const action = layThongTinNguoiDungAction();

    dispatch(action);
    dispatch(quanLiDatVeAction(id));
  }, []);

  const renderTicketItem = () => {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
      console.log("thongTinNguoiDung: ", thongTinNguoiDung);

      const seats = _.first(ticket.danhSachGhe);
      console.log("seats: ", seats);

      return (
        <div className="p-2 lg:w-1/2 md:w-1/2 w-full" key={index}>
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={ticket.hinhAnh}
            />
            <div className="flex-grow">
              <h2
                style={{ textTransform: "capitalize" }}
                className="text-red-400 text-base title-font font-medium"
              >
                Tên Phim:{ticket.tenPhim}
              </h2>

              <h2>
                Thời lượng:{ticket.thoiLuongPhim} phút,Giá vé:{ticket.giaVe}
              </h2>

              <p className="text-gray-600">
                Giờ Chiếu:
                {moment(ticket.ngayDat).format("hh:mm A ")}
              </p>
              <p className="text-gray-600">
                -Ngày chiếu:
                {moment(ticket.ngayDat).format("DD-MM-YYYY")}.
              </p>
              <p className="text-green-400 text-base">
                Địa điểm: {seats.tenHeThongRap}
              </p>
              <p>Tên Rạp: {seats.tenCumRap}-</p>
              <p>
                Ghế:
                {ticket.danhSachGhe.map((ghe, index) => {
                  return <span key={index}>{`[${ghe.tenGhe}]`} </span>;
                })}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="p-5">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-700">
              Lịch sử đặt vé
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Hãy kiểm tra thông tin địa điểm và thời gian để xem phim vui vẻ
              bạn nhé
            </p>
          </div>
          <div className="flex flex-wrap -m-2">{renderTicketItem()}</div>
        </div>
      </section>
    </div>
  );
}

export default LichSuVeUser;
