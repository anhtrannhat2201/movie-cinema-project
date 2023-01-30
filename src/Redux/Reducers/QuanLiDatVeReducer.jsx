import {
  CHANGE_TAB_ACTIVE,
  CHUYEN_TAB,
  DAT_VE,
  DAT_VE_HOAN_TAT,
  LAY_CHI_TIET_PHONG_VE,
} from "../Constants/QuanLiDatVe";

export const initialState = {
  chiTietPhongVe: {},
  danhSachGheDangDat: [],
  tabActive: "1",
  danhSachGheKhachDat: [{}],
};

const quanLiDatVeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LAY_CHI_TIET_PHONG_VE: {
      state.chiTietPhongVe = action.chiTietPhongVe;
      return { ...state };
    }
    case DAT_VE: {
      let danhSachGheDangDatUpdate = [...state.danhSachGheDangDat];

      let index = danhSachGheDangDatUpdate.findIndex(
        (gheDangDat) => gheDangDat.maGhe === action.ghe.maGhe
      );
      if (index !== -1) {
        danhSachGheDangDatUpdate.splice(index, 1);
      } else {
        danhSachGheDangDatUpdate.push(action.ghe);
      }

      return { ...state, danhSachGheDangDat: danhSachGheDangDatUpdate };
    }
    case DAT_VE_HOAN_TAT: {
      state.danhSachGheDangDat = [];
      return { ...state };
    }
    case CHUYEN_TAB: {
      state.tabActive = "2";
      return { ...state };
    }
    case CHANGE_TAB_ACTIVE: {
      state.tabActive = action.number;
      return { ...state };
    }
    case "DAT_GHE": {
      state.danhSachGheKhachDat = action.arrGheKhachDat;
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default quanLiDatVeReducer;
