package es.adrian.udaw_eats.service;

import es.adrian.udaw_eats.model.Cart;
import es.adrian.udaw_eats.model.CartItem;
import es.adrian.udaw_eats.request.AddCartItemRequest;

public interface CartService {

    CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception;

    CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception;

    Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception;

    Long calculateCartTotal(Cart cart) throws Exception;

    Cart findCartById(Long id) throws Exception;

    Cart findCartByUserId (Long userId) throws Exception;

    Cart clearCart(Long userId) throws Exception;

}
