import { message } from "antd";
import { movieServ } from "../../Services/MovieService";
import {
  LAY_DANH_SACH_PHIM,
  SET_THONG_TIN_PHIM,
} from "../Constants/ManageFilms";

import { setLoadingOffAction, setLoadingOnAction } from "./ActionSpinner";

export const getListMovie = (tenPhim = "") => {
  return async (dispatch) => {
    try {
      const result = await movieServ.getListMovie(tenPhim);

      dispatch({
        type: LAY_DANH_SACH_PHIM,
        arrFilms: result.data.content,
      });
    } catch (err) {
      message.error(err.response?.data);
    }
  };
};
export const addFilmsUploadFilmsAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await movieServ.addFilmsUploadImage(formData);
      message.success(`Thêm phim ${result.data.content.tenPhim} thành công`);
    } catch (err) {
      message.error(err.response?.data);
    }
  };
};

export const getInforMovieAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await movieServ.getInforMovie(id);

      dispatch({
        type: SET_THONG_TIN_PHIM,
        inforFilms: result.data.content,
      });
    } catch (err) {
      message.error(err.response?.data);
    }
  };
};
export const capNhatPhimUploadAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await movieServ.capNhatPhimUpload(formData);

      message.success(
        `Cập nhật phim ${result.data.content.tenPhim} thành công`
      );

      dispatch(getListMovie());
    } catch (err) {
      message.error(err.response?.data);
    }
  };
};
export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await movieServ.xoaPhim(maPhim);

      message.success(`Xóa phim thành công`);

      // sau khi xoa load lai dah sach phim moi
      dispatch(getListMovie());
    } catch (err) {
      message.error(err.response?.data);
    }
  };
};
