import { isPresentInfavourites } from "../../component/Config/logic";
import { ADD_TO_FAVOURITE_FAILURE, ADD_TO_FAVOURITE_REQUEST, ADD_TO_FAVOURITE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./actionType";

const initialState = {
    isLoading: false,
    user: null,
    error: null,
    jwt: null,
    success: null,
    favourites: [],
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case ADD_TO_FAVOURITE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
                success: null
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jwt: action.payload,
                success: "Success",
                error: null
            }

            case GET_USER_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    user: action.payload,
                    favourites: action.payload.favourites
                }
        case ADD_TO_FAVOURITE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                favourites: isPresentInfavourites(state.favourites, action.payload)
                    ? state.favourites.filter(item => item.id !== action.payload.id)
                    : [...state.favourites, action.payload]
            }

            case LOGOUT_REQUEST:
                return initialState;

            case REGISTER_FAILURE:
                case LOGIN_FAILURE:
                case GET_USER_FAILURE:
                case ADD_TO_FAVOURITE_FAILURE:
                    return {
                        ...state,
                        isLoading: false,
                        error: action.payload,
                        success: null
                    }

        default:
            return state;
    }

}

