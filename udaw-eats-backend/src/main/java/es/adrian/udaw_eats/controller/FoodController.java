package es.adrian.udaw_eats.controller;

import es.adrian.udaw_eats.model.Food;
import es.adrian.udaw_eats.model.Restaurant;
import es.adrian.udaw_eats.model.User;
import es.adrian.udaw_eats.request.CreateFoodRequest;
import es.adrian.udaw_eats.service.FoodService;
import es.adrian.udaw_eats.service.RestaurantService;
import es.adrian.udaw_eats.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping("/search")
    public ResponseEntity<List<Food>> searchFood(@RequestParam String name,
                                          @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        List<Food> foods = foodService.searchFood(name);

        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Food>> getRestaurantFood(@RequestParam boolean vegetarian,
                                                        @RequestParam(required = false) boolean nonVegetarian,
                                                        @RequestParam(required = false) String foodCategory,
                                                        @PathVariable Long restaurantId,
                                                        @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        List<Food> foods = foodService.getRestaurantsFood(restaurantId, vegetarian, nonVegetarian, foodCategory);

        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

}
