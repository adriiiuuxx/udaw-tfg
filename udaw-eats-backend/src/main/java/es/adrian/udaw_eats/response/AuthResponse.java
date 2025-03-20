package es.adrian.udaw_eats.response;

import es.adrian.udaw_eats.model.USER_ROLE;
import lombok.Data;

@Data
public class AuthResponse {
    private String jwt;
    private String message;
    private USER_ROLE role;
}
