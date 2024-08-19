package com.example.shopapp.repositories;

import com.example.shopapp.models.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductImageRespository extends JpaRepository<ProductImage, Long> {

    List<ProductImage> findByProductId(Long productId);

    @Modifying
    @Query("DELETE FROM ProductImage pe WHERE  pe.product.id = :productId")
    void deleteAllByProductId(@Param("productId") Long productId);
}
