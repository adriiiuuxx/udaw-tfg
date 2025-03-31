package es.adrian.udaw_eats.service;

import es.adrian.udaw_eats.model.Category;
import org.springframework.stereotype.Service;

import java.util.List;

public interface CategoryService {

    Category createCategory(String name,  Long userId) throws Exception;

    List<Category> findCategoryByRestaurantId(Long id) throws Exception;

    Category findCategoryById(Long id) throws Exception;

    void deleteCategory(Long id);
}
