package com.example.shopapp.services.product.image;

import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.ProductImage;
import com.example.shopapp.repositories.ProductImageRespository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class ProductImageService implements IProductImageService{
    private final ProductImageRespository productImageRespository;
    @Override
    @Transactional
    public ProductImage deleteProductImage(Long id) throws Exception {
        Optional<ProductImage> productImage = productImageRespository.findById(id);
        if(productImage.isEmpty()) {
            throw new DataNotFoundException(
                    String.format("Cannot find product image with id: %ld", id)
            );
        }
        productImageRespository.deleteById(id);
        return productImage.get();
    }

    @Override
    @Transactional
    public List<ProductImage> deleteAllByProductId(Long productId) throws Exception {
        List<ProductImage> productImages = new ArrayList<>(productImageRespository.findByProductId(productId));
        if (!productImages.isEmpty()) {
            productImageRespository.deleteAllByProductId(productId);
        } else {
            throw new DataNotFoundException(
                    String.format("Không tìm thấy hình ảnh sản phẩm với ID: %d", productId)
            );
        }
        return productImages;
    }
}