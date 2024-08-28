package com.example.shopapp.repositories;

import com.example.shopapp.models.Coupon;
import com.example.shopapp.models.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRespository extends JpaRepository<Order, Long> {
    //Tìm các đơn hàng của 1 user nào đó
    List<Order> findByUserId(Long userId);
    @Query("SELECT o FROM Order o WHERE o.active = true " +
            "AND (:status IS NULL OR :status = '' OR o.status = :status) " +
            " AND (:keyword IS NULL OR :keyword = '' OR " +
            "o.fullName LIKE %:keyword% " +
            "OR o.phoneNumber LIKE %:keyword% " +
            "OR o.address LIKE %:keyword% " +
            "OR o.note LIKE %:keyword% " +
            "OR o.transactionNumber LIKE %:keyword% " +
            "OR o.email LIKE %:keyword%)")
    Page<Order> findByKeyword(@Param("keyword") String keyword,
                              @Param("status") String status,
                              Pageable pageable);

    List<Order> findOrderByCoupon(Coupon coupon);


}




