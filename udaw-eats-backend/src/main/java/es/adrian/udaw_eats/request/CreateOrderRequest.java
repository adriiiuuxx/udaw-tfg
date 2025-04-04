package es.adrian.udaw_eats.request;

import es.adrian.udaw_eats.model.Address;
import lombok.Data;

@Data
public class CreateOrderRequest {
    private Long deliveryAddressId;
    private Long restaurantId;
    private Address deliveryAddress;

}
