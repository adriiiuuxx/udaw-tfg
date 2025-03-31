package es.adrian.udaw_eats.repository;

import es.adrian.udaw_eats.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {
    List<Category> findByRestaurantId(Long id);
}
