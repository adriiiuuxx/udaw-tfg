package es.adrian.udaw_eats.request;

import es.adrian.udaw_eats.model.Category;
import es.adrian.udaw_eats.model.IngredientsItem;
import lombok.Data;

import java.util.List;

@Data
public class CreateFoodRequest {
    private String name;
    private String description;
    private Long price;

    private Category category;
    private List<String> images;

    private Long restaurantId;
    private boolean isVegetarian;
    private List<Long> ingredients;

}
