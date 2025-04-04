package es.adrian.udaw_eats.dto;

import es.adrian.udaw_eats.model.Address;
import es.adrian.udaw_eats.model.OrderItem;
import es.adrian.udaw_eats.model.User;
import es.adrian.udaw_eats.response.OrderResponseOrderItem;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Builder
public class OrderDto {

    private Long id;

    private User customer;

    private String orderStatus;

    private Date createdAt;

    private Address deliveryAddress;

    private List<OrderResponseOrderItem> items;

    private int totalItem;

    private Long totalPrice;
}
