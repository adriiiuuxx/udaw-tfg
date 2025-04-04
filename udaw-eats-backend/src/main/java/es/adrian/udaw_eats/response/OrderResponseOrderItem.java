package es.adrian.udaw_eats.response;

import es.adrian.udaw_eats.model.Food;
import lombok.Builder;
import lombok.Value;

import java.util.List;


@Builder
public record OrderResponseOrderItem (

    Long id,

    Food food,

    int quantity,

    Long totalPrice,

    List<String> ingredients
){}

