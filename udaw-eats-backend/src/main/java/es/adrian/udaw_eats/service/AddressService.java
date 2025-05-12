package es.adrian.udaw_eats.service;

import es.adrian.udaw_eats.model.Address;
import es.adrian.udaw_eats.model.User;

import java.util.List;

public interface AddressService {
    List<Address> getAllAddressesByUser(User user);
    
    Address getAddressById(Long id, User user) throws Exception;
    
    Address createAddress(Address address, User user);
    
    Address updateAddress(Long id, Address address, User user) throws Exception;
    
    void deleteAddress(Long id, User user) throws Exception;
}
