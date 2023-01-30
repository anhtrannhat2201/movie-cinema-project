import { combineReducers } from "redux";
import userReducer from './ReducerUser'
import reducerCarousel from "./ReducerCarousel";
import reducerManageTheatre from "./ReducerManageThetre";
import reducerManageMovie from "./ReducerManageMovie";
import reducerSpinner from "./ReducerSpinner"
import quanLiDatVeReducer from "./QuanLiDatVeReducer";

const rootReducer = combineReducers({
    userReducer,
    reducerCarousel,
    reducerManageTheatre,
    reducerManageMovie,
    reducerSpinner,
    quanLiDatVeReducer,
})
export default rootReducer