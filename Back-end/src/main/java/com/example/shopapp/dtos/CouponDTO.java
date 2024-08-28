package com.example.shopapp.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CouponDTO {
    @JsonProperty("code")
    private String code;

    @JsonProperty("usage_limit")
    private int usageLimit;

    private boolean active;
}
