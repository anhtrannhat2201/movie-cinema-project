import { message } from "antd";
import { connection } from "../..";
import { quanLyDatVeServ } from "../../Services/BookticketsManage";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { DETAIL_MOVIE } from "../Constants/ManageTheatre";
import {
  CHUYEN_TAB,
  DAT_VE,
  DAT_VE_HOAN_TAT,
  LAY_CHI_TIET_PHONG_VE,
} from "../Constants/QuanLiDatVe";
import { setLoadingOffAction, setLoadingOnAction } from "./ActionSpinner";

export const quanLiDatVeAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingOnAction);

      const result = await quanLyDatVeServ.layChiTietPhongVe(maLichChieu);

      dispatch({
        type: LAY_CHI_TIET_PHONG_VE,
        chiTietPhongVe: result.data.content,
      });
      dispatch(setLoadingOffAction);
    } catch (err) {
      message.error(err.response?.data);
    }
  };
};

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoadingOnAction());
      const result = await quanLyDatVeServ.datVe(thongTinDatVe);
      message.success(result.data.content);
      // Đặt vé thành công gọi api load lại phòng vé
      await dispatch(quanLiDatVeAction(thongTinDatVe.maLichChieu));
      await dispatch({ type: DAT_VE_HOAN_TAT });
      await dispatch(setLoadingOffAction());
      let userInfor = getState().userReducer.userInfor;
      connection.invoke(
        "datGheThanhCong",
        userInfor.taiKhoan,
        thongTinDatVe.maLichChieu
      );
      await dispatch({ type: CHUYEN_TAB });
    } catch (err) {
      console.log(err.response?.data);

      dispatch(setLoadingOffAction());
    }
  };
};
export const datGheAction = (ghe, maLichChieu) => {
  return async (dispatch, getState) => {
    // Đưa thông tin ghế lên reducer
    await dispatch({
      type: DAT_VE,
      ghe,
    });

    // call api về backend
    let danhSachGheDangDat = getState().quanLiDatVeReducer.danhSachGheDangDat;

    let taiKhoan = getState().userReducer.userInfor.taiKhoan;

    danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);
    // call api signalR
    connection.invoke("datGhe", taiKhoan, danhSachGheDangDat, maLichChieu);
  };
};
