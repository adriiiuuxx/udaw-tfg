import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Authentication/reducer";
import { thunk } from "redux-thunk";
import { restaurantReducer } from "./Restaurant/reducer";
import { menuItemReducer } from "./Menu/reducer";
import { cartReducer } from "./Cart/reducer";
import { orderReducer } from "./Orders/reducer";
import { restaurantOrderReducer } from "./Restaurant Orders/reducer";
import { ingredientReducer } from "./Ingredients/reducer";
import { addressReducer } from "./Address/reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer,
    menu: menuItemReducer,
    cart: cartReducer,
    order: orderReducer,
    restaurantOrder: restaurantOrderReducer,
    ingredients: ingredientReducer,
    address: addressReducer
});

export const store = legacy_createStore(
    rootReducer,
    applyMiddleware(thunk)
);