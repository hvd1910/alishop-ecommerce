package com.example.shopapp.repositories;

import com.example.shopapp.models.Coupon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CouponRepository extends JpaRepository<Coupon, Long> {
    Optional<Coupon> findByCode(String couponCode);

    @Query("SELECT c FROM Coupon c WHERE (:keyword IS NULL OR c.code LIKE %:keyword%)")
    Page<Coupon> findByCouponAll(@Param("keyword") String keyword, Pageable pageable);
}
