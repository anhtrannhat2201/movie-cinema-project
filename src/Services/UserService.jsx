import axios from "axios";
import { BASE_URL, GROUPID, https, TOKEN_CYBERSOFT } from "./ConfigURL";

export const movieServ = {
  postLogin: (data) => {
    let uri = `/api/QuanLyNguoiDung/DangNhap`;
    return https.post(uri, data);
  },
  postSignup: (data) => {
    let uri = `/api/QuanLyNguoiDung/DangKy`;
    return https.post(uri, data);
  },
  layThongTinNguoiDung: () => {
    let uri = `/api/QuanLyNguoiDung/ThongTinTaiKhoan`;
    return https.post(uri);
  },
  layDanhSachLoaiNguoiDung: () => {
    let uri = `api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`;
    return https.get(uri);
  },
  layDanhSachNguoiDungTheoNhom: (taiKhoan = "") => {
    if (taiKhoan != "") {
      let uri = `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${taiKhoan}`;
      return https.get(uri);
    } else {
      let uri = `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`;
      return https.get(uri);
    }
  },
  themNguoiDungUpload: (formData) => {
    return https.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, formData);
  },
  layDanhSachNguoiDungTheoNhomTheoTaiKhoan: (taiKhoan) => {
    let uri = `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${taiKhoan}`;
    return https.get(uri);
  },
  capNhatUserUpload: (formData) => {
    return https.post(
      `/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      formData
    );
  },
  deleteUser: (taiKhoan) => {
    return https.delete(
      `api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
  },
};
