package es.adrian.udaw_eats.repository;

import es.adrian.udaw_eats.model.IngredientsItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredientRepository extends JpaRepository<IngredientsItem,Long> {
}
