package es.adrian.udaw_eats.repository;

import es.adrian.udaw_eats.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

List<OrderItem> findByOrder_Id(Long id); }
