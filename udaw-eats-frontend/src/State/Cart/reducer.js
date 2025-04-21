import * as actionType from "./actionType";
import {LOGOUT_REQUEST} from "../Authentication/actionType"

const initialState = {
    cart: null,
    cartItems: [],
    loading: false,
    error: null,
    message: null
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.FIND_CART_REQUEST:
        case actionType.GET_ALL_CART_ITEM_REQUEST:
        case actionType.ADD_ITEM_TO_CART_REQUEST:
        case actionType.UPDATE_CART_ITEM_REQUEST:
        case actionType.REMOVE_CART_ITEM_REQUEST:
        case actionType.CLEAR_CART_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: null
            };

        case actionType.FIND_CART_SUCCESS:
        case actionType.CLEAR_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: action.payload,
                cartItems: action.payload.items
            };

        case actionType.GET_ALL_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: action.payload,
                error: null
            };

        case actionType.ADD_ITEM_TO_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: [...state.cartItems, action.payload],
                message: "Item added to cart successfully"
            };

        case actionType.UPDATE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: state.cartItems.map(
                    item => item.id === action.payload.id ? action.payload : item
                ),
                message: "Cart item updated successfully"
            };

        case actionType.REMOVE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: state.cartItems.filter(
                    item => item.id !== action.payload
                ),
                message: "Item removed from cart"
            };

        case actionType.FIND_CART_FAILURE:
        case actionType.GET_ALL_CART_ITEM_FAILURE:
        case actionType.ADD_ITEM_TO_CART_FAILURE:
        case actionType.UPDATE_CART_ITEM_FAILURE:
        case actionType.REMOVE_CART_ITEM_FAILURE:
        case actionType.CLEAR_CART_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                message: null
            };

        case LOGOUT_REQUEST:
            localStorage.removeItem("jwt");
            return {
                ...state,
                cartItems:[],
                cart:null,
                success: "logout success"
            };

        default:
            return state;
    }
}