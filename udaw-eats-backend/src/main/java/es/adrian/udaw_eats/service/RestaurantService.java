package es.adrian.udaw_eats.service;

import es.adrian.udaw_eats.dto.RestaurantDto;
import es.adrian.udaw_eats.model.Restaurant;
import es.adrian.udaw_eats.model.User;
import es.adrian.udaw_eats.request.CreateRestaurantRequest;

import java.util.List;

public interface RestaurantService {
    Restaurant createRestaurant(CreateRestaurantRequest req, User user);

    RestaurantDto addToFavourites(Long restaurantId, User user) throws Exception;

    List<Restaurant> getAllRestaurant();

    List<Restaurant> searchRestaurant(String keyword);

    Restaurant findRestaurantById(Long id) throws Exception;

    Restaurant getRestaurantByUserId(Long userId) throws Exception;

    Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updatedRestaurant) throws Exception;

    Restaurant updateRestaurantStatus(Long id) throws Exception;

    void deleteRestaurant(Long restaurantId) throws Exception;
}
