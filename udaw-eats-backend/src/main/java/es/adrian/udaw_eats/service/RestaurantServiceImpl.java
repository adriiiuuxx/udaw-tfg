package es.adrian.udaw_eats.service;

import es.adrian.udaw_eats.dto.RestaurantDto;
import es.adrian.udaw_eats.model.Address;
import es.adrian.udaw_eats.model.Restaurant;
import es.adrian.udaw_eats.model.User;
import es.adrian.udaw_eats.repository.AddressRepository;
import es.adrian.udaw_eats.repository.RestaurantRepository;
import es.adrian.udaw_eats.repository.UserRepository;
import es.adrian.udaw_eats.request.CreateRestaurantRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RestaurantServiceImpl implements RestaurantService{

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Restaurant createRestaurant(CreateRestaurantRequest req, User user) {

        Address address = req.getAddress();
        address.setCustomer(user);
        address = addressRepository.save(address);

        Restaurant restaurant = new Restaurant();
        restaurant.setAddress(address);
        restaurant.setContactInformation(req.getContactInformation());
        restaurant.setCuisineType(req.getCuisineType());
        restaurant.setDescription(req.getDescription());
        restaurant.setImages(req.getImages());
        restaurant.setName(req.getName());
        restaurant.setOpeningHours(req.getOpeningHours());
        restaurant.setRegistrationDate(LocalDateTime.now());
        restaurant.setOwner(user);

        return restaurantRepository.save(restaurant);

    }

    @Override
    public RestaurantDto addToFavourites(Long restaurantId, User user) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);

        RestaurantDto dto = new RestaurantDto();
        dto.setDescription(restaurant.getDescription());
        dto.setImages(restaurant.getImages());
        dto.setTitle(restaurant.getName());
        dto.setId(restaurantId);

        boolean isAlreadyAdded = false;
        List<RestaurantDto> favourites = user.getFavourites();
        for (RestaurantDto favourite : favourites){
            if (favourite.getId().equals(restaurantId)){
                isAlreadyAdded = true;
                break;
            }
        }

        if (isAlreadyAdded){
            favourites.removeIf(favourite -> favourite.getId().equals(restaurantId));
        }else {
            favourites.add(dto);
        }

        userRepository.save(user);

        return dto;

    }

    @Override
    public List<Restaurant> getAllRestaurant() {
        return restaurantRepository.findAll();
    }

    @Override
    public List<Restaurant> searchRestaurant(String keyword) {
        return restaurantRepository.findBySearchQuery(keyword);
    }

    @Override
    public Restaurant findRestaurantById(Long id) throws Exception {
        Optional<Restaurant> opt = restaurantRepository.findById(id);

        if (opt.isEmpty()){
            throw new Exception("Restaurant not found with id "+ id);
        }

        return opt.get();
    }

    @Override
    public Restaurant getRestaurantByUserId(Long userId) throws Exception {
        Restaurant restaurant = restaurantRepository.findByOwnerId(userId);

        if (restaurant == null){
            throw new Exception("Restaurant not found with owner id " + userId);
        }

        return restaurant;
    }

    @Override
    public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updatedRestaurant) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);

        if (updatedRestaurant.getCuisineType() != null) {
            restaurant.setCuisineType(updatedRestaurant.getCuisineType());
        }

        if (updatedRestaurant.getDescription() != null) {
            restaurant.setDescription(updatedRestaurant.getDescription());
        }

        if (updatedRestaurant.getName() != null) {
            restaurant.setName(updatedRestaurant.getName());
        }
        return restaurantRepository.save(restaurant);

    }

    @Override
    public Restaurant updateRestaurantStatus(Long id) throws Exception {
        Restaurant restaurant = findRestaurantById(id);
        restaurant.setOpened(!restaurant.isOpened());

        return restaurantRepository.save(restaurant);
    }

    @Override
    public void deleteRestaurant(Long restaurantId) throws Exception {
        Restaurant restaurant = findRestaurantById(restaurantId);

        List<User> users = userRepository.findAll();
        for (User user : users) {
            List<RestaurantDto> favourites = user.getFavourites();
            favourites.removeIf(fav -> fav.getId().equals(restaurantId));
            userRepository.save(user);
        }


        restaurantRepository.delete(restaurant);

    }
}
