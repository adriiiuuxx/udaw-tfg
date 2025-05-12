package es.adrian.udaw_eats.controller;

import es.adrian.udaw_eats.model.Address;
import es.adrian.udaw_eats.model.User;
import es.adrian.udaw_eats.service.AddressService;
import es.adrian.udaw_eats.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<Address>> getAllAddresses(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        List<Address> addresses = addressService.getAllAddressesByUser(user);
        return new ResponseEntity<>(addresses, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Address> getAddressById(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Address address = addressService.getAddressById(id, user);
        return new ResponseEntity<>(address, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Address> createAddress(@RequestBody Address address, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Address createdAddress = addressService.createAddress(address, user);
        return new ResponseEntity<>(createdAddress, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Address> updateAddress(@PathVariable Long id, @RequestBody Address address, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Address updatedAddress = addressService.updateAddress(id, address, user);
        return new ResponseEntity<>(updatedAddress, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        addressService.deleteAddress(id, user);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
