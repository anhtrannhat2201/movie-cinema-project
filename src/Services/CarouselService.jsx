import axios from "axios"
import { BASE_URL, TOKEN_CYBERSOFT } from "./ConfigURL"

export const movieServ = {
    getItemBannerCarousel: () => {
        return axios({
            url: `${BASE_URL}/api/QuanLyPhim/LayDanhSachBanner`,
            method: "GET",
            // Bổ sung thông tin cho backEnd biết
            headers: {
                TokenCybersoft: TOKEN_CYBERSOFT,
            }
        });
    },
};