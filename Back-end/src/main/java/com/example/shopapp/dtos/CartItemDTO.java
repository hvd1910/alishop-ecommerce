package com.example.shopapp.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CartItemDTO {

    @JsonProperty("product_id")
    private Long productId;

    private String color;

    private String size;

    @JsonProperty("quantity")
    private Integer quantity;
}
