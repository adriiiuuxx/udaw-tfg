import * as actionType from "./actionType";

const initialState = {
    ingredients: [],
    category: [],
    loading: false,
    error: null,
    message: null, 
    update: null
}

export const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.CREATE_INGREDIENT_REQUEST:
        case actionType.CREATE_INGREDIENT_CATEGORY_REQUEST:
        case actionType.GET_INGREDIENT_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: null
            };

        case actionType.GET_INGREDIENTS:
            return {
                ...state,
                loading: false,
                ingredients: action.payload,
                error: null
            };

        case actionType.UPDATE_STOCK:
            return {
                ...state,
                ingredients: state.ingredients.map(ingredient =>
                    ingredient.id === action.payload.id ? action.payload : ingredient
                ),
                message: "Stock updated successfully"
            };

        case actionType.CREATE_INGREDIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                ingredients: [...state.ingredients, action.payload],
                error: null,
                message: "Ingredient created successfully"
            };

        case actionType.CREATE_INGREDIENT_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                category: [...state.category, action.payload],
                error: null,
                message: "Category created successfully"
            };

        case actionType.GET_INGREDIENT_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                category: action.payload,
                error: null
            };

        case actionType.CREATE_INGREDIENT_FAILURE:
        case actionType.CREATE_INGREDIENT_CATEGORY_FAILURE:
        case actionType.GET_INGREDIENT_CATEGORY_FAILURE:
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