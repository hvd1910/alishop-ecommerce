package com.example.shopapp.services.product.image;

import com.example.shopapp.models.ProductImage;

import java.util.List;

public interface IProductImageService {
    ProductImage deleteProductImage(Long id) throws Exception;

    List<ProductImage> deleteAllByProductId(Long productId) throws Exception;

}
