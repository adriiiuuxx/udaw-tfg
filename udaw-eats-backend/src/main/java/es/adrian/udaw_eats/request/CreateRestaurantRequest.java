package es.adrian.udaw_eats.request;

import es.adrian.udaw_eats.model.Address;
import es.adrian.udaw_eats.model.ContactInformation;
import lombok.Data;

import java.util.List;

@Data
public class CreateRestaurantRequest {

    private Long id;

    private  String name;

    private String description;

    private String cuisineType;

    private Address address;

    private ContactInformation contactInformation;

    private String openingHours;

    private List<String> images;

}
