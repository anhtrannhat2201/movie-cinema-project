import axios from "axios"
import { BASE_URL, https, TOKEN_CYBERSOFT } from "./ConfigURL"

export const movieServ = {
    getTheatreManage: () => {
        return axios({
            url: `${BASE_URL}/api/QuanLyRap/LayThongTinHeThongRap`,
            method: "GET",
            // Bổ sung thông tin cho backEnd biết
            headers: {
                TokenCybersoft: TOKEN_CYBERSOFT,
            }
        });
    },
    getMoviesManage: (maPhim) => {
        let uri = `/api/QuanLyRap/LayThongTinLichChieuPhim?maPhim=${maPhim}`
        return https.get(uri)
    },
};