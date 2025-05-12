package es.adrian.udaw_eats.controller;

import es.adrian.udaw_eats.dto.RestaurantDto;
import es.adrian.udaw_eats.model.Restaurant;
import es.adrian.udaw_eats.model.User;
import es.adrian.udaw_eats.service.RestaurantService;
import es.adrian.udaw_eats.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Restaurant Controller
 * <p>
 * This controller handles all customer-facing restaurant operations in the UDAW-Eats application.
 * It provides endpoints for searching, listing, and retrieving restaurant details, as well as
 * managing user favorites.
 * <p>
 * All endpoints require JWT authentication via the Authorization header.
 * The controller validates the JWT token and identifies the user before processing any request.
 * <p>
 * Base path: /api/restaurants
 */
@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {
    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private UserService userService;

    /**
     * Search for restaurants by keyword
     * <p>
     * This endpoint allows customers to search for restaurants based on a keyword that matches
     * restaurant name, cuisine type, or other searchable fields.
     * <p>
     * The search is case-insensitive and uses partial matching to find relevant results.
     *
     * @param keyword The search term to find matching restaurants
     * @param jwt     JWT token for authentication in the Authorization header
     * @return ResponseEntity containing a list of matching Restaurant objects
     * @throws Exception If authentication fails or if there's an error during search
     */
    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurant(@RequestParam String keyword,
                                                 @RequestHeader("Authorization") String jwt) throws Exception{

        User user = userService.findUserByJwtToken(jwt);

        List<Restaurant> restaurant = restaurantService.searchRestaurant(keyword);

        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    /**
     * Get all available restaurants
     * <p>
     * This endpoint retrieves all active restaurants in the system, allowing customers
     * to browse the complete list of available dining options.
     * <p>
     * Results include basic restaurant information such as name, cuisine type, and ratings.
     *
     * @param jwt JWT token for authentication in the Authorization header
     * @return ResponseEntity containing a list of all active Restaurant objects
     * @throws Exception If authentication fails or if there's an error retrieving restaurants
     */
    @GetMapping()
    public ResponseEntity<List<Restaurant>> getAllRestaurants(
            @RequestHeader("Authorization") String jwt) throws Exception{

        User user = userService.findUserByJwtToken(jwt);

        List<Restaurant> restaurant = restaurantService.getAllRestaurant();

        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    /**
     * Get detailed information about a specific restaurant
     * <p>
     * This endpoint retrieves complete details for a single restaurant identified by its ID.
     * The response includes all restaurant information, including menu items, opening hours,
     * location, and contact details.
     *
     * @param jwt JWT token for authentication in the Authorization header
     * @param id  The unique identifier of the restaurant to retrieve
     * @return ResponseEntity containing the complete Restaurant object
     * @throws Exception If authentication fails, if the restaurant doesn't exist, or if there's an error
     */
    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id) throws Exception{

        User user = userService.findUserByJwtToken(jwt);

        Restaurant restaurant = restaurantService.findRestaurantById(id);

        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }

    /**
     * Add a restaurant to the user's favorites list
     * <p>
     * This endpoint allows customers to mark a restaurant as a favorite for quick access later.
     * If the restaurant is already in the user's favorites, it will not be added again.
     * <p>
     * The favorites list is stored as part of the user profile and persists across sessions.
     *
     * @param jwt JWT token for authentication in the Authorization header
     * @param id  The unique identifier of the restaurant to add to favorites
     * @return ResponseEntity containing the RestaurantDto that was added to favorites
     * @throws Exception If authentication fails, if the restaurant doesn't exist, or if there's an error
     */
    @PutMapping("/{id}/add-favourites")
    public ResponseEntity<RestaurantDto> addToFavourites(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long id) throws Exception{

        User user = userService.findUserByJwtToken(jwt);

        RestaurantDto restaurant = restaurantService.addToFavourites(id, user);


        return new ResponseEntity<>(restaurant, HttpStatus.OK);
    }
}
