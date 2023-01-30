import { movieServ } from "../../Services/TheatreManageService";
import { DETAIL_MOVIE } from "../Constants/ManageTheatre";

export const ManageDetailMovie = (id) => {
  return async (dispatch) => {
    try {
      const result = await movieServ.getMoviesManage(id);

      dispatch({
        type: DETAIL_MOVIE,
        detailMovie: result.data.content,
      });
    } catch (err) {
      console.log("err: ", err.response?.data);
    }
  };
};
