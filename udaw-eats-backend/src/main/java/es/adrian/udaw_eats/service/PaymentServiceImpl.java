package es.adrian.udaw_eats.service;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import es.adrian.udaw_eats.dto.OrderDto;
import es.adrian.udaw_eats.response.PaymentResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService{

    @Value("${stripe.api.key}")
    private String stripeSecretKey;
    
    @Value("${frontend.base.url:http://localhost}")
    private String frontendBaseUrl;

    @Override
    public PaymentResponse createPaymentLink(OrderDto order) throws Exception {

        Stripe.apiKey = stripeSecretKey;

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(
                SessionCreateParams.PaymentMethodType.CARD
        )
                .addPaymentMethodType(
                SessionCreateParams.PaymentMethodType.PAYPAL
        )
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(frontendBaseUrl + "/payment/success/"+order.getId())
                .setCancelUrl(frontendBaseUrl + "/payment/failure")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("eur")
                                .setUnitAmount((long) order.getTotalPrice() * 100)
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName("Udaw Eats")
                                        .build())
                                .build()
                )
                                .build()

                )
                .build();

        Session session = Session.create(params);
        PaymentResponse res = new PaymentResponse();
        res.setPayment_url(session.getUrl());

        return res;
    }
}
