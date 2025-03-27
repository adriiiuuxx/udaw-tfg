package es.adrian.udaw_eats.service;

import es.adrian.udaw_eats.model.Category;
import es.adrian.udaw_eats.model.Food;
import es.adrian.udaw_eats.model.IngredientsItem;
import es.adrian.udaw_eats.model.Restaurant;
import es.adrian.udaw_eats.repository.FoodRepository;
import es.adrian.udaw_eats.request.CreateFoodRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Override
    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant) {
        Food food = new Food();
        food.setFoodCategory(category);
        food.setRestaurant(restaurant);
        food.setDescription(req.getDescription());
        food.setImages(req.getImages());
        food.setName(req.getName());
        food.setPrice(req.getPrice());
        food.setIngredients(req.getIngredients());
        food.setVegetarian(req.isVegetarian());
        food.setCreationDate(LocalDateTime.now());

        Food savedFood =  foodRepository.save(food);

        restaurant.getFoods().add(savedFood);

        return savedFood;
    }

    @Override
    public List<Food> getRestaurantsFood(Long restaurantId, boolean isVegetarian, boolean isNonVegetarian, String foodCategory) {

        List<Food> foods = foodRepository.findByRestaurantId(restaurantId);

        if (isVegetarian && !isNonVegetarian) {
            foods = foods.stream().filter(Food::isVegetarian).collect(Collectors.toList());
        }

        if (!isVegetarian && isNonVegetarian) {
            foods = foods.stream().filter(food -> !food.isVegetarian()).collect(Collectors.toList());
        }

        if (foodCategory != null && !foodCategory.isEmpty()) {
            foods = foods.stream()
                    .filter(food -> food.getFoodCategory() != null && food.getFoodCategory().getName().equalsIgnoreCase(foodCategory))
                    .collect(Collectors.toList());
        }

        System.out.println("Comidas después de filtrar: " + foods.size());
        return foods;
    }

/*
    private List<Food> filterByVegetarian(List<Food> foods, boolean isVegetarian) {
        return foods.stream().filter(food -> food.isVegetarian()==isVegetarian).collect(Collectors.toList());
    }

    private List<Food> filterByNonVegetarian(List<Food> foods, boolean isNonVegetarian) {
        return foods.stream().filter(food -> !food.isVegetarian()).collect(Collectors.toList());
    }

    private List<Food> filterByCategory(List<Food> foods, String foodCategory) {
        return foods.stream().filter(food -> {
            if (food.getFoodCategory() != null){
                return food.getFoodCategory().getName().equals(foodCategory);
            }
            return false;
        }).collect(Collectors.toList());
    }
*/

    @Override
    public List<Food> searchFood(String keyword) {
        return foodRepository.searchFood(keyword);
    }

    @Override
    public Food findFoodById(Long id) throws Exception {
        Optional<Food> optionalFood = foodRepository.findById(id);

        if (optionalFood.isEmpty()){
            throw new Exception("Food does not exist");
        }
        return optionalFood.get();
    }

    @Override
    public Food updateAvailability(Long foodId) throws Exception {
        Food food = findFoodById(foodId);
        food.setAvailable(!food.isAvailable());

        return foodRepository.save(food);
    }

    @Override
    public void deleteFood(Long id) throws Exception {
        Food food = findFoodById(id);
        food.setRestaurant(null);
        foodRepository.delete(food);
    }
}
