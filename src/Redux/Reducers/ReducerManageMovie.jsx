import {
  INFO_FILMS,
  LAY_DANH_SACH_PHIM,
  SET_PHIM_DANG_CHIEU,
  SET_PHIM_SAP_CHIEU,
  SET_THONG_TIN_PHIM,
} from "../Constants/ManageFilms";
import { DETAIL_MOVIE } from "../Constants/ManageTheatre";

const stateDefault = {
  arrFilms: [],
  detailMovie: {},
  arrFilmDetail: [],
  inforFilms: {},
  dangChieu: true,
  sapChieu: false,
  arrFilmDefault: [],
};

const reducerManageMovie = (state = stateDefault, action) => {
  switch (action.type) {
    case DETAIL_MOVIE: {
      state.detailMovie = action.detailMovie;
      return { ...state };
    }
    case LAY_DANH_SACH_PHIM: {
      state.arrFilms = action.arrFilms;
      state.arrFilmDetail = state.arrFilms;
      state.arrFilmDefault = state.arrFilms;
      return { ...state };
    }

    case SET_PHIM_DANG_CHIEU: {
      state.dangChieu = !state.dangChieu;
      state.arrFilms = state.arrFilmDefault.filter(
        (film) => film.dangChieu === state.dangChieu
      );
      return { ...state };
    }
    case SET_PHIM_SAP_CHIEU: {
      state.sapChieu = !state.sapChieu;
      state.arrFilms = state.arrFilmDefault.filter(
        (film) => film.sapChieu === state.sapChieu
      );
      return { ...state };
    }
    case SET_THONG_TIN_PHIM: {
      state.inforFilms = action.inforFilms;
      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default reducerManageMovie;
