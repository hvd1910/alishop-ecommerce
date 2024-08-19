package com.example.shopapp.response.product;

import com.example.shopapp.models.Comment;
import com.example.shopapp.models.Product;
import com.example.shopapp.models.ProductDetail;
import com.example.shopapp.models.ProductImage;
import com.example.shopapp.response.BaseResponse;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.ArrayList;
import java.util.List;



@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponseAll extends BaseResponse {
    private Long id;

    private String name;

    private Float price;

    private int discount;


    private String description;

    @JsonProperty("product_images")
    private List<ProductImage> productImages = new ArrayList<>();

    @JsonProperty("product_details")
    private List<ProductDetail> productDetails = new ArrayList<>();

    @JsonProperty("comments")
    private List<Comment> commentList = new ArrayList<>();

    @JsonProperty("category_id")
    private Long categoryId;

    @JsonProperty("total_sales")
    private int totalSales;

    private int stock;

    private boolean active;





    public static  ProductResponseAll fromProduct(Product product) {
        ProductResponseAll productResponseAll = ProductResponseAll.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .discount(product.getDiscount())
                .description(product.getDescription())
                .totalSales(product.getTotalSales())
                .stock(product.getStock())
                .productImages(product.getProductImages())
                .productDetails(product.getProductDetails())
                .commentList(product.getCommentList())
                .categoryId(product.getCategory().getId())
                .active(product.isActive())
                .build();
        productResponseAll.setCreatedAt(product.getCreatedAt());
        productResponseAll.setUpdatedAt(product.getUpdatedAt());
        return productResponseAll;
    }
}

