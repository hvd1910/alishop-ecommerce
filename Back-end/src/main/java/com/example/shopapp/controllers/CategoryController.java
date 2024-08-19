package com.example.shopapp.controllers;

import com.example.shopapp.components.LocalizationUtils;
import com.example.shopapp.dtos.CategoryDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.Category;
import com.example.shopapp.response.Response;
import com.example.shopapp.services.category.ICategorySevice;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final ICategorySevice categoryService;

    @GetMapping("")
    public ResponseEntity<List<Category>> getAllCategories(
    ) {
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);

    }



    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> createCategory(
            @Valid @RequestBody CategoryDTO categoryDTO,
            BindingResult result){
        if (result.hasErrors()) {
            List<String> errorMessages = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            return ResponseEntity.badRequest().body(errorMessages);
        }

        Category category = categoryService.createCategory(categoryDTO);
        if(category== null) {
            return ResponseEntity.ok(new Response("error", "Category already exist.",null));

        } else {
            return ResponseEntity.ok(new Response("success", "Add category successfully.", category));

        }

    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(
            @PathVariable("id") Long categoryId
    ) throws DataNotFoundException {

            Category existingCategory = categoryService.getCategoryById(categoryId);
            return ResponseEntity.ok(existingCategory);
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody CategoryDTO categoryDTO,
            HttpServletRequest request
    ) throws DataNotFoundException {
        Category category = categoryService.updateCategory(id, categoryDTO);
        if(category != null) {
            return ResponseEntity.ok(new Response("success", "Update category successfully.", null));
        }else {
            return ResponseEntity.ok(new Response("error", "Update category failure.", null));
        }

    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) throws DataNotFoundException {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok(new Response("success", "Delete category with id: " + id + " successfully", null));
    }
}
