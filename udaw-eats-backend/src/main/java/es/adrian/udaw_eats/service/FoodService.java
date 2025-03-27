package es.adrian.udaw_eats.service;

import es.adrian.udaw_eats.model.Category;
import es.adrian.udaw_eats.model.Food;
import es.adrian.udaw_eats.model.Restaurant;
import es.adrian.udaw_eats.request.CreateFoodRequest;

import java.util.List;

public interface FoodService {
    Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant);

    List<Food> getRestaurantsFood(Long restaurantId, boolean isVegetarian, boolean isNonVegetarian, String foodCategory);

    List<Food> searchFood(String keyword);

    Food findFoodById(Long id) throws Exception;

    Food updateAvailability(Long foodId) throws Exception;

    void deleteFood(Long id) throws Exception;
}
