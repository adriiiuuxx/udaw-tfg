package es.adrian.udaw_eats.service;

import es.adrian.udaw_eats.model.IngredientCategory;
import es.adrian.udaw_eats.model.IngredientsItem;

import java.util.List;

public interface IngredientService {
    IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception;

    IngredientCategory findIngredientCategoryById(Long id) throws Exception;

    List<IngredientCategory> findIngredientCategoryByRestaurantId(Long id) throws Exception;

    IngredientsItem createIngredientItem(Long restaurantId, String ingredientName, Long categoryId) throws Exception;

    List<IngredientsItem> findRestaurantsIngredients(Long restaurantId);

    IngredientsItem updateStock(Long id) throws Exception;

}
