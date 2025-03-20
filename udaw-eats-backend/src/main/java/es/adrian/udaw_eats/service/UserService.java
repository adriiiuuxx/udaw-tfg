package es.adrian.udaw_eats.service;

import es.adrian.udaw_eats.model.User;


public interface UserService {
    User findUserByJwtToken(String jwt) throws Exception;

    User findUserByEmail(String email) throws Exception;
}
