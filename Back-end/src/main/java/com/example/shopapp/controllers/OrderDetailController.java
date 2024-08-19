package com.example.shopapp.controllers;

import com.example.shopapp.dtos.OrderDetailDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.OrderDetail;
import com.example.shopapp.response.order.OrderDetailResponse;
import com.example.shopapp.services.orderdetail.IOrderDetailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/order_details")
@RequiredArgsConstructor
public class OrderDetailController {
    private final IOrderDetailService orderDetailService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("")
    public ResponseEntity<?> createOrderDetail(
            @Valid @RequestBody OrderDetailDTO orderDetailDTO) {
        try {
            OrderDetail newOrderDetail = orderDetailService.createOrderDetail(orderDetailDTO);
            return  ResponseEntity.ok().body(OrderDetailResponse.fromOrderDetail(newOrderDetail));
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    @GetMapping("/{id}")
    public ResponseEntity<?>getOrderDetail(
            @Valid @PathVariable("id") Long id) throws DataNotFoundException {
        OrderDetail orderDetail = orderDetailService.getOrderDetail(id);
        return  ResponseEntity.ok().body(OrderDetailResponse.fromOrderDetail(orderDetail));
    }

   @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
   @GetMapping("/order/{orderId}")
   public ResponseEntity<?> getOrderDatails(
           @Valid @PathVariable("orderId") Long orderId
   ) {
       List<OrderDetail> orderDetails = orderDetailService.findByOrderId(orderId);
       List<OrderDetailResponse> orderDetailResponses = orderDetails
               .stream()
               .map(OrderDetailResponse::fromOrderDetail)
               .toList();
       return  ResponseEntity.ok(orderDetailResponses);

   }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrderDetail(
            @Valid @PathVariable("id") Long id,
            @RequestBody OrderDetailDTO orderDetailDTO) {
       try {
           OrderDetail orderDetail = orderDetailService.updateOrderDetail(id, orderDetailDTO);
           return ResponseEntity.ok(orderDetail);
       } catch (Exception e) {
           return ResponseEntity.badRequest().body(e.getMessage());
       }

   }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrderDetail(
            @Valid @PathVariable("id") Long id) {
        orderDetailService.deleteById(id);
        return ResponseEntity.ok().body("Delete Order detail with id: "+ id + "successfully");
   }
}


