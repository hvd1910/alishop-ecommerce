package com.example.shopapp.services.order;

import com.example.shopapp.dtos.OrderDTO;
import com.example.shopapp.dtos.UpdateOrderDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.Order;
import com.example.shopapp.response.order.OrderResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IOrderService {
    OrderResponse createOrder(OrderDTO orderDTO) throws Exception;
    Order getOrder(Long id) throws Exception;
    OrderResponse updateOrder(Long id, UpdateOrderDTO updateOrderDTO) throws DataNotFoundException;
    public OrderResponse updateStatusOrder(Long id, String status) throws DataNotFoundException;
    public OrderResponse updateInfoPaymentOrder(Long id, String vnp_TransactionNo, String vnp_ResponseCode) throws DataNotFoundException;
    void deleteOrder(Long id);
    List<Order> findByUserId(Long userId);

    Page<Order> getOrdersByKeyword(String keyword,String status, Pageable pageable);
}
