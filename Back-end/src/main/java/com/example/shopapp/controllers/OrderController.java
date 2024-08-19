package com.example.shopapp.controllers;

import com.example.shopapp.dtos.OrderDTO;
import com.example.shopapp.dtos.UpdateOrderDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.Order;
import com.example.shopapp.response.Response;
import com.example.shopapp.response.order.OrderListResponse;
import com.example.shopapp.response.order.OrderResponse;
import com.example.shopapp.services.order.IOrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/orders")
@RequiredArgsConstructor
public class OrderController {
    private final IOrderService orderService;

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("")
    public ResponseEntity<?> createOrder(
            @Valid @RequestBody OrderDTO orderDTO,
            BindingResult result
            ) throws Exception {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }
            OrderResponse orderResponse = orderService.createOrder(orderDTO);
            return ResponseEntity.ok(new Response("success", "Add order successfully.", orderResponse));

    }


    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/user/{user_id}")
    public ResponseEntity<?> getOrders(@Valid @PathVariable("user_id") Long userId) {
            List<Order> orders = orderService.findByUserId(userId);
            return  ResponseEntity.ok(new Response("success", "Get order by user successfully.", orders));

    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrder(@Valid @PathVariable("id") Long orderId) throws Exception {

            Order existingOrder = orderService.getOrder(orderId);
            OrderResponse orderResponse = OrderResponse.fromOrder(existingOrder);
            return  ResponseEntity.ok(new Response("success", "Get order successfully.", orderResponse));

    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrder(
            @Valid @PathVariable Long id,
            @Valid @RequestBody UpdateOrderDTO updateOrderDTO) throws DataNotFoundException {

            OrderResponse order = orderService.updateOrder(id, updateOrderDTO);
            return ResponseEntity.ok(new Response("success", "Update order successfully.", order));

    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/status/{id}")
    public ResponseEntity<?> updateStatusOrder(
            @PathVariable Long id,
            @RequestParam(defaultValue = "") String status) throws DataNotFoundException {
            OrderResponse order = orderService.updateStatusOrder(id, status);
            return ResponseEntity.ok(new Response("success", "Update status order successfully.", order));

    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("/payOrder/{id}")
    public ResponseEntity<?> updateInfoPaymentOrder(
            @PathVariable Long id,
            @RequestParam(defaultValue = "") String vnp_TransactionNo,
            @RequestParam(defaultValue = "") String vnp_ResponseCode
            ) throws DataNotFoundException {
        OrderResponse order = orderService.updateInfoPaymentOrder(id, vnp_TransactionNo, vnp_ResponseCode);
        return ResponseEntity.ok(new Response("success", "Order payment successfully.", null));

    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@Valid @PathVariable("id") Long orderId) {

             orderService.deleteOrder(orderId);
            return  ResponseEntity.ok("Order deleted successfully.");
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/get-orders-by-keyword")
    public ResponseEntity<?> getOrdersByKeyword(
            @RequestParam(defaultValue = "",required = false) String keyword,
            @RequestParam(defaultValue = "",required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "") String sort
    ) {
        Sort.Direction sortDirection = "asc".equalsIgnoreCase(sort) ? Sort.Direction.ASC : Sort.Direction.DESC;

        PageRequest pageRequest = PageRequest.of(
                page, limit,
                Sort.by(sortDirection,"id")
        );
        Page<OrderResponse> orderPage = orderService
                .getOrdersByKeyword(keyword,status, pageRequest)
                .map(OrderResponse::fromOrderNotOrderDetail);


        // Lấy tổng số trang
        int totalPages = orderPage.getTotalPages();
        List<OrderResponse> orderResponses = orderPage.getContent();
        return ResponseEntity.ok(new Response("success", "Get all orders successfully.", OrderListResponse
                .builder()
                .orders(orderResponses)
                .totalPages(totalPages)
                .build()));
    }
}
