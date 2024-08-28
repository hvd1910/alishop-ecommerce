package com.example.shopapp.dtos;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.math.BigDecimal;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CouponConditionDTO {

    @JsonProperty("coupon_id")
    private Long couponId;

    private String attribute;

    private String operator;

    private String value;

    @JsonProperty("discount_amount")
    private BigDecimal discountAmount;
}
