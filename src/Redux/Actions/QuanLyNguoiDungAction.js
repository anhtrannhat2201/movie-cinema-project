import { message } from "antd";
import { movieServ } from "../../Services/UserService";
import {
  LAY_DANH_SACH_NGUOI_DUNG_THEO_NHOM,
  SET_THONG_TIN_NGUOI_DUNG,
} from "../Constants/ConstantsUser";
import {
  setLoadingOffAction,
  setLoadingOnAction,
} from "../../Redux/Actions/ActionSpinner";

export const layThongTinNguoiDungAction = () => {
  return async (dispatch) => {
    dispatch(setLoadingOnAction());

    try {
      const result = await movieServ.layThongTinNguoiDung();

      await dispatch({
        type: SET_THONG_TIN_NGUOI_DUNG,
        thongTinNguoiDung: result.data.content,
      });

      await dispatch(setLoadingOffAction());
    } catch (err) {
      message.error(err.response?.data);
      await dispatch(setLoadingOffAction());
    }
  };
};

export const layDanhSachNguoiDungTheoNhomAction = (taiKhoan = "") => {
  return async (dispatch) => {
    try {
      const result = await movieServ.layDanhSachNguoiDungTheoNhom(taiKhoan);

      await dispatch({
        type: LAY_DANH_SACH_NGUOI_DUNG_THEO_NHOM,
        arrUser: result.data.content,
      });
    } catch (err) {
      message.error(err.response?.data);
    }
  };
};
export const themNguoiDungUploadAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await movieServ.themNguoiDungUpload(formData);
      message.success("Thêm người dùng thành công");
    } catch (err) {
      message.error(err.response?.data);
    }
  };
};
export const capNhatUserUploadAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await movieServ.capNhatUserUpload(formData);

      message.success(`Cập nhật người dùng  thành công`);

      dispatch(layDanhSachNguoiDungTheoNhomAction());
    } catch (err) {
      message.error(err.response?.data);
    }
  };
};
export const getInforUserAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const result = await movieServ.layDanhSachNguoiDungTheoNhomTheoTaiKhoan(
        taiKhoan
      );

      dispatch({
        type: "SET_THONG_TIN_USER_TAIKHOAN",
        inforUser: result.data.content,
      });
    } catch (error) {
      message.error(error.response?.data);
    }
  };
};
export const xoaNguoiDungAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const result = await movieServ.deleteUser(taiKhoan);

      message.success("Xóa người dùng thành công");

      // sau khi xoa load lai dah sach phim moi
      dispatch(layDanhSachNguoiDungTheoNhomAction());
    } catch (err) {
      message.error(err.response?.data);
    }
  };
};
