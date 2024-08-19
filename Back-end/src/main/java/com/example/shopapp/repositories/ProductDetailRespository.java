package com.example.shopapp.repositories;

import com.example.shopapp.models.ProductDetail;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductDetailRespository extends JpaRepository<ProductDetail, Long> {

   @Modifying
   @Query("DELETE FROM ProductDetail pd WHERE pd.product.id = :productId")
   void deleteAllByProductId(@Param("productId") Long productId);

    ProductDetail findByColorAndSizeAndProductId(String color, String size, Long productId);

}
