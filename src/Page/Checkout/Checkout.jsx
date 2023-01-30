import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import _ from "lodash";

import {
  CloseOutlined,
  UserOutlined,
  CheckOutlined,
  SmileOutlined,
} from "@ant-design/icons";

import {
  datGheAction,
  datVeAction,
  quanLiDatVeAction,
} from "../../Redux/Actions/QuanLiDatVeAction";

import { CHANGE_TAB_ACTIVE, DAT_VE } from "../../Redux/Constants/QuanLiDatVe";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import "../../assets/styles/screen.css";
// import style from "./Checkout.module.css";
import { USER } from "../../Services/LocalService";
import { useNavigate } from "react-router";
import { message } from "antd";
import { Tabs } from "antd";
import { layThongTinNguoiDungAction } from "../../Redux/Actions/QuanLyNguoiDungAction";
import moment from "moment";
import { connection } from "../..";

function Checkout() {
  const { userInfor } = useSelector((state) => state.userReducer);

  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } =
    useSelector((state) => state.quanLiDatVeReducer);

  let dispatch = useDispatch();

  // if (JSON.parse(jsonData) == null) {
  //     window.location.href = "/login"
  // }

  let { id } = useParams();

  useEffect(() => {
    dispatch(quanLiDatVeAction(id));

    //Có 1 client nào thực hiện việc đặt vé thành công
    // mình sẽ load lại danh sách phòng vé của lịch chiếu đó

    connection.on("datVeThanhCong", () => {
      dispatch(quanLiDatVeAction(id));
    });

    // Vừa vào trang load tất cả ghế của các người khác
    connection.invoke("loadDanhSachGhe", id);

    // Load danh sách ghế đang đặt từ server về
    connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
      // Buớc 1 : Loại mình ra khỏi danh sách
      dsGheKhachDat = dsGheKhachDat.filter(
        (item) => item.taiKhoan !== userInfor.taiKhoan
      );

      // Bước 2 :Gộp danh sách ghế khách đặt ở tất cả user thành 1 mảng chung
      let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
        let arrGhe = JSON.parse(item.danhSachGhe);
        return [...result, ...arrGhe];
      }, []);
      // Đưa dữ liệu ghế khách đặt cập nhật redux
      arrGheKhachDat = _.uniqBy(arrGheKhachDat, "maGhe");

      // Đưa dữ liệu ghế khách đặt về redux
      dispatch({
        type: "DAT_GHE",
        arrGheKhachDat,
      });
    });

    // Cài đặt sự kiện khi reload trang
    window.addEventListener("beforeunload", clearGhe);
    return () => {
      clearGhe();
      window.removeEventListener("beforeunload", clearGhe);
    };
  }, []);

  const clearGhe = function (event) {
    connection.invoke("huyDat", userInfor.taiKhoan, id);
  };

  if (!localStorage.getItem(USER)) {
    // alert("Bạn Không có quyền truy Cập vào trang này");
    alert("Vui lòng đăng nhập để đặt vé");
    return setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  }
  let { thongTinPhim, danhSachGhe } = chiTietPhongVe;

  const renderDanhSachGhe = () => {
    return danhSachGhe?.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let classGheDaDuocDat = "";
      if (userInfor.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = "gheDaDuocDat";
      }

      // Kiểm tra từng render xem có phải ghế khách đặt hay không
      let classGheKhachDat = "";
      let indexGheKhachDat = danhSachGheKhachDat.findIndex(
        (gheKD) => gheKD.maGhe === ghe.maGhe
      );
      if (indexGheKhachDat !== -1) {
        classGheKhachDat = "gheKhachDat";
      }
      let classGheDangDat = "";
      // kieerm tra từng ghế render xem có trong mảng ghế đang đặt hay không
      let indexGheDangDat = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );
      if (indexGheDangDat != -1) {
        classGheDaDat = "gheDangDat";
      }
      const handleDatVe = () => {
        const action = datGheAction(ghe, id);
        dispatch(action);
      };
      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              handleDatVe();
            }}
            disabled={ghe.daDat || classGheKhachDat !== ""}
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDat} text-center`}
            key={index}
          >
            {ghe.daDat ? (
              classGheDaDuocDat != "" ? (
                <UserOutlined style={{ verticalAlign: "middle" }} />
              ) : (
                <CloseOutlined style={{ verticalAlign: "middle" }} />
              )
            ) : classGheKhachDat !== "" ? (
              <SmileOutlined style={{ verticalAlign: "middle" }} />
            ) : (
              ghe.stt
            )}
          </button>

          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };
  let datve = () => {
    let thongTinDatVe = new ThongTinDatVe();
    thongTinDatVe.maLichChieu = id;
    thongTinDatVe.danhSachVe = danhSachGheDangDat;

    dispatch(datVeAction(thongTinDatVe));
  };
  return (
    <div className="bg-gray-800">
      <div className="grid grid-cols-12 ">
        <div className="col-span-8 ">
          <div className="screen"></div>
          <div className="text-white text-center">Màn hình chiếu phim</div>
          <div className="text-center table_res">{renderDanhSachGhe()}</div>

          <div className="mt-5 flex justify-center">
            <table className="divide-y divide-gray-200 w-2/4">
              <thead className="p-5">
                <tr>
                  <th className="text-white">Ghế chưa đặt</th>
                  <th className="text-white">Ghế đang đặt </th>
                  <th className="text-white">Ghế đã đặt </th>
                  <th className="text-white">Ghế vip</th>
                  <th className="text-white">Ghế mình đặt</th>
                  <th className="text-white">Ghế khách đang đặt</th>
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-200">
                <tr>
                  <td>
                    <button className="ghe  text-center">
                      <CheckOutlined style={{ verticalAlign: "middle" }} />
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheDangDat text-center">
                      <CheckOutlined style={{ verticalAlign: "middle" }} />
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheDaDat text-center">
                      <CheckOutlined style={{ verticalAlign: "middle" }} />
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheVip text-center">
                      <CheckOutlined style={{ verticalAlign: "middle" }} />
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheDaDuocDat text-center">
                      <CheckOutlined style={{ verticalAlign: "middle" }} />
                    </button>
                  </td>
                  <td>
                    <button className="ghe gheKhachDat text-center">
                      <CheckOutlined style={{ verticalAlign: "middle" }} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-4 bg-white h-100 shadow-2xl min-h-screen">
          <h3 className="text-center text-2xl text-green-400 mt-4 mb-4">
            {danhSachGheDangDat
              .reduce((tongTien, ghe, index) => {
                return (tongTien += ghe.giaVe);
              }, 0)
              .toLocaleString()}{" "}
            VND
          </h3>
          <hr />
          <div className="flex justify-between mx-3 mb-3 mt-3">
            <h3 className="text-black text-base font-bold">Người dùng:</h3>
            <h3 className="text-green-500 text-base font-bold text-right">
              {userInfor?.hoTen}
            </h3>
          </div>
          <hr />
          <div className="flex justify-between mx-3 mb-3 mt-3">
            <h3 className="text-black text-base font-bold">Cụm Rạp:</h3>
            <h3 className="text-green-500 text-base font-bold text-right">
              {thongTinPhim?.tenCumRap}
            </h3>
          </div>
          <hr />
          <div className="flex justify-between mx-3 mb-3 mt-3">
            <h3 className="text-black text-base font-bold">Địa chỉ:</h3>
            <h3 className="text-green-500 text-base font-bold text-right">
              {thongTinPhim?.diaChi}
            </h3>
          </div>
          <hr />
          <div className="flex justify-between mx-3 mb-3 mt-3">
            <h3 className="text-black text-base font-bold">Rạp:</h3>
            <h3 className="text-green-500 text-base font-bold text-right">
              {thongTinPhim?.tenCumRap}
            </h3>
          </div>
          <hr />
          <div className="flex justify-between mx-3 mb-3 mt-3">
            <h3 className="text-black text-base font-bold">Ngày giờ chiếu:</h3>
            <h3 className="text-green-500 text-base font-bold text-right">
              {thongTinPhim?.ngayChieu} ~ {thongTinPhim?.gioChieu}
            </h3>
          </div>
          <hr />
          <div className="flex justify-between mx-3 mb-3 mt-3">
            <h3 className="text-black text-base font-bold">Tên Phim:</h3>
            <h3 className="text-green-500 text-base font-bold text-right">
              {thongTinPhim?.tenPhim}
            </h3>
          </div>
          <hr />
          <div className="flex justify-between mx-3 mb-3 mt-3">
            <h3 className="text-black text-base font-bold">Chọn Ghế:</h3>
            <h3>
              {_.sortBy(danhSachGheDangDat, ["stt"])?.map(
                (gheDangDat, index) => {
                  return (
                    <span
                      key={index}
                      className="ml-2 text-green-500 text-base font-bold"
                    >
                      <span>Ghế: {gheDangDat.stt}</span>
                    </span>
                  );
                }
              )}
            </h3>
          </div>
          <hr />
          <div className="flex justify-between mx-3 mb-3 mt-3">
            <h3 className="text-black text-base font-bold">Hình Ảnh</h3>
            <img
              className="text-green-500 text-base font-bold text-right w-24 h-full mr-4"
              src={thongTinPhim?.hinhAnh}
              alt=""
            />
          </div>

          <hr />
          <div className="  ">
            <button
              type="button"
              onClick={() => {
                datve();
              }}
              className="border-orange-200 rounded  mb-0 w-full h-16 bg-orange-600 items-center hover:bg-orange-300  transition-colors duration-300 cursor-pointer text-light text-3xl"
            >
              Đặt Vé
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutTab() {
  const { tabActive } = useSelector((state) => state.quanLiDatVeReducer);
  const dispatch = useDispatch();
  return (
    <div className="mx-auto">
      <Tabs
        style={{ marginTop: "80px" }}
        defaultActiveKey="1"
        activeKey={tabActive}
        onChange={(key) => {
          dispatch({
            type: CHANGE_TAB_ACTIVE,
            number: key.toString(),
          });
        }}
      >
        <Tabs.TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1">
          <Checkout />
        </Tabs.TabPane>
        <Tabs.TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
          <KetQuadatVe />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

function KetQuadatVe() {
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
      const seats = _.first(ticket.danhSachGhe);

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
