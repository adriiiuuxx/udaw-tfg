import axios from "axios";
import { ADD_TO_FAVOURITE_FAILURE, ADD_TO_FAVOURITE_REQUEST, ADD_TO_FAVOURITE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./actionType";
import { API_BASE_URL, api } from "../../component/Config/api"

export const loginUser = (reqData => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}auth/signin`, reqData.userData);

        /* console.log("Login Response:", data);  */

        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
        }
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });

        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurants");
        } else {
            reqData.navigate("/");
        }
    } catch (error) {
        /* console.error("Login Error:", error.response?.data); */ 
        dispatch({ type: LOGIN_FAILURE, payload: error.response.data });
    }
});

export const registerUser = (reqData => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}auth/signup`, reqData.userData);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
        }
        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate("admin/restaurants")
        } else {
            reqData.navigate("/")
        }
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error.response.data });
    }
})

export const getUser = (jwt => async (dispatch) => {
    // Don't make the API call if there's no token
    if (!jwt) {
        return;
    }

    dispatch({ type: GET_USER_REQUEST });
    try {
        const { data } = await api.get(`api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: GET_USER_SUCCESS, payload: data });
    } catch (error) {
        // Handle 401/403 errors differently from 500
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem("jwt"); // Clear invalid token
        }
        dispatch({ type: GET_USER_FAILURE, payload: error.response?.data });
    }
});

export const addToFavorites = ({ jwt, restaurantId }) => async (dispatch) => {
    dispatch({ type: ADD_TO_FAVOURITE_REQUEST });
    try {
        const { data } = await api.put(`api/restaurants/${restaurantId}/add-favourites`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch({ type: ADD_TO_FAVOURITE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ADD_TO_FAVOURITE_FAILURE, payload: error });
    }
}

export const logout = (navigate) => async (dispatch) => {
    localStorage.removeItem("jwt");
    dispatch({ type: LOGOUT_REQUEST });
    navigate("/");
}