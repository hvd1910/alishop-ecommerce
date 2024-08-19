package com.example.shopapp.models;

import com.example.shopapp.dtos.OrderDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@AllArgsConstructor
@Data
@Builder
@NoArgsConstructor
@Getter
@Setter
public class Email {
    @NotBlank(message = "Email cannot be blank.")
    private String toEmail;

    @NotBlank(message = "Subject cannot be blank.")
    private String subject;


    @JsonProperty("orderDTO")
    private OrderDTO orderDTO ;

}
