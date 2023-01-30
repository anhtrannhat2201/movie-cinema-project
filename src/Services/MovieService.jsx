import axios from "axios";
import { BASE_URL, GROUPID, https, TOKEN_CYBERSOFT } from "./ConfigURL";

export const movieServ = {
  getListMovie: (tenPhim = "") => {
    if (tenPhim != "") {
      return axios({
        url: `${BASE_URL}/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`,
        method: "GET",
        // Bổ sung thông tin cho backEnd biết
        headers: {
          TokenCybersoft: TOKEN_CYBERSOFT,
        },
      });
    }
    return axios({
      url: `${BASE_URL}/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`,
      method: "GET",
      // Bổ sung thông tin cho backEnd biết
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },

  getDataMovieBytheater: () => {
    return axios({
      url: `${BASE_URL}/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`,
      method: "GET",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },
  layThongTinHeThongRap: () => {
    return https.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
  },
  layThongTinCumRapTheoHeThong: (maHeThongRap) => {
    return https.get(
      `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
    );
  },
  getDataCarousel: () => {
    return axios({
      url: `${BASE_URL}/api/QuanLyPhim/LayDanhSachBanner`,
      method: "GET",
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  },
  addFilmsUploadImage: (formData) => {
    return https.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, formData);
  },
  getInforMovie: (maPhim) => {
    return https.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  },
  capNhatPhimUpload: (formData) => {
    return https.post(`/api/QuanLyPhim/CapNhatPhimUpload`, formData);
  },
  xoaPhim: (maPhim) => {
    return https.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
  },
};
