import {
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS,
    UPDATE_ORDER_STATUS_FAILURE,
    GET_RESTAURANT_ORDERS_REQUEST,
    GET_RESTAURANT_ORDERS_SUCCESS,
    GET_RESTAURANT_ORDERS_FAILURE
} from './actionType';

import { api } from "../../component/Config/api";

export const updateOrderStatus = ({ orderId, orderStatus, jwt }) => async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
    try {
        const { data } = await api.put(`api/admin/order/${orderId}/${orderStatus}`, {}, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error });
    }
};

export const getRestaurantOrders = ({ restaurantId, orderStatus, jwt }) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_ORDERS_REQUEST });
    try {
        const { data } = await api.get(`api/admin/order/restaurant/${restaurantId}`, {
            params: {
                orderStatus: orderStatus
            },
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        const orders = data;
        dispatch({ type: GET_RESTAURANT_ORDERS_SUCCESS, payload: orders });
    } catch (error) {
        dispatch({ type: GET_RESTAURANT_ORDERS_FAILURE, payload: error });
    }
};