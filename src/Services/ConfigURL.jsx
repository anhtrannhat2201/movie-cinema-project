// Lưu chữ những cái url giống nhau

import axios from "axios";
import { localServ } from "./LocalService";

export const BASE_URL = "https://movienew.cybersoft.edu.vn";
export const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwNCIsIkhldEhhblN0cmluZyI6IjI0LzAyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NzE5NjgwMDAwMCIsIm5iZiI6MTY1NDEwMjgwMCwiZXhwIjoxNjc3MzQ0NDAwfQ.ZiG46jcfei0W0lpVZceE1nh8LXVGS7Cl3NcyjtuQcQE";
export const GROUPID = "GP03";

export let https = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
    Authorization: "Bearer " + localServ.user.get()?.accessToken,
  },
});
