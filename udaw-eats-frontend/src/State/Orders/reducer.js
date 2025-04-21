import * as actionType from "./actionType";

const initialState = {
    orders: [],
    loading: false,
    error: null,
    message: null
}

export const orderReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionType.GET_USER_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: null
            };
        case actionType.GET_USER_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: payload,
                error: null
            };
        case actionType.GET_USER_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
                message: null
            };
        case actionType.CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: false,
                orders: [...state.orders, payload],
                error: null,
                message: "Order created successfully"
            };
        case actionType.CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: [...state.orders, payload],
                error: null,
                message: "Order created successfully"
            };
        case actionType.CREATE_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
                message: null
            };

        default:
            return state;
    }
}