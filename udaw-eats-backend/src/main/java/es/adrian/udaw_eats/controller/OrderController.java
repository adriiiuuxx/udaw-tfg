package es.adrian.udaw_eats.controller;

import es.adrian.udaw_eats.dto.OrderDto;
import es.adrian.udaw_eats.model.CartItem;
import es.adrian.udaw_eats.model.Order;
import es.adrian.udaw_eats.model.User;
import es.adrian.udaw_eats.request.CreateOrderRequest;
import es.adrian.udaw_eats.response.PaymentResponse;
import es.adrian.udaw_eats.service.OrderService;
import es.adrian.udaw_eats.service.PaymentService;
import es.adrian.udaw_eats.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/order/add")
    public ResponseEntity<PaymentResponse> createOrder(@RequestBody CreateOrderRequest req,
                                                       @RequestHeader("Authorization") String jwt) throws Exception{

        User user = userService.findUserByJwtToken(jwt);

        var order = orderService.createOrder(req,user);

        PaymentResponse res = paymentService.createPaymentLink(order);

        return new ResponseEntity<>(res, HttpStatus.CREATED);

    }

    @GetMapping("/order/user")
    public ResponseEntity<List<OrderDto>> getOrderHistory(@RequestHeader("Authorization") String jwt) throws Exception{

        User user = userService.findUserByJwtToken(jwt);

        var orders = orderService.getUserOrders(user.getId());

        return new ResponseEntity<>(orders, HttpStatus.OK);

    }


}
