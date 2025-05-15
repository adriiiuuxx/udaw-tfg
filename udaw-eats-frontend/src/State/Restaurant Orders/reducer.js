import * as actionType from "./actionType";

const initialState = {
    orders: [],
    loading: false,
    error: null,
    message: null
}

export const restaurantOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_RESTAURANT_ORDERS_REQUEST:
        case actionType.UPDATE_ORDER_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: null
            };

        case actionType.GET_RESTAURANT_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
                error: null
            };

        case actionType.UPDATE_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.map(order => 
                    order.id === action.payload.id ? action.payload : order
                ),
                error: null,
                message: "Order status updated successfully"
            };

        case actionType.GET_RESTAURANT_ORDERS_FAILURE:
        case actionType.UPDATE_ORDER_STATUS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                message: null
            };

        default:
            return state;
    }
}