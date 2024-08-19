package com.example.shopapp.controllers;

import com.example.shopapp.dtos.PaymentDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.response.Response;
import com.example.shopapp.services.payment.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.prefix}/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    @GetMapping("/vn-pay")
    public ResponseEntity<?> pay(HttpServletRequest request) {
        return ResponseEntity.ok(paymentService.createVnPayPayment(request));
    }


    @GetMapping("/vn-pay-callback")
    public ResponseEntity<?> payCallbackHandler(HttpServletRequest request) throws DataNotFoundException {
        String status = request.getParameter("vnp_ResponseCode");


        if ("00".equals(status)) {
            return ResponseEntity.ok(new Response("success", "Successfully", null));
        } else {
            throw new DataNotFoundException("Data not found for the given response code");
        }
    }
}
