import { DISPATCH_MANAGE_THEATRE } from "../Constants/ManageTheatre";

const stateDefault = {
  manageTheatre: [],
};

const reducerManageTheatre = (state = stateDefault, action) => {
  switch (action.type) {
    case DISPATCH_MANAGE_THEATRE: {
      state.manageTheatre = action.manageTheatre;

      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default reducerManageTheatre;
