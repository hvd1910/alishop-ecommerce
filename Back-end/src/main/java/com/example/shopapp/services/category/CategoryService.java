package com.example.shopapp.services.category;

import com.example.shopapp.dtos.CategoryDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.Category;
import com.example.shopapp.models.Product;
import com.example.shopapp.repositories.CategoryRepository;
import com.example.shopapp.repositories.ProductRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategorySevice{
    private final CategoryRepository categoryRepository;
    private final ProductRespository productRespository;


    @Override
    @Transactional
    public Category createCategory(CategoryDTO categoryDTO) {
        Category category = categoryRepository.findByName(categoryDTO.getName());
        Category newCategory = Category.builder()
                .name(categoryDTO.getName())
                .build();
        if(category == null) {
            return categoryRepository.save(newCategory);

        }
        return  null;
    }

    @Override
    public Category getCategoryById(long id) throws DataNotFoundException {
        return categoryRepository.findById(id)
                .orElseThrow(()->new DataNotFoundException("Category not found."));
    }




    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    @Transactional
    public Category updateCategory(long categoryId, CategoryDTO categoryDTO) throws DataNotFoundException {
        Category category = categoryRepository.findByName(categoryDTO.getName());
        Category existingCategory = getCategoryById(categoryId);
        existingCategory.setName(categoryDTO.getName());
        if(category == null) {
            categoryRepository.save(existingCategory);
            return existingCategory;
        }
            return null;

    }

    @Override
    @Transactional
    public void deleteCategory(long id) throws DataNotFoundException {
        Optional<Category> category = categoryRepository.findById(id);

        if (category.isPresent()) {
            List<Product> products = productRespository.findByCategory(category.get());
            if (products.isEmpty()) {
                categoryRepository.deleteById(id);

            }else {
                throw new DataNotFoundException("Category exists product cannot be deleted.");

            }
        }else {
            throw new DataNotFoundException("Category not found.");
        }

    }
}
