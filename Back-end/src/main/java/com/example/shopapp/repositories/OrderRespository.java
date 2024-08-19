package com.example.shopapp.repositories;

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
}
/*
INSERT INTO orders (user_id, fullname, email, phone_number, address, note, status, total_money)
VALUES
    (2, 'John Smith', 'john@example.com', '1234567890', '123 Main St', 'Note 1', 'pending', 500),
    (5, 'Eric Thompson', 'eric@example.com', '9876543210', '456 Elm St', 'Note 2', 'pending', 400),
    (2, 'Hans', 'hans@example.com', '5555555555', '789 Oak St', 'Note 3', 'pending', 300),
    (5, 'Alice Johnson', 'alice@example.com', '5551234567', '789 Cherry Ave', 'Note 4', 'pending', 200),
    (2, 'Robert Williams', 'robert@example.com', '5559876543', '321 Maple Rd', 'Note 5', 'pending', 100),
    (2, 'Sarah Davis', 'sarah@example.com', '5554445555', '987 Elm St', 'Note 6', 'pending', 250),
    (5, 'Michael Anderson', 'michael@example.com', '5556667777', '654 Oak Ave', 'Note 7', 'pending', 350),
    (2, 'Emma Wilson', 'emma@example.com', '5558889999', '789 Maple Ln', 'Note 8', 'pending', 450),
    (2, 'Olivia Brown', 'olivia@example.com', '5551112222', '987 Pine St', 'Note 47', 'pending', 350),
    (5, 'William Davis', 'william@example.com', '5553334444', '654 Elm Ave', 'Note 48', 'pending', 250),
    (2, 'Sophia Wilson', 'sophia@example.com', '5555556666', '789 Oak Ln', 'Note 49', 'pending', 150),
    (5, 'Alexander Anderson', 'alexander@example.com', '5557778888', '456 Maple Lane', 'Note 50', 'pending', 450),
    (2, 'Ava Thompson', 'ava@example.com', '5559990000', '987 Walnut Rd', 'Note 51', 'pending', 550),
    (5, 'Daniel Johnson', 'daniel@example.com', '5552223333', '654 Pine Ave', 'Note 52', 'pending', 650),
    (2, 'Mia Williams', 'mia@example.com', '5554445555', '789 Elm St', 'Note 53', 'pending', 750),
    (5, 'James Davis', 'james@example.com', '5556667777', '456 Oak Ave', 'Note 54', 'pending', 850),
    (5, 'Benjamin Thompson', 'benjamin@example.com', '5550001111', '654 Walnut Rd', 'Note 56', 'pending', 550),
    (2, 'Sophia Anderson', 'sophia@example.com', '5551112222', '987 Pine St', 'Note 57', 'pending', 350),
    (5, 'Elijah Davis', 'elijah@example.com', '5553334444', '654 Elm Ave', 'Note 58', 'pending', 250),
    (2, 'Ava Wilson', 'ava@example.com', '5555556666', '789 Oak Ln', 'Note 59', 'pending', 150),
    (5, 'Oliver Thompson', 'oliver@example.com', '5557778888', '456 Maple Lane', 'Note 60', 'pending', 450),
    (2, 'Mia Johnson', 'mia@example.com', '5559990000', '987 Walnut Rd', 'Note 61', 'pending', 550),
    (5, 'James Williams', 'james@example.com', '5552223333', '654 Pine Ave', 'Note 62', 'pending', 650),
    (2, 'Charlotte Davis', 'charlotte@example.com', '5554445555', '789 Elm St', 'Note 63', 'pending', 750),
    (5, 'Benjamin Wilson', 'benjamin@example.com', '5556667777', '456 Oak Ave', 'Note 64', 'pending', 850),
    (2, 'Amelia Thompson', 'amelia@example.com', '5558889999', '321 Maple Ln', 'Note 65', 'pending', 950),
    (5, 'Henry Johnson', 'henry@example.com', '5550001111', '654 Walnut Rd', 'Note 66', 'pending', 550),
    (5, 'Emily Davis', 'emily@example.com', '5552223333', '456 Walnut Lane', 'Note 46', 'pending', 150);

*/
