package com.example.shopapp.response.order;

import com.example.shopapp.response.product.ProductResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@Data
@Builder
@NoArgsConstructor
public class OrderListResponse {

        private List<OrderResponse> orders;
        private int totalPages;


}
