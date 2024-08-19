package com.example.shopapp.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data//toString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDetailDTO {
    @NotBlank(message = "Color is required")
    @Size(min = 3, max = 200, message = "Color must be between 3 and 200 characters")
    private String color;

    @Size( max = 100, message = "Size must be between 1 and 100 characters")
    private String size;

    @Min(value = 0, message = "Qty must be greater than or equal to 0")
    @Max(value = 10000000, message = "Qty must be less than or equal to 10,000,000")
    private int qty;



}
