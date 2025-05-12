package es.adrian.udaw_eats.repository;

import es.adrian.udaw_eats.model.Address;
import es.adrian.udaw_eats.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address,Long> {
    List<Address> findByCustomer(User customer);
}
