import { api } from "../../component/Config/api"
import { CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_RESTAURANT_FAILURE, CREATE_RESTAURANT_REQUEST, CREATE_RESTAURANT_SUCCESS, DELETE_RESTAURANT_FAILURE, DELETE_RESTAURANT_REQUEST, DELETE_RESTAURANT_SUCCESS, GET_ALL_RESTAURANT_FAILURE, GET_ALL_RESTAURANT_REQUEST, GET_ALL_RESTAURANT_SUCCESS, GET_RESTAURANT_BY_ID_FAILURE, GET_RESTAURANT_BY_ID_REQUEST, GET_RESTAURANT_BY_ID_SUCCESS, GET_RESTAURANT_BY_USER_FAILURE, GET_RESTAURANT_BY_USER_REQUEST, GET_RESTAURANT_BY_USER_SUCCESS, GET_RESTAURANT_CATEGORY_FAILURE, GET_RESTAURANT_CATEGORY_REQUEST, GET_RESTAURANT_CATEGORY_SUCCESS, UPDATE_RESTAURANT_FAILURE, UPDATE_RESTAURANT_REQUEST, UPDATE_RESTAURANT_STATUS_FAILURE, UPDATE_RESTAURANT_STATUS_REQUEST, UPDATE_RESTAURANT_STATUS_SUCCESS, UPDATE_RESTAURANT_SUCCESS } from "./actionType";

export const getAllRestaurants = (token) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_RESTAURANT_REQUEST });
        try {
            const { data } = await api.get("api/restaurants", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch({ type: GET_ALL_RESTAURANT_SUCCESS, payload: data })

        }
        catch (error) {
            dispatch({ type: GET_ALL_RESTAURANT_FAILURE, payload: error })
        }

    }
}

export const getRestaurantById = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
        try {
            const response = await api.get(`api/restaurants/${reqData.restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: response.data })

        }
        catch (error) {
            dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error })
        }

    }
}

export const getRestaurantByUser = (jwt) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_BY_USER_REQUEST });
        try {
            const { data } = await api.get(`api/admin/restaurants/user`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: GET_RESTAURANT_BY_USER_SUCCESS, payload: data })
        }
        catch (error) {
            dispatch({ type: GET_RESTAURANT_BY_USER_FAILURE, payload: error.message })
        }

    }
}

export const createRestaurant = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_RESTAURANT_REQUEST });
        try {
            const { data } = await api.post(`api/admin/restaurants`, reqData.data, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`,
                },
            });
            dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data })
            console.log("created restaurant ");

        }
        catch (error) {
            dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error })
        }

    }
}

export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_RESTAURANT_REQUEST });
        try {
            const res = await api.put(
                `api/admin/restaurants/${restaurantId}`,
                restaurantData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: res.data })
            console.log("restaurant updated ");

        }
        catch (error) {
            dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: error })
        }

    }
}

export const deleteRestaurant = ({ restaurantId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_RESTAURANT_REQUEST });
        try {
            const res = await api.delete(`api/admin/restaurants/${restaurantId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("deleted restaurant: ", res.data);
            dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId })
        }
        catch (error) {
            dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error })
        }

    }
}

export const updateRestaurantStatus = ({ restaurantId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
        try {
            const res = await api.put(`api/admin/restaurants/${restaurantId}/status`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            console.log("updated restaurant status: ", res.data);
            dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: res.data })
        }
        catch (error) {
            dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error })
        }

    }
}

export const createCategory = ({ reqData, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_CATEGORY_REQUEST });
        try {
            const res = await api.post(`api/admin/category`,
                reqData,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
            console.log("cat created: ", res.data);
            dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data })
        }
        catch (error) {
            dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error })
        }

    }
}

export const getRestaurantCategory = ({restaurantId, jwt}) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_CATEGORY_REQUEST });

    try {
        const { data } = await api.get(`api/category/restaurant/${restaurantId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: GET_RESTAURANT_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
        console.error("Error fetching restaurant categories:", error);
        dispatch({
            type: GET_RESTAURANT_CATEGORY_FAILURE,
            payload: error.response?.data?.message || "Failed to fetch categories"
        });
    }
};