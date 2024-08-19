package com.example.shopapp.controllers;

import com.example.shopapp.models.ProductImage;
import com.example.shopapp.response.Response;
import com.example.shopapp.services.product.ProductService;
import com.example.shopapp.services.product.image.IProductImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("${api.prefix}/product_images")

@RequiredArgsConstructor
public class ProductImageController {
    private final IProductImageService productImageService;
    private final ProductService productService;
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> delete(
            @PathVariable Long id
    ) throws Exception {

            ProductImage productImage = productImageService.deleteProductImage(id);
            if(productImage != null){
                productService.deleteFile(productImage.getImageUrl());
            }
            return ResponseEntity.ok(new Response("success", "Delete image product successfully.", null));

    }

    @DeleteMapping("/all/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteAllByProductId(
            @PathVariable("id") Long productId
    ) throws Exception {

        List<ProductImage> productImages = productImageService.deleteAllByProductId(productId);
        if(!productImages.isEmpty()){
            for (ProductImage productImage : productImages) {
                productService.deleteFile(productImage.getImageUrl());
            }

        }
        return ResponseEntity.ok(new Response("success", "Delete image product successfully.", null));

    }
}
