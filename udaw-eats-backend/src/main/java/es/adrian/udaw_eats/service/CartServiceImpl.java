package es.adrian.udaw_eats.service;

import es.adrian.udaw_eats.model.Cart;
import es.adrian.udaw_eats.model.CartItem;
import es.adrian.udaw_eats.model.Food;
import es.adrian.udaw_eats.model.User;
import es.adrian.udaw_eats.repository.CartItemRepository;
import es.adrian.udaw_eats.repository.CartRepository;
import es.adrian.udaw_eats.request.AddCartItemRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartServiceImpl implements CartService{

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private  UserService userService;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private FoodService foodService;

    @Override
    public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Food food = foodService.findFoodById(req.getFoodId());
        Cart cart = cartRepository.findByCustomerId(user.getId());

        for (CartItem cartItem : cart.getItems()) {
            if (cartItem.getFood().equals(food)) {
                int newQuantity = cartItem.getQuantity() + req.getQuantity();
                CartItem updatedItem = updateCartItemQuantity(cartItem.getId(), newQuantity);
                cart.setTotal(calculateCartTotal(cart)); // TOTAL
                cartRepository.save(cart);
                return updatedItem;
            }
        }

        CartItem newCartItem = new CartItem();
        newCartItem.setFood(food);
        newCartItem.setQuantity(req.getQuantity());
        newCartItem.setCart(cart);
        newCartItem.setIngredients(req.getIngredients());
        newCartItem.setTotalPrice(req.getQuantity() * food.getPrice());

        CartItem savedCartItem = cartItemRepository.save(newCartItem);
        cart.getItems().add(savedCartItem);

        // TOTAL DEL CARRITO
        cart.setTotal(calculateCartTotal(cart));
        cartRepository.save(cart);

        return savedCartItem;
    }


    @Override
    public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception {
        Optional <CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);
        if (cartItemOptional.isEmpty()){
            throw new Exception("Cart item not found");
        }

        CartItem cartItem = cartItemOptional.get();
        cartItem.setQuantity(quantity);
        cartItem.setTotalPrice(cartItem.getFood().getPrice() * quantity);

        return cartItemRepository.save(cartItem);

    }

    @Override
    public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        Cart cart = cartRepository.findByCustomerId(user.getId());

        Optional <CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);
        if (cartItemOptional.isEmpty()){
            throw new Exception("Cart item not found");
        }

        CartItem cartItem = cartItemOptional.get();

        cart.getItems().remove(cartItem);

        return cartRepository.save(cart);

    }

    @Override
    public Long calculateCartTotal(Cart cart) throws Exception {
        Long total = 0L;

        for (CartItem cartItem : cart.getItems()){
            total = cartItem.getFood().getPrice() * cartItem.getQuantity();
        }

        return total;
    }

    @Override
    public Cart findCartById(Long id) throws Exception {
        Optional<Cart> optionalCart = cartRepository.findById(id);

        if (optionalCart.isEmpty()){
            throw new Exception("Cart not found with id " + id);
        }


        return optionalCart.get();
    }

    @Override
    public Cart findCartByUserId(String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        return cartRepository.findByCustomerId(user.getId());
    }

    @Override
    public Cart clearCart(String jwt) throws Exception{
        User user = userService.findUserByJwtToken(jwt);

        Cart cart = findCartByUserId(jwt);

        cart.getItems().clear();

        return cartRepository.save(cart);
    }
}
