import { movieServ } from "../../Services/UserService";
import { SET_INFO_USER } from "../Constants/ConstantsUser";

export const getInfoUserAction = () => {
    return async (dispatch) => {
        try {
            const result = await movieServ.getInfoBookingResults();
            console.log("result: ", result);

            await dispatch({
                type: SET_INFO_USER,
                thongTinNguoiDung: result.data.content,
            });
        } catch (err) {
            console.log("err: ", err);
        }
    };
};

