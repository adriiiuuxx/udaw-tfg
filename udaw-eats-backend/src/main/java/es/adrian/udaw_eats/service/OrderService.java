package es.adrian.udaw_eats.service;

import es.adrian.udaw_eats.dto.OrderDto;
import es.adrian.udaw_eats.model.Order;
import es.adrian.udaw_eats.model.User;
import es.adrian.udaw_eats.request.CreateOrderRequest;

import java.util.List;

public interface OrderService {

    OrderDto createOrder(CreateOrderRequest req, User user) throws Exception;

    OrderDto updateOrder(Long orderId, String orderStatus) throws Exception;

    void cancelOrder(Long orderId) throws Exception;

    List<OrderDto> getUserOrders(Long userId) throws Exception;

    List<OrderDto> getRestaurantOrders(Long restaurantId, String orderStatus) throws Exception;

    OrderDto findOrderById(Long orderId)throws Exception;

}
