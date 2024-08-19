package com.example.shopapp.repositories;

import com.example.shopapp.models.OrderDetail;
import com.example.shopapp.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderDetailRespository extends JpaRepository<OrderDetail, Long> {
    List<OrderDetail> findByOrderId(Long orderId);

    Optional<OrderDetail>findOrderDetailByProduct(Product product);




}
