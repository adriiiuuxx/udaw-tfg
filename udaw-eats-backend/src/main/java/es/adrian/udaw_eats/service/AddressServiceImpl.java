package es.adrian.udaw_eats.service;

import es.adrian.udaw_eats.model.Address;
import es.adrian.udaw_eats.model.User;
import es.adrian.udaw_eats.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Override
    public List<Address> getAllAddressesByUser(User user) {
        return addressRepository.findByCustomer(user);
    }

    @Override
    public Address getAddressById(Long id, User user) throws Exception {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new Exception("Address not found"));
        
        if (!address.getCustomer().getId().equals(user.getId())) {
            throw new Exception("You are not authorized to access this address");
        }
        
        return address;
    }

    @Override
    public Address createAddress(Address address, User user) {
        address.setCustomer(user);
        return addressRepository.save(address);
    }

    @Override
    public Address updateAddress(Long id, Address addressDetails, User user) throws Exception {
        Address address = getAddressById(id, user);
        
        address.setStreet(addressDetails.getStreet());
        address.setCity(addressDetails.getCity());
        address.setState(addressDetails.getState());
        address.setZipCode(addressDetails.getZipCode());
        
        return addressRepository.save(address);
    }

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @Override
    public void deleteAddress(Long id, User user) throws Exception {
        Address address = getAddressById(id, user);
        
        // Check if the address is used in any orders
        Integer count = jdbcTemplate.queryForObject(
            "SELECT COUNT(*) FROM orders WHERE delivery_address_id = ?",
            Integer.class,
            id
        );
        
        if (count != null && count > 0) {
            throw new Exception("Cannot delete this address because it is used in one or more orders. Please create a new address instead.");
        }
        
        addressRepository.delete(address);
    }
}
