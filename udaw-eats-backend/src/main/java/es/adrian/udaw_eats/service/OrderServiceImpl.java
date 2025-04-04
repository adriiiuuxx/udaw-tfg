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

    private OrderResponseOrderItem mapToDto (OrderItem orderItem){
        return OrderResponseOrderItem.builder()
                .id(orderItem.getId())
                .food(orderItem.getFood())
                .ingredients(List.of(orderItem.getIngredients().split(",")))
                .quantity(orderItem.getQuantity())
                .totalPrice(orderItem.getTotalPrice())
                .build();
    }


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
