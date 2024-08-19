package com.example.shopapp.dtos;


import lombok.Builder;

public class PaymentDTO {
    @Builder
    public static class VNPayResponse {
        public String status;
        public String message;
        public String paymentUrl;
    }
}
