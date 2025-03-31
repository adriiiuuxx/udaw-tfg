package es.adrian.udaw_eats.controller;

import es.adrian.udaw_eats.model.IngredientCategory;
import es.adrian.udaw_eats.model.IngredientsItem;
import es.adrian.udaw_eats.model.User;
import es.adrian.udaw_eats.request.IngredientCategoryRequest;
import es.adrian.udaw_eats.request.IngredientRequest;
import es.adrian.udaw_eats.service.IngredientService;
import es.adrian.udaw_eats.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/ingredients")
public class IngredientController {

    @Autowired
    IngredientService ingredientService;

    @Autowired
    private UserService userService;

    @PostMapping("/category")
    public ResponseEntity<IngredientCategory> createIngredientCategory(@RequestBody IngredientCategoryRequest req,
                                                                       @RequestHeader("Authorization") String jwt) throws Exception{

        User user = userService.findUserByJwtToken(jwt);

        IngredientCategory item = ingredientService.createIngredientCategory(req.getName(), req.getRestaurantId());

        return new ResponseEntity<>(item, HttpStatus.CREATED);

    }

    @PostMapping()
    public ResponseEntity<IngredientsItem> createIngredient(@RequestBody IngredientRequest req,
                                                                       @RequestHeader("Authorization") String jwt) throws Exception{

        User user = userService.findUserByJwtToken(jwt);

        IngredientsItem item = ingredientService.createIngredientItem(req.getRestaurantId(), req.getName(),req.getCategoryId());

        return new ResponseEntity<>(item, HttpStatus.CREATED);

    }

    @PutMapping("/{id}/stock")
    public ResponseEntity<IngredientsItem> updateStock(@PathVariable Long id,
                                                            @RequestHeader("Authorization") String jwt) throws Exception{

        User user = userService.findUserByJwtToken(jwt);

        IngredientsItem item = ingredientService.updateStock(id);

        return new ResponseEntity<>(item, HttpStatus.OK);

    }

    @GetMapping("/restaurant/{id}")
    public ResponseEntity<List<IngredientsItem>> getRestaurantIngredients(@PathVariable Long id,
                                                         @RequestHeader("Authorization") String jwt) throws Exception{

        User user = userService.findUserByJwtToken(jwt);

        List<IngredientsItem> items = ingredientService.findRestaurantsIngredients(id);

        return new ResponseEntity<>(items, HttpStatus.OK);

    }

    @GetMapping("/restaurant/{id}/category")
    public ResponseEntity<List<IngredientCategory>> getRestaurantIngredientCategory(@PathVariable Long id,
                                                                          @RequestHeader("Authorization") String jwt) throws Exception{

        User user = userService.findUserByJwtToken(jwt);

        List<IngredientCategory> items = ingredientService.findIngredientCategoryByRestaurantId(id);

        return new ResponseEntity<>(items, HttpStatus.OK);

    }
}
