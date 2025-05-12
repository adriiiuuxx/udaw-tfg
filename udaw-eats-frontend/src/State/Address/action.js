import { api } from "../../component/Config/api";
import * as actionType from "./actionType";

// Get all addresses for the current user
export const getUserAddresses = (jwt) => async (dispatch) => {
    dispatch({ type: actionType.GET_USER_ADDRESS_REQUEST });
    
    try {
        const { data } = await api.get("api/addresses", {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        
        dispatch({ 
            type: actionType.GET_USER_ADDRESS_SUCCESS, 
            payload: data 
        });
        
        return data;
    } catch (error) {
        /* console.error("Error fetching user addresses:", error); */
        dispatch({
            type: actionType.GET_USER_ADDRESS_FAILURE,
            payload: error.response?.data?.message || "Failed to fetch addresses"
        });
        return [];
    }
};

// Get address by ID
export const getAddressById = (id, jwt) => async (dispatch) => {
    dispatch({ type: actionType.GET_ADDRESS_BY_ID_REQUEST });
    
    try {
        const { data } = await api.get(`api/addresses/${id}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        
        dispatch({ 
            type: actionType.GET_ADDRESS_BY_ID_SUCCESS, 
            payload: data 
        });
        
        return data;
    } catch (error) {
        /* console.error(`Error fetching address with id ${id}:`, error); */
        dispatch({
            type: actionType.GET_ADDRESS_BY_ID_FAILURE,
            payload: error.response?.data?.message || "Failed to fetch address"
        });
        return null;
    }
};

// Create a new address
export const createAddress = (addressData, jwt) => async (dispatch) => {
    dispatch({ type: actionType.CREATE_ADDRESS_REQUEST });
    
    try {
        const { data } = await api.post("api/addresses", addressData, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        
        dispatch({ 
            type: actionType.CREATE_ADDRESS_SUCCESS, 
            payload: data 
        });
        
        return data;
    } catch (error) {
        /* console.error("Error creating address:", error); */
        dispatch({
            type: actionType.CREATE_ADDRESS_FAILURE,
            payload: error.response?.data?.message || "Failed to create address"
        });
        return null;
    }
};

// Update an existing address
export const updateAddress = (id, addressData, jwt) => async (dispatch) => {
    dispatch({ type: actionType.UPDATE_ADDRESS_REQUEST });
    
    try {
        const { data } = await api.put(`api/addresses/${id}`, addressData, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        
        dispatch({ 
            type: actionType.UPDATE_ADDRESS_SUCCESS, 
            payload: data 
        });
        
        return data;
    } catch (error) {
        /* console.error(`Error updating address with id ${id}:`, error); */
        dispatch({
            type: actionType.UPDATE_ADDRESS_FAILURE,
            payload: error.response?.data?.message || "Failed to update address"
        });
        return null;
    }
};

// Delete an address
export const deleteAddress = (id, jwt) => async (dispatch) => {
    dispatch({ type: actionType.DELETE_ADDRESS_REQUEST });
    
    try {
        await api.delete(`api/addresses/${id}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        
        dispatch({ 
            type: actionType.DELETE_ADDRESS_SUCCESS, 
            payload: id 
        });
        
        return { success: true };
    } catch (error) {
        /* console.error(`Error deleting address with id ${id}:`, error); */
        const errorMessage = error.response?.data?.message || "Failed to delete address";
        
        dispatch({
            type: actionType.DELETE_ADDRESS_FAILURE,
            payload: errorMessage
        });
        
        return { 
            success: false, 
            error: errorMessage,
            isUsedInOrders: errorMessage.includes("used in one or more orders")
        };
    }
};

// Create a new address during order creation
export const createAddressWithOrder = ({ addressData, restaurantId, jwt }) => async (dispatch) => {
    try {
        // First create the address
        const address = await dispatch(createAddress(addressData, jwt));
        
        if (!address) {
            return null;
        }
        
        // Then create the order with the address ID
        const orderData = {
            restaurantId: restaurantId,
            deliveryAddressId: address.id
        };
        
        const { data } = await api.post("api/orders", orderData, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        
        return data;
    } catch (error) {
        console.error("Error creating address with order:", error);
        return null;
    }
};
