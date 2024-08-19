package com.example.shopapp.services.category;

import com.example.shopapp.dtos.CategoryDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.Category;

import java.util.List;
import java.util.Optional;

public interface ICategorySevice {
    Category createCategory(CategoryDTO categoryDTO);
    Category getCategoryById(long id) throws DataNotFoundException;

    List<Category> getAllCategories();
    Category updateCategory(long categoryId, CategoryDTO categoryDTO) throws DataNotFoundException;
    void deleteCategory(long id) throws DataNotFoundException;

}
