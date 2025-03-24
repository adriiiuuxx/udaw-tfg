package es.adrian.udaw_eats.repository;

import es.adrian.udaw_eats.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address,Long> {


}
