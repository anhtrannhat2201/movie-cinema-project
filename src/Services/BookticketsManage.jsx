import axios from "axios";
import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
import { BASE_URL, https, TOKEN_CYBERSOFT } from "./ConfigURL";

export const quanLyDatVeServ = {
  layChiTietPhongVe: (maPhongVe) => {
    let uri = `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maPhongVe}`;
    return https.get(uri, maPhongVe);
  },
  datVe: (thongTinDatVe = new ThongTinDatVe()) => {
    let uri = `/api/QuanLyDatVe/DatVe`;
    return https.post(uri, thongTinDatVe);
  },
  taoLichChieu: (thongTinLichChieu) => {
    let uri = `/api/QuanLyDatVe/TaoLichChieu`;
    return https.post(uri, thongTinLichChieu);
  },
};
