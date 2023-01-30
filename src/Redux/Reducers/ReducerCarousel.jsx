import { DISPATCH_CAROUSEL } from "../Constants/CarouselConstants"


const stateDefault = {
    arrImgCarousel: [
    ],
}

const reducerCarousel = (state = stateDefault, action) => {
    switch (action.type) {

        case DISPATCH_CAROUSEL: {
            state.arrImgCarousel = action.arrImgCarousel

            return { ...state }
        }

        default: return { ...state }
    }
}

export default reducerCarousel;