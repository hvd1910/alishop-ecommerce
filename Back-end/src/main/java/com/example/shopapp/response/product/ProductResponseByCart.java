package com.example.shopapp.response.product;

import com.example.shopapp.models.Product;
import com.example.shopapp.models.ProductDetail;
import com.example.shopapp.models.ProductImage;
import com.example.shopapp.response.BaseResponse;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponseByCart extends BaseResponse {

        private Long id;

        private String name;

        private Float price;

        private int discount;

        private String description;

        @JsonProperty("product_images")
        private List<ProductImage> productImages = new ArrayList<>();

        @JsonProperty("product_details")
        private List<ProductDetail> productDetails = new ArrayList<>();

        @JsonProperty("category_id")
        private Long categoryId;

        @JsonProperty("total_sales")
        private int totalSales;

        private int stock;






        public static ProductResponseByCart fromProduct(Product product) {
            ProductResponseByCart productResponseByCart = ProductResponseByCart.builder()
                    .id(product.getId())
                    .name(product.getName())
                    .price(product.getPrice())
                    .discount(product.getDiscount())
                    .description(product.getDescription())
                    .totalSales(product.getTotalSales())
                    .stock(product.getStock())
                    .productImages(product.getProductImages())
                    .productDetails(product.getProductDetails())
                    .categoryId(product.getCategory().getId())
                    .build();
            productResponseByCart.setCreatedAt(product.getCreatedAt());
            productResponseByCart.setUpdatedAt(product.getUpdatedAt());
            return productResponseByCart;
        }


}
