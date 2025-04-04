package es.adrian.udaw_eats.controller;

import es.adrian.udaw_eats.dto.OrderDto;
import es.adrian.udaw_eats.model.User;
import es.adrian.udaw_eats.service.OrderService;
import es.adrian.udaw_eats.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminOrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @GetMapping("/order/restaurant/{id}")
    public ResponseEntity<List<OrderDto>> getOrderHistory(@PathVariable Long id,
                                                          @RequestParam (required = false) String orderStatus,
                                                          @RequestHeader("Authorization") String jwt) throws Exception{

        User user = userService.findUserByJwtToken(jwt);

        var orders = orderService.getRestaurantOrders(id, orderStatus);

        return new ResponseEntity<>(orders, HttpStatus.OK);

    }

    @PutMapping("/order/{id}/{orderStatus}")
    public ResponseEntity<OrderDto> updateOrderStatus(@PathVariable Long id,
                                                       @PathVariable String orderStatus,
                                                       @RequestHeader("Authorization") String jwt) throws Exception{

        User user = userService.findUserByJwtToken(jwt);

        var order = orderService.updateOrder(id, orderStatus);

        return new ResponseEntity<>(order, HttpStatus.OK);

    }

}
