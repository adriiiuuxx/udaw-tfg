import { 
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    GET_USER_ORDERS_REQUEST,
    GET_USER_ORDERS_SUCCESS,
    GET_USER_ORDERS_FAILURE 
} from "./actionType";

import { api } from "../../component/Config/api";

export const createOrder = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
        const { data } = await api.post('api/order/add', reqData.order, {
            headers: {
                'Authorization': `Bearer ${reqData.jwt}`
            }
        });
        
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
    }
};

export const getUserOrders = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_ORDERS_REQUEST });
    try {
        const { data } = await api.get('api/order/user', {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        dispatch({ type: GET_USER_ORDERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_USER_ORDERS_FAILURE, payload: error});
    }
};