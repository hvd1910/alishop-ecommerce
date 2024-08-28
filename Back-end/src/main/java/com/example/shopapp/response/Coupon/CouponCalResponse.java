package com.example.shopapp.response.Coupon;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data//toString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CouponCalResponse {

    @JsonProperty("coupon_id")
    private Long CouponId;

    @JsonProperty("total_amount")
    private double totalAmount;

}
