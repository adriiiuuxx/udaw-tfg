package es.adrian.udaw_eats.service;

import es.adrian.udaw_eats.dto.OrderDto;
import es.adrian.udaw_eats.response.PaymentResponse;

public interface PaymentService{
    PaymentResponse createPaymentLink(OrderDto order) throws Exception;
}
