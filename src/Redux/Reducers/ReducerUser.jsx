import { localServ } from "../../Services/LocalService";
import {
  LAY_DANH_SACH_NGUOI_DUNG_THEO_NHOM,
  SET_INFO_USER,
  SET_THONG_TIN_NGUOI_DUNG,
  SET_USER,
  SET_USER_LOGIN,
  SET_USER_SIGNUP,
} from "../Constants/ConstantsUser";

const initialState = {
  userInfor: localServ.user.get(),
  thongTinNguoiDung: {},
  arrUser: [],
  arrUserDetail: [],
  arrUserDefault: [],
  inforUser: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOGIN: {
      state.userInfor = action.payload;
      return { ...state };
    }
    case SET_USER_SIGNUP: {
      state.userInfor = action.payload;
      return { ...state };
    }
    case SET_INFO_USER: {
      state.thongTinNguoiDung = action.thongTinNguoiDung;
      return { ...state };
    }
    case SET_USER: {
      state.userInfor = action.payload;
    }
    case SET_THONG_TIN_NGUOI_DUNG: {
      state.thongTinNguoiDung = action.thongTinNguoiDung;
      return { ...state };
    }
    case LAY_DANH_SACH_NGUOI_DUNG_THEO_NHOM: {
      state.arrUser = action.arrUser;
      state.arrUserDetail = state.arrUser;
      state.arrUserDefault = state.arrUser;
      return { ...state };
    }
    case "SET_THONG_TIN_USER_TAIKHOAN": {
      state.inforUser = action.inforUser;
      return { ...state };
    }
    default:
      return state;
  }
};
export default userReducer;
