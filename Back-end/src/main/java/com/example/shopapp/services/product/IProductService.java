package com.example.shopapp.services.product;

import com.example.shopapp.dtos.ProductDTO;
import com.example.shopapp.dtos.ProductImageDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.Product;
import com.example.shopapp.models.ProductImage;
import com.example.shopapp.response.product.ProductResponse;
import com.example.shopapp.response.product.ProductResponseByCart;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface IProductService {
    Product createProduct(ProductDTO productDTO) throws Exception;
    Product getProductById(long productId) throws Exception;

    Page<ProductResponse> getAllProducts(String keyword  , List<String> colors, List<String> sizes,
                                         Float minPrice, Float maxPrice, Integer minDiscount,
                                         Long categoryId, Integer page, Integer limit, String sort);

    Page<ProductResponse> getAllProductsAdmin(String keyword, Long categoryId,
                                              Integer page, Integer limit, String sort);
    Product updateProduct(long id, ProductDTO productDTO) throws Exception;
    void deleteProduct(long id) throws DataNotFoundException;
    boolean existsByName(String name);

    ProductImage createProductImage (
            Long productId,
            ProductImageDTO productImageDTO) throws Exception;

    List<ProductResponseByCart> findProductsByIds(List<Long> productIds);
    void deleteFile(String filename) throws Exception;
}
