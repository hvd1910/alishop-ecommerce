package com.example.shopapp.services.payment;

import com.example.shopapp.dtos.PaymentDTO;
import jakarta.servlet.http.HttpServletRequest;

public interface IPaymentService {
    public PaymentDTO.VNPayResponse createVnPayPayment(HttpServletRequest request);
}
