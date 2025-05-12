package es.adrian.udaw_eats.service;

import es.adrian.udaw_eats.dto.OrderDto;
import es.adrian.udaw_eats.model.*;
import es.adrian.udaw_eats.repository.*;
import es.adrian.udaw_eats.request.CreateOrderRequest;
import es.adrian.udaw_eats.response.OrderResponseOrderItem;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Order Service Implementation
 * <p>
 * This service handles all order-related business logic in the UDAW-Eats application.
 * It is responsible for creating, updating, and managing orders throughout their lifecycle.
 * <p>
 * Key responsibilities include:
 * <ul>
 *   <li>Creating new orders from cart items</li>
 *   <li>Managing order status transitions (PENDING → OUT_FOR_DELIVERY → DELIVERED → COMPLETED)</li>
 *   <li>Retrieving orders for customers and restaurants</li>
 *   <li>Calculating order totals and managing order items</li>
 *   <li>Handling delivery address management for orders</li>
 * </ul>
 * <p>
 * This service is transactional to ensure data consistency, especially during the critical
 * order creation process which involves multiple database operations.
 */
@Slf4j
@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private CartService cartService;

    /**
     * Creates a new order in the system
     * <p>
     * This is one of the most complex operations in the application, involving multiple steps:
     * <ol>
     *   <li>Resolving the delivery address (using existing or creating new)</li>
     *   <li>Finding the restaurant for the order</li>
     *   <li>Creating the order entity with initial PENDING status</li>
     *   <li>Converting cart items to order items</li>
     *   <li>Calculating order totals (items count and price)</li>
     *   <li>Saving all entities to the database</li>
     *   <li>Clearing the user's cart after successful order creation</li>
     * </ol>
     * <p>
     * The method is transactional to ensure that either all operations succeed or none do,
     * preventing partial orders or data inconsistencies.
     *
     * @param req  The order creation request containing restaurant ID, delivery address, and other details
     * @param user The user (customer) placing the order
     * @return OrderDto containing the complete order information
     * @throws Exception If any part of the order creation process fails
     */
    @Override
    @Transactional
    public OrderDto createOrder(CreateOrderRequest req, User user) throws Exception {

        Address shippingAddress;

        if (req.getDeliveryAddressId() != null) {
            // Buscar la dirección existente
            shippingAddress = addressRepository.findById(req.getDeliveryAddressId())
                    .orElseThrow(() -> new Exception("Address not found"));
        } else {
            // Si no hay ID, se usa la dirección proporcionada en la petición y se guarda
            shippingAddress = req.getDeliveryAddress();
            shippingAddress.setCustomer(user);
            shippingAddress = addressRepository.save(shippingAddress);

            if (!user.getAddresses().contains(shippingAddress)) {
                user.getAddresses().add(shippingAddress);
                userRepository.save(user);
            }
        }

        Restaurant restaurant = restaurantService.findRestaurantById(req.getRestaurantId());

        // Crear y guardar la orden primero
        Order createdOrder = new Order();
        createdOrder.setCustomer(user);
        createdOrder.setCreatedAt(new Date());
        createdOrder.setOrderStatus("PENDING");
        createdOrder.setDeliveryAddress(shippingAddress);
        createdOrder.setRestaurant(restaurant);

        // Guardar la orden en la base de datos
        createdOrder = orderRepository.save(createdOrder);

        Cart cart = cartService.findCartByUserId(user.getId());
        List<OrderItem> orderItems = new ArrayList<>();

        int totalItem = 0;
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setFood(cartItem.getFood());
            orderItem.setIngredients(String.join(",", cartItem.getIngredients()));
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setTotalPrice(cartItem.getTotalPrice());

            totalItem += cartItem.getQuantity();

            // Asociar el item a la orden ya guardada
            orderItem.setOrder(createdOrder);

            // Guardar el OrderItem en la base de datos
            OrderItem savedOrderItem = orderItemRepository.save(orderItem);
            orderItems.add(savedOrderItem);

        }

        // Establecer el total de ítems y el precio total de la orden
        createdOrder.setTotalItem(totalItem);
        createdOrder.setTotalPrice(orderItems.stream().mapToLong(OrderItem::getTotalPrice).sum());

        // Guardar la orden con el total actualizado
        createdOrder = orderRepository.save(createdOrder);

        cartService.clearCart(user.getId());

        return mapToDto(createdOrder,orderItems);
    }

    /**
     * Maps an Order entity and its OrderItems to an OrderDto
     * <p>
     * This method transforms the database entities into a data transfer object (DTO)
     * that can be safely returned to the client. It includes all necessary information
     * about the order, its items, pricing, and status.
     * <p>
     * The mapping process handles the relationship between Order and OrderItems,
     * ensuring that all items are properly associated with the order in the DTO.
     *
     * @param order The Order entity to map
     * @param items The list of OrderItem entities associated with the order
     * @return OrderDto containing the complete order information
     */
    private OrderDto mapToDto (Order order, List<OrderItem> items){
        return OrderDto.builder()
                .id(order.getId())
                .customer(order.getCustomer())
                .deliveryAddress(order.getDeliveryAddress())
                .items(items.stream().map(this::mapToDto).toList())
                .totalPrice(order.getTotalPrice())
                .createdAt(order.getCreatedAt())
                .orderStatus(order.getOrderStatus())
                .totalItem(order.getTotalItem())
                .build();
    }

    /**
     * Maps an OrderItem entity to an OrderResponseOrderItem DTO
     * <p>
     * This method transforms an individual order item entity into a data transfer object
     * that can be included in the order response. It handles the conversion of the
     * comma-separated ingredients string into a list of individual ingredients.
     * <p>
     * This mapping is important for presenting order items in a format that's easy
     * for the frontend to consume and display.
     *
     * @param orderItem The OrderItem entity to map
     * @return OrderResponseOrderItem DTO with the item's details
     */
    private OrderResponseOrderItem mapToDto (OrderItem orderItem){
        return OrderResponseOrderItem.builder()
                .id(orderItem.getId())
                .food(orderItem.getFood())
                .ingredients(List.of(orderItem.getIngredients().split(",")))
                .quantity(orderItem.getQuantity())
                .totalPrice(orderItem.getTotalPrice())
                .build();
    }


    /**
     * Updates the status of an existing order
     * <p>
     * This method allows changing the status of an order as it progresses through
     * the delivery lifecycle. It validates that the new status is one of the allowed
     * values (PENDING, OUT_FOR_DELIVERY, DELIVERED, COMPLETED) before making the change.
     * <p>
     * This is a critical operation for the restaurant dashboard, allowing restaurant
     * owners to track and update order progress.
     *
     * @param orderId     The ID of the order to update
     * @param orderStatus The new status to set for the order
     * @return OrderDto containing the updated order information
     * @throws Exception If the order is not found or if the status is invalid
     */
    @Override
    public OrderDto updateOrder(Long orderId, String orderStatus) throws Exception {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new Exception("Order not found"));
        var orderItems = orderItemRepository.findByOrder_Id(orderId);

        if (orderStatus.equals("OUT_FOR_DELIVERY")
                || orderStatus.equals("DELIVERED")
                || orderStatus.equals("COMPLETED")
                || orderStatus.equals("PENDING")){

            order.setOrderStatus(orderStatus);
            return mapToDto(orderRepository.save(order), orderItems);
        }
        throw new Exception("Please select a valid order status");

    }

    @Override
    public void cancelOrder(Long orderId) throws Exception {

        if (orderRepository.existsById(orderId)) {
            orderRepository.deleteById(orderId);
            return;
        }
        throw new Exception("Order not found");

    }

    @Override
    public List<OrderDto> getUserOrders(Long userId) throws Exception {
        var orders = orderRepository.findByCustomerId(userId);

        return orders
                .stream()
                .map(o -> mapToDto(o,  orderItemRepository.findByOrder_Id(o.getId()))).toList();
    }

    /**
     * Retrieves all orders for a specific restaurant with optional status filtering
     * <p>
     * This method is used by the restaurant dashboard to display orders. It can
     * optionally filter orders by status (e.g., show only PENDING orders).
     * <p>
     * The method performs the following steps:
     * <ol>
     *   <li>Fetch all orders for the specified restaurant</li>
     *   <li>Apply status filtering if a status parameter is provided</li>
     *   <li>For each order, fetch its order items</li>
     *   <li>Map all entities to DTOs for the response</li>
     * </ol>
     * <p>
     * This is a key method for the restaurant owner interface, providing the data
     * needed to manage incoming orders.
     *
     * @param restaurantId The ID of the restaurant to get orders for
     * @param orderStatus  Optional status to filter orders by (can be null for all orders)
     * @return List of OrderDto objects containing the restaurant's orders
     * @throws Exception If there's an error retrieving the orders
     */
    @Override
    public List<OrderDto> getRestaurantOrders(Long restaurantId, String orderStatus) throws Exception {
        List<Order> orders = orderRepository.findByRestaurantId(restaurantId);

        if (orderStatus != null){
            orders = orders.stream().filter(order -> order.getOrderStatus().equals(orderStatus)).toList();
        }

        return orders
                .stream()
                .map(o -> mapToDto(o,  orderItemRepository.findByOrder_Id(o.getId()))).toList();
    }

    @Override
    public OrderDto findOrderById(Long orderId) throws Exception {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new Exception("Order not found"));
        var orderItems = orderItemRepository.findByOrder_Id(orderId);

        return mapToDto(order, orderItems);
    }
}
