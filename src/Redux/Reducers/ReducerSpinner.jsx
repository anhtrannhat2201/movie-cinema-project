import { SET_LOADING_OFF, SET_LOADING_ON } from "../Constants/ConstantSpinner"

const initialState = {
    isLoading: false
}



const reducerSpinner = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING_ON: {
            return { ...state, isLoading: true }
        }
        case SET_LOADING_OFF: {
            return { ...state, isLoading: false }
        }
        default: return { ...state }
    }
}

export default reducerSpinner;