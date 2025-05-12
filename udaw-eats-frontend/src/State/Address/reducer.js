import * as actionType from "./actionType";

const initialState = {
    addresses: [],
    loading: false,
    error: null,
    selectedAddress: null,
    currentAddress: null
};

export const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_USER_ADDRESS_REQUEST:
        case actionType.CREATE_ADDRESS_REQUEST:
        case actionType.UPDATE_ADDRESS_REQUEST:
        case actionType.DELETE_ADDRESS_REQUEST:
        case actionType.GET_ADDRESS_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        
        case actionType.GET_USER_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                addresses: action.payload
            };
            
        case actionType.GET_ADDRESS_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                currentAddress: action.payload
            };
            
        case actionType.CREATE_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                addresses: [...state.addresses, action.payload],
                selectedAddress: action.payload
            };
            
        case actionType.UPDATE_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                addresses: state.addresses.map(address => 
                    address.id === action.payload.id ? action.payload : address
                ),
                // If the selected address was updated, update it too
                selectedAddress: state.selectedAddress?.id === action.payload.id 
                    ? action.payload 
                    : state.selectedAddress,
                currentAddress: action.payload
            };
            
        case actionType.DELETE_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                addresses: state.addresses.filter(address => address.id !== action.payload),
                // If the selected address was deleted, clear it
                selectedAddress: state.selectedAddress?.id === action.payload 
                    ? null 
                    : state.selectedAddress
            };
            
        case actionType.GET_USER_ADDRESS_FAILURE:
        case actionType.CREATE_ADDRESS_FAILURE:
        case actionType.UPDATE_ADDRESS_FAILURE:
        case actionType.DELETE_ADDRESS_FAILURE:
        case actionType.GET_ADDRESS_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
            
        default:
            return state;
    }
};
